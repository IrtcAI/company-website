import { ReactNode } from "react";
import { ShellContext } from "@/components/shell-provider";

export function Motion({
  paused = false,
  children,
}: {
  paused?: boolean;
  children: ReactNode;
}) {
  return (
    <ShellContext.Provider
      value={{
        locale: "pt-BR",
        paused,
        setPaused: () => {},
        openIris: () => {},
      }}
    >
      {children}
    </ShellContext.Provider>
  );
}
