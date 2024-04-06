"use client";

import AdminLayout from "@/components/admin/admin-layout";
import { Box, Button } from "@mui/joy";

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
            startDecorator={<HiPlus />}
            size="sm"
          >
            Create
          </Button>
        </Box>
      </AdminLayout>
    </>
  );
}
