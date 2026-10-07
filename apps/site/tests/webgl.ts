import { vi } from "vitest";

const debugInfo = { UNMASKED_RENDERER_WEBGL: 0x9246 };

export function stubWebGL(renderer: string | null = "ANGLE (Apple M2)") {
  const context =
    renderer === null
      ? null
      : {
          getExtension: (name: string) =>
            name === "WEBGL_debug_renderer_info"
              ? debugInfo
              : { loseContext: () => {} },
          getParameter: () => renderer,
        };
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    context as unknown as RenderingContext,
  );
}
