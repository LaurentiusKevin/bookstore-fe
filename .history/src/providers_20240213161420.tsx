"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import {
  Experimental_CssVarsProvider,
  experimental_extendTheme,
  THEME_ID,
} from "@mui/material";
import CssBaseline from "@mui/joy/CssBaseline";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CssVarsProvider } from "@mui/joy/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5 * 1000 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {/*<Experimental_CssVarsProvider*/}
      {/*  theme={{ [THEME_ID]: experimental_extendTheme() }}*/}
      {/*>*/}
      {/*  <CssVarsProvider>*/}
      {/*    <CssBaseline />*/}
      {/*    <LocalizationProvider dateAdapter={AdapterMoment}>*/}
      {children}
      {/*    </LocalizationProvider>*/}
      {/*  </CssVarsProvider>*/}
      {/*</Experimental_CssVarsProvider>*/}
    </QueryClientProvider>
  );
}
