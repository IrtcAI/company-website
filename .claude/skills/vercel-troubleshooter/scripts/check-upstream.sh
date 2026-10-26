#!/usr/bin/env bash
# Checks the bundled vercel-debug.sh against Vercel Support's upstream copy.
#
#   check-upstream.sh           re-check only if the last review is older than 7 days
#   check-upstream.sh --force   re-check now
#   check-upstream.sh --accept  replace the bundled copy with the upstream one
#                               (only after reading the diff)
#
# Exit codes: 0 bundled copy is current, 2 upstream changed and needs review,
# 1 the check itself failed.

set -euo pipefail

dir="$(cd "$(dirname "$0")" && pwd)"
meta="$dir/upstream.txt"
local_copy="$dir/vercel-debug.sh"
pending="$dir/vercel-debug.sh.upstream"
max_age_days=7

# shellcheck source=/dev/null
source "$meta"

mode="${1:-}"

to_epoch() {
  date -j -f %Y-%m-%d "$1" +%s 2>/dev/null || date -d "$1" +%s
}

sha_of() {
  shasum -a 256 "$1" | cut -d' ' -f1
}

write_meta() {
  cat >"$meta" <<EOF
repo=$repo
path=$path
commit=$1
sha256=$2
verified_at=$(date +%Y-%m-%d)
EOF
}

if [[ "$mode" == "--accept" ]]; then
  [[ -f "$pending" ]] || { echo "No pending upstream copy. Run with --force first."; exit 1; }
  mv "$pending" "$local_copy"
  write_meta "$(cat "$pending.commit")" "$(sha_of "$local_copy")"
  rm -f "$pending.commit"
  echo "Accepted upstream copy. Bundled script updated."
  exit 0
fi

age_days=$(( ($(date +%s) - $(to_epoch "$verified_at")) / 86400 ))

if [[ "$mode" != "--force" && $age_days -lt $max_age_days ]]; then
  echo "Fresh: reviewed $verified_at ($age_days days ago), upstream commit ${commit:0:7}."
  exit 0
fi

latest_commit=$(gh api "repos/$repo/commits?path=$path&per_page=1" -q '.[0].sha')
gh api "repos/$repo/contents/$path" -H "Accept: application/vnd.github.raw" >"$pending"

if [[ "$(sha_of "$pending")" == "$sha256" ]]; then
  rm -f "$pending"
  write_meta "$latest_commit" "$sha256"
  echo "Unchanged upstream (commit ${latest_commit:0:7}). Review date bumped to today."
  exit 0
fi

echo "$latest_commit" >"$pending.commit"
echo "Upstream CHANGED: ${commit:0:7} -> ${latest_commit:0:7}. Review this diff before running anything:"
echo
diff -u "$local_copy" "$pending" || true
echo
echo "If the diff is safe, run: $0 --accept"
exit 2
