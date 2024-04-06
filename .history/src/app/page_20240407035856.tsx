"use client";

import AdminLayout from "@/components/admin/admin-layout";
import { Box, Button, Typography } from "@mui/joy";
import { FiPlus } from "react-icons/fi";

export default function Home() {
  return (
    <AdminLayout>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography level="h3">Shops</Typography>
      </Box>
    </AdminLayout>
  );
}
