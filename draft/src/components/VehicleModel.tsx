import type { VehicleType } from "../types";

type Props = {
  vehicle: VehicleType;
  className?: string;
  autoRotate?: boolean;
};

const modelMap: Record<VehicleType, string> = {
  car: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb",
  bike: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb",
  scooter:
    "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb",
  van: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb",
};

export function VehicleModel({ vehicle, className, autoRotate = true }: Props) {
  return (
    <model-viewer
      className={className}
      src={modelMap[vehicle]}
      camera-controls
      disable-pan
      shadow-intensity="1"
      exposure="1.1"
      auto-rotate={autoRotate}
      interaction-prompt="none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

