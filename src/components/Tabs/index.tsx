"use client";

import { useMemo, useState } from "react";
import type { TabOption, TabsProps } from "./types";
import { TabButton, TabList, TabsRoot } from "./styled";

const getFirstEnabledValue = <T extends string>(options: TabOption<T>[]) =>
  options.find((option) => !option.disabled)?.value;

function Tabs<T extends string>({
  options,
  ariaLabel,
  value,
  defaultValue,
  onChange,
  className,
  fullWidth = false,
}: TabsProps<T>) {
  const fallbackValue = useMemo(() => getFirstEnabledValue(options), [options]);

  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue ?? fallbackValue
  );

  const hasValidInternalValue =
    internalValue !== undefined &&
    options.some((option) => option.value === internalValue && !option.disabled);

  const normalizedInternalValue = hasValidInternalValue
    ? internalValue
    : defaultValue ?? fallbackValue;

  const activeValue = value ?? normalizedInternalValue;

  if (!options.length || activeValue === undefined) {
    return null;
  }

  const handleSelect = (option: TabOption<T>) => {
    if (option.disabled) {
      return;
    }

    if (value === undefined) {
      setInternalValue(option.value);
    }

    onChange?.(option.value);
    option.onSelect?.(option.value);
  };

  return (
    <TabsRoot className={className} $fullWidth={fullWidth}>
      <TabList role="tablist" aria-label={ariaLabel}>
        {options.map((option) => {
          const isActive = option.value === activeValue;

          return (
            <TabButton
              key={option.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-disabled={option.disabled ? true : undefined}
              disabled={option.disabled}
              $active={isActive}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </TabButton>
          );
        })}
      </TabList>
    </TabsRoot>
  );
}

export type { TabOption } from "./types";

export default Tabs;