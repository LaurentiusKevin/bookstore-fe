"use client";

import { bookListAPI, bookPurchaseAPI } from "@/apis/book.api";
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
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const route = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<BookResponse[]>([]);
  const loaderRef = useRef(null);

  const token = localStorage.getItem("token");

  const initBookList = async () => {
    setIsLoading(true);
    const res = await bookListAPI({ page: page, pageSize: pageSize });

    if (res?.data.data.books) {
      setIsLoading(false);
      setBooks((prev) => [...prev, ...res?.data.data.books]);
      setMaxPage(res?.data.data.totalPage);
    }
  };

  const purchase = async (book_id: number) => {
    await bookPurchaseAPI();
  };

  useEffect(() => {
    initBookList();
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8, // 80% from the top
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && page <= maxPage) {
          setPage((prevPage) => prevPage + 1); // Load more data when the threshold is reached
        }
      });
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
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
              {token === null ? (
                <Button
                  variant="outlined"
                  size="md"
                  color="primary"
                  sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                  fullWidth
                  onClick={() => route.push("/auth/login")}
                >
                  Purchase
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  size="md"
                  color="primary"
                  sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                  fullWidth
                  // onClick={() => route.push("/auth/login")}
                >
                  Purchase
                </Button>
              )}
            </div>
          </Card>
        ))}
        <div ref={loaderRef}>Loading...</div>
      </Stack>
    </AdminLayout>
  );
}
