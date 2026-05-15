import React, { useState, useRef, useEffect } from "react";
import { Input } from "./input";

type DraggableNumberInputProps = {
  value?: number;
  min?: number;
  max?: number;
  precision?: number;
  step?: number;
  nudge?: number;
  unit?: string;
  className?: string;
  onChange?: (value: number) => void;
  onChangeStart?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
};

const DraggableNumberInput: React.FC<DraggableNumberInputProps> = ({
  value = 0,
  min = -Infinity,
  max = Infinity,
  precision = 2,
  step = 1,
  nudge = 0.01,
  unit = "",
  className = "",
  onChange = () => {},
  onChangeStart = () => {},
  onChangeEnd = () => {},
}) => {
  const [innerValue, setInnerValue] = useState(value);
  const [rawValue, setRawValue] = useState(
    () => `${value.toFixed(precision)}${unit ? ` ${unit}` : ""}`
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const pointerStart = useRef({ x: 0, y: 0 });
  const valueStart = useRef(0);
  const isDraggingRef = useRef(false);
  const isFocused = useRef(false);
  const dragTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Format value with precision and unit
  const formatValue = (val: number) =>
    `${val.toFixed(precision)}${unit ? ` ${unit}` : ""}`;

  // Clamp value between min and max
  const clamp = (val: number) => Math.min(max, Math.max(min, val));

  // Handle changes programmatically
  const handleSetValue = (newValue: number) => {
    const clampedValue = clamp(newValue);
    setInnerValue(clampedValue);
    setRawValue(formatValue(clampedValue));
    onChange(clampedValue);
  };

  const handleChangeStart = () => {
    onChangeStart(Number(inputRef.current?.value)); // Trigger the onChangeStart event
  };

  const handleChangeEnd = () => {
    onChangeEnd(Number(inputRef.current?.value)); // Trigger the onChangeEnd event with the current value
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    pointerStart.current = { x: e.clientX, y: e.clientY };
    valueStart.current = innerValue;

    dragTimeoutRef.current = setTimeout(() => {
      isDraggingRef.current = true;
      handleChangeStart(); // Trigger onChangeStart once dragging begins
    }, 150); // Delay to distinguish drag from focus

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - pointerStart.current.x;
    const dy = pointerStart.current.y - e.clientY;
    const distance = dx + dy;

    const adjustment = (distance / 50) * step;
    handleSetValue(valueStart.current + adjustment);
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) {
      inputRef.current?.focus(); // Focus the input if not dragging
      inputRef.current?.select();
      isFocused.current = true;
    }

    clearTimeout(dragTimeoutRef.current!);
    isDraggingRef.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    handleChangeEnd();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.code) {
      case "ArrowUp":
        e.preventDefault();
        handleSetValue(innerValue + nudge);
        break;
      case "ArrowDown":
        e.preventDefault();
        handleSetValue(innerValue - nudge);
        break;
      case "Enter":
        inputRef.current?.blur();
        handleSetValue(Number(rawValue));
        onChangeEnd(Number(rawValue)); // Trigger the onChangeEnd event with the current value
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawValue(e.target.value); // Allow user to type freely
  };

  const handleBlur = () => {
    // Validate and format the value on blur
    const parsed = parseFloat(rawValue);
    const clamped = !isNaN(parsed) ? clamp(parsed) : innerValue;
    setInnerValue(clamped);
    setRawValue(formatValue(clamped));
    isFocused.current = false;
    handleChangeEnd();
  };

  useEffect(() => {
    // Synchronize value and rawValue when initialValue changes
    setInnerValue(value);
    setRawValue(formatValue(value));
  }, [value, precision, unit]); // Dependencies ensure updates when precision/unit also change

  useEffect(() => {
    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    };
  }, []);

  return (
    <Input
      className={className}
      ref={inputRef}
      type="text" // Use text to allow units and custom formatting
      value={rawValue} // Editable value
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      onChange={handleInputChange}
      onBlur={handleBlur}
      style={{
        cursor: isFocused.current ? "auto" : "ew-resize",
      }}
    />
  );
};

export default DraggableNumberInput;
