---
name: vercel-troubleshooter
description: Diagnose irtc.com.br being down or unreachable on Vercel (ERR_TIMED_OUT, connection refused, 404/5xx, "site fora do ar", DNS doubts, a Vercel support ticket). Walks from deploy status to runtime logs, DNS, per-IP connectivity and traceroute, and runs Vercel Support's official debug script from a reviewed local copy.
---

# Vercel troubleshooter

Use this when someone reports that the site is down, slow to connect or unreachable, when a deploy looks fine but users can't load the site, or when Vercel support asks for diagnostics. Work through the steps in order and stop at the first one that explains the problem.

## Setup facts

- Project `company-website` on the Vercel team `irtc`. Production aliases: `irtc.com.br`, `www.irtc.com.br`, `company-website-irtc.vercel.app`.
- DNS is hosted at GoDaddy (`ns33`/`ns34.domaincontrol.com`), not at Vercel, so the DNS records list in the Vercel dashboard is empty on purpose. DNS changes are made by a person in the GoDaddy zone: https://dcc.godaddy.com/control/portfolio/irtc.com.br/settings?tab=dns
- The apex A record (`@`) is `76.76.21.21`; `www` is a CNAME to Vercel. On 2026-10-26 Vercel's newer apex IP `216.198.79.1` timed out on port 443 from Claro (AS28573) Wi-Fi while working from mobile data, so the apex was moved to `76.76.21.21`. Don't move it back to the recommended IP without testing it from the affected network first (step 4).
- `proxy.ts` redirects `/` with a 307 to the visitor's locale. A 307 on `/` in the logs is expected.

## Steps

1. **Deploy status.** `vercel ls company-website --scope irtc` and `vercel inspect <production url> --scope irtc`. Check that the latest production deploy is Ready and lists the custom domains under Aliases.

2. **Runtime logs with status codes.**

   ```bash
   vercel logs <production url> --scope irtc --since 1h --json \
     | jq -r '[.timestamp, .domain, .requestPath, .responseStatusCode] | @tsv'
   ```

   200s on `irtc.com.br` from other visitors mean the server is fine and the problem is between the user and Vercel.

3. **DNS.** Compare the authoritative answer with public resolvers:

   ```bash
   dig +short NS irtc.com.br
   dig +short A irtc.com.br @ns33.domaincontrol.com
   for r in 8.8.8.8 1.1.1.1 9.9.9.9; do dig +short A irtc.com.br @$r; done
   ```

   If GoDaddy's nameserver still shows the old value after an edit, the change wasn't saved; it isn't propagation. Public resolvers can lag by the record's TTL.

4. **Connectivity per IP.** Separates a dead site from an unreachable IP:

   ```bash
   curl -sv -m 15 -o /dev/null https://irtc.com.br/ 2>&1 | grep -E "Trying|Connected|HTTP/|timed out"
   for ip in 76.76.21.21 216.198.79.1; do
     curl -s -m 10 -o /dev/null -w "%{http_code} via $ip\n" --resolve irtc.com.br:443:$ip https://irtc.com.br/ || echo "timeout via $ip"
   done
   ```

   A timeout on one IP and a 200 on another means the network path to that IP is broken (ISP routing), not the site. Ask the user to retry on mobile data to confirm.

5. **Route.** UDP traceroute needs no `sudo` on macOS; the TCP mode (`-P tcp`) does. Compare a failing IP with a working one and look up the hops' owners:

   ```bash
   for ip in 216.198.79.1 76.76.21.21; do traceroute -n -w 2 -q 1 -m 20 $ip; done
   whois <hop ip> | grep -iE "^(owner|OrgName|aut-num):"
   ```

   The hop where the two routes split, or after which only `*` appears, names the network dropping the traffic.

6. **Vercel Support debug script.** Vercel support asks for the output of https://github.com/vercel-support/vercel-connect-debug, normally as `curl -s https://raw.githubusercontent.com/vercel-support/vercel-connect-debug/main/vercel-debug.sh | bash | tee vercel-debug.txt`. Never pipe it from the internet. Use the reviewed copy in `scripts/`:

   1. Run `scripts/check-upstream.sh`. Within 7 days of the last review it exits 0 and does nothing. Older than that, it downloads the upstream script and compares SHA-256: unchanged bumps `verified_at` in `scripts/upstream.txt`; changed exits 2 and prints a diff. Read the whole diff, confirm it only does read-only diagnostics, and only then run `scripts/check-upstream.sh --accept`. Commit the updated `scripts/` files.
   2. Have the user run it **in their own terminal, on the affected network** (it reads the domain from `/dev/tty`, so `!` in Claude Code won't work):
      ```bash
      bash .claude/skills/vercel-troubleshooter/scripts/vercel-debug.sh | tee ~/vercel-debug.txt
      ```
      Enter `irtc.com.br` when asked. The output includes the user's public IP and approximate location from ipinfo.io, which is fine to send to Vercel support but shouldn't be pasted anywhere public.

## Reporting

- Vercel support: https://vercel.com/help, team `irtc`. Include the timestamps, the per-IP curl results, both traceroutes with hop owners, and `vercel-debug.txt`.
- If Vercel says the traffic never reaches them, open a ticket with the ISP with the same evidence and ask for escalation to the network/backbone team.
- Until the ISP fixes the route, point the apex A record at an IP that works from the affected network (step 4), and say so in the reply.

## Permissions

In auto mode, `curl` against the production site, `vercel curl`, `gh pr merge` and closing PRs may be blocked. Don't work around a denial; give the user the exact command to run with `!` (no space before it), or ask them to allow it in `/permissions`.
