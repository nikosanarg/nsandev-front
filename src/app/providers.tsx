"use client";

import type { ReactNode } from "react";
import { MotionProvider } from "kaizen-lib/motion";

export default function Providers({ children }: { children: ReactNode }) {
  return <MotionProvider>{children}</MotionProvider>;
}
