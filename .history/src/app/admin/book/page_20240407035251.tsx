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
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import BookDrawer from "./drawer";
import { BookResponse } from "@/interfaces";

export default function BookPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [selectedBook, setSelectedBook] = useState({});

  const initBookList = async () => {
    const res = await bookListAPI({ page: page, pageSize: pageSize });

    console.log(res?.data.data);
    setBooks(res?.data.data.books);
  };

  useEffect(() => {
    initBookList();
  }, []);

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
            color="primary"
            startDecorator={<FiPlus />}
            size="sm"
            onClick={() => setIsOpenDrawer(true)}
          >
            Create
          </Button>
        </Box>
        {books?.map((item, key) => (
          <Card key={key} sx={{ width: 320 }}>
            <div>
              <Typography level="title-lg">{item.title}</Typography>
              <Typography level="body-sm">{item.writer.name}</Typography>
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img
                src={item.cover_image}
                srcSet={item.cover_image}
                loading="lazy"
                alt={item.title}
              />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <div>
                <Typography level="body-xs">Total price:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  {item.point} Points
                </Typography>
              </div>
              <div>
                <Typography level="body-xs">Tags:</Typography>
                <Stack flex={1} flexDirection="row" gap={1} flexWrap="wrap">
                  {item.tags.map((item) => (
                    <Typography fontSize="md" fontWeight="lg">
                      {item.title}
                    </Typography>
                  ))}
                </Stack>
              </div>
            </CardContent>
            <div>
              <Button
                variant="outlined"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                fullWidth
              >
                Purchase
              </Button>
            </div>
          </Card>
        ))}
      </AdminLayout>
      <BookDrawer
        isOpen={isOpenDrawer}
        setOpen={setIsOpenDrawer}
        selectedData={selectedBook}
        initBookList={initBookList}
      />
    </>
  );
}
