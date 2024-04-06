"use client";

import AdminLayout from "@/components/admin/admin-layout";
import { Box, Button } from "@mui/joy";
import { FiPlus } from "react-icons/fi";

export default function BookPage() {
  return (
    <>
      <AdminLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button
            component="a"
            href="/admin/loans/my-loans/create"
            color="primary"
            startDecorator={<FiPlus />}
            size="sm"
          >
            Create
          </Button>
        </Box>
      </AdminLayout>
    </>
  );
}
