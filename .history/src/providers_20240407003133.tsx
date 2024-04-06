"use client";

import React, { ReactNode } from "react";
import CssBaseline from "@mui/joy/CssBaseline";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CssVarsProvider } from "@mui/joy/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5 * 1000 } },
  });

  return <>{children}</>;
}
