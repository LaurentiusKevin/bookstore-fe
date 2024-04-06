"use client";

import { bookListAPI } from "@/apis/book.api";
import AdminLayout from "@/components/admin/admin-layout";
import { BookResponse } from "@/interfaces";
import { Box, Button, Typography } from "@mui/joy";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function Home() {
  const [books, setBooks] = useState<BookResponse[]>([]);

  const initBookList = async () => {
    const res = await bookListAPI({ page: page, pageSize: pageSize });

    setBooks(res?.data.data.books);
  };

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
