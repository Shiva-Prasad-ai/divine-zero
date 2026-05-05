import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTripPlan } from "../hooks/useTripPlan";
import { useAppStore } from "../store/appStore";
import type { VehicleType } from "../types";
import { VehicleModel } from "./VehicleModel";

type FormInput = {
  source: string;
  destination: string;
  batteryPercent: number;
  selectedVehicle: VehicleType;
};

const vehicleOptions: { value: VehicleType; label: string; meta: string }[] = [
  { value: "bike", label: "Bike", meta: "Fast city mobility" },
  { value: "car", label: "Car", meta: "Balanced comfort range" },
  { value: "scooter", label: "Scooter", meta: "Efficient short trips" },
  { value: "van", label: "Van", meta: "Family and cargo" },
];

export function RouteForm({ isCompact = false }: { isCompact?: boolean }) {
  const tripInput = useAppStore((s) => s.tripInput);
  const setTripInput = useAppStore((s) => s.setTripInput);
  const tripPlan = useTripPlan();
  const navigate = useNavigate();

  const tripPlanPending = tripPlan.isPending;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormInput>({
    defaultValues: tripInput,
    mode: "onChange",
  });
  const selectedVehicle = watch("selectedVehicle");
  const formValues = watch();

  useEffect(() => {
    if (isCompact && formValues.source && formValues.destination && formValues.source.length >= 3 && formValues.destination.length >= 3 && formValues.batteryPercent) {
      setTripInput(formValues as FormInput);
      tripPlan.mutate();
    }
  }, [formValues.source, formValues.destination, formValues.batteryPercent, isCompact]);

  const onSubmit = (values: FormInput) => {
    setTripInput(values);
    tripPlan.mutate(undefined, {
      onSuccess: () => {
        if (!isCompact) {
          navigate("/trip-summary");
        }
      }
    });
  };

  if (isCompact) {
    return (
      <form className={`form compact-route-form ${tripPlanPending ? "loading" : ""}`} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '16px', alignItems: 'center' }}>
          <input {...register("source")} placeholder="From (Your Location)" className="compact-input" style={{ width: '100%' }} />
          <input {...register("destination")} placeholder="Destination" className="compact-input" style={{ width: '100%' }} />
          <input 
            type="number" 
            {...register("batteryPercent")} 
            placeholder="Available Charging (%)" 
            className="compact-input" 
            style={{ width: '100%' }}
          />
          <button type="submit" className="btn-primary compact-btn" disabled={tripPlanPending} style={{ height: '42px', minWidth: '160px' }}>
            {tripPlanPending ? "Calculating..." : "Get Directions"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form className={`card form route-form ${tripPlanPending ? "loading" : ""}`} onSubmit={handleSubmit(onSubmit)}>
      <h2>Route Planner</h2>
      {tripPlanPending && (
        <div className="calc-overlay" aria-live="polite">
          <div className="spin-ring" />
          <div className="vehicle-spin" aria-hidden="true">
            <VehicleModel vehicle={selectedVehicle ?? "car"} className="vehicle-model-overlay" />
          </div>
          <p>Calculating your route...</p>
        </div>
      )}
      <label>
        Source
        <input
          {...register("source", { required: "Source is required", minLength: 3 })}
          placeholder="Enter source location"
        />
        {errors.source && <span className="error">{errors.source.message}</span>}
      </label>
      <label>
        Destination
        <input
          {...register("destination", { required: "Destination is required", minLength: 3 })}
          placeholder="Enter destination"
        />
        {errors.destination && <span className="error">{errors.destination.message}</span>}
      </label>
      <label>
        Battery %
        <input
          type="number"
          min={5}
          max={100}
          {...register("batteryPercent", {
            required: "Battery percentage is required",
            min: 5,
            max: 100,
            valueAsNumber: true,
          })}
        />
      </label>
      <fieldset className="vehicle-picker">
        <legend>Smart Vehicle Selection</legend>
        <div className="vehicle-options">
          {vehicleOptions.map((vehicle) => (
            <button
              key={vehicle.value}
              type="button"
              className={`vehicle-chip ${selectedVehicle === vehicle.value ? "active" : ""}`}
              onClick={() => setValue("selectedVehicle", vehicle.value, { shouldDirty: true })}
            >
              <div className="vehicle-model-wrap">
                <VehicleModel vehicle={vehicle.value} className="vehicle-model-card" autoRotate />
              </div>
              <div className="vehicle-meta">
                <strong>{vehicle.label}</strong>
                <span>{vehicle.meta}</span>
              </div>
            </button>
          ))}
        </div>
        <input type="hidden" {...register("selectedVehicle", { required: true })} />
      </fieldset>
      <button className="btn-primary" type="submit" disabled={tripPlan.isPending}>
        {tripPlan.isPending ? "Calculating route..." : "Plan Route"}
      </button>
      {tripPlan.isError && <p className="error">Could not calculate route right now.</p>}
    </form>
  );
}

