import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ModelViewerProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  "camera-controls"?: boolean;
  "disable-pan"?: boolean;
  "shadow-intensity"?: string;
  exposure?: string;
  "auto-rotate"?: boolean;
  "interaction-prompt"?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}

export {};

