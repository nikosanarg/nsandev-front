export type TabOption<T extends string = string> = {
  value: T;
  label: string;
  disabled?: boolean;
  onSelect?: (value: T) => void;
};

export type TabsProps<T extends string = string> = {
  options: TabOption<T>[];
  ariaLabel: string;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  className?: string;
  fullWidth?: boolean;
};