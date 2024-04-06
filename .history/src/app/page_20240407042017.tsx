"use client";

import { bookListAPI } from "@/apis/book.api";
import AdminLayout from "@/components/admin/admin-layout";
import { BookResponse } from "@/interfaces";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<BookResponse[]>([]);

  const initBookList = async () => {
    setIsLoading(true);
    const res = await bookListAPI({ page: page, pageSize: pageSize });

    setIsLoading(false);
    setBooks(res?.data.data.books);
  };

  const handleScroll = () => {
    // Calculate 80% of the document height
    const eightyPercentHeight = document.documentElement.scrollHeight * 0.8;
    // Calculate the distance between the top of the document and the bottom of the viewport
    const scrollPosition = window.innerHeight + window.pageYOffset;

    // If the user has scrolled to approximately 80% of the document height and not already loading data
    if (scrollPosition >= eightyPercentHeight && !isLoading) {
      initBookList();
    }
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
      <Stack flexDirection="row" flexWrap="wrap" gap={2}>
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
                <Typography level="body-xs">Price:</Typography>
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
                sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                fullWidth
              >
                Purchase
              </Button>
            </div>
          </Card>
        ))}
      </Stack>
    </AdminLayout>
  );
}
