"use client";

import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  CssVarsProvider,
  Divider,
  FormControl,
  FormLabel,
  formLabelClasses,
  GlobalStyles,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import { HiMiniChartPie } from "react-icons/hi2";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import SnackbarCustom from "@/components/snackbar-custom";
import { useState } from "react";
import FormInput, { InputType } from "@/components/form-input";
import { SnackbarParams } from "@/interfaces";
import { loginAPI } from "@/apis/auth.api";

interface FormData {
  username: string;
  password: string;
}

export default function AuthSignIn() {
  const route = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState("");
  const [snackbarContent, setSnackbarContent] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<FormData>();

  const handleSnackbar = ({ color, content }: SnackbarParams) => {
    setSnackbarColor(color);
    setSnackbarContent(content);
    setSnackbarOpen(true);
  };

  const onLogin = async (data: FormData) => {
    const response = await loginAPI(data);

    if (response === null) {
      handleSnackbar({
        color: "danger",
        content: "Failed to create new member",
      });
    } else {
      localStorage.setItem('user', response.data.);
      route.push("/auth/login");
    }
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="sm">
                <HiMiniChartPie />
              </IconButton>
              <Typography level="title-lg">Book Store</Typography>
            </Box>
            {/*<ColorSchemeToggle />*/}
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography level="h3">Sign in</Typography>
                <Typography>Unlock the wonders of reading</Typography>
                <Typography>
                  – be a part of our story!{" "}
                  <Link href="/auth/register">Register</Link>
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                  "--Divider-lineColor": {
                    xs: "#FFF",
                    md: "var(--joy-palette-divider)",
                  },
                },
              })}
            >
              or
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit(onLogin)}>
                <FormInput
                  register={register("username", {
                    required: "Required!",
                  })}
                  label="Username"
                  type={InputType.TEXT_INPUT}
                  error={errors.username}
                />
                <FormInput
                  register={register("password", {
                    required: "Required!",
                  })}
                  label="Password"
                  type={InputType.PASSWORD}
                  error={errors.password}
                />
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button type="submit" fullWidth>
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © BookStore {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <SnackbarCustom
        autoHideDuration={5000}
        variant="soft"
        onClose={() => setSnackbarOpen(false)}
        open={snackbarOpen}
      >
        {snackbarContent}
      </SnackbarCustom>
    </CssVarsProvider>
  );
}
