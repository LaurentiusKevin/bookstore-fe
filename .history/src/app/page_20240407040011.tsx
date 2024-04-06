"use client";

import { bookListAPI } from "@/apis/book.api";
import AdminLayout from "@/components/admin/admin-layout";
import { BookResponse } from "@/interfaces";
import { Box, Button, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [books, setBooks] = useState<BookResponse[]>([]);

  const initBookList = async () => {
    const res = await bookListAPI({ page: page, pageSize: pageSize });

    setBooks(res?.data.data.books);
  };

  useEffect(() => {
    initBookList();
  }, []);

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
