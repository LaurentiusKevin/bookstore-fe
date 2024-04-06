import { Box, CssBaseline, CssVarsProvider, Stack } from "@mui/joy";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { ReactNode } from "react";
import AdminBreadcrumbs from "@/components/admin/breadcrumbs";

export default function AdminLayout({
  children,
  contentMaxWidth = undefined,
  pageTitle = undefined,
}: {
  children?: ReactNode;
  contentMaxWidth?: string | undefined;
  pageTitle?: string;
}) {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: "calc(12px + var(--Header-height))", md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
            overflow: "auto",
          }}
        >
          <Box sx={{ flex: 1, width: "100%" }}>
            <Box
              sx={{
                position: "sticky",
                top: { sm: -100, md: -110 },
                bgcolor: "background.body",
                // zIndex: 9995,
              }}
            >
              <Box sx={{ px: { xs: 2, md: 6 } }}>
                <AdminBreadcrumbs />
                <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                  {pageTitle}
                </Typography>
              </Box>
              <Stack
                spacing={4}
                sx={{
                  display: "flex",
                  maxWidth: contentMaxWidth,
                  mx: "auto",
                  px: { xs: 2, md: 6 },
                  py: { xs: 2, md: 3 },
                }}
              >
                {children}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
