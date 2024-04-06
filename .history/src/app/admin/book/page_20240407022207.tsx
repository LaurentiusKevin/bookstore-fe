"use client";

import { bookListAPI } from "@/apis/book.api";
import AdminLayout from "@/components/admin/admin-layout";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function BookPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [books, setBooks] = useState([]);

  const initBookList = async () => {
    const res = await bookListAPI({ page: page, pageSize: pageSize });
  };

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
        <Card sx={{ width: 320 }}>
          <div>
            <Typography level="title-lg">Yosemite National Park</Typography>
            <Typography level="body-sm">April 24 to May 02, 2021</Typography>
          </div>
          <AspectRatio minHeight="120px" maxHeight="200px">
            <img
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
              srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent orientation="horizontal">
            <div>
              <Typography level="body-xs">Total price:</Typography>
              <Typography fontSize="lg" fontWeight="lg">
                $2,900
              </Typography>
            </div>
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              Explore
            </Button>
          </CardContent>
        </Card>
      </AdminLayout>
    </>
  );
}
