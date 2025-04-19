"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface NumberStepperProps {
  min: number;
  max: number;
  increment: number;
  currentValue: number;
  onValueChange: (value: number) => void;
}

export const NumberStepper = ({
  min,
  max,
  increment,
  currentValue,
  onValueChange,
}: NumberStepperProps) => {
  const handleDecrement = () => {
    const newValue = Math.max(min, currentValue - increment);
    onValueChange(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, currentValue + increment);
    onValueChange(newValue);
  };

  return (
    <div className="flex flex-row items-center gap-1">
      <Button
        size="icon"
        variant="secondary"
        className="rounded bg-zinc-700 hover:bg-zinc-600"
        onClick={handleDecrement}
        disabled={currentValue <= min}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className="rounded bg-zinc-700 hover:bg-zinc-600"
        onClick={handleIncrement}
        disabled={currentValue >= max}
      >
        <Plus className="h-3 w-3" />
      </Button>
      <span className="text-sm text-muted-foreground text-center w-8">
        {currentValue}
      </span>
    </div>
  );
};

export default NumberStepper;
