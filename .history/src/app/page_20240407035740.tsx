"use client";

import AdminLayout from "@/components/admin/admin-layout";
import { Box, Button } from "@mui/joy";
import { FiPlus } from "react-icons/fi";

export default function Home() {
  return (
    <AdminLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Button
          component="a"
          color="primary"
          startDecorator={<FiPlus />}
          size="sm"
          // onClick={() => setIsOpenDrawer(true)}
        >
          Create
        </Button>
      </Box>
    </AdminLayout>
  );
}
