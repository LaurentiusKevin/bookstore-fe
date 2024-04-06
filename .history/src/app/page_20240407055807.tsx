"use client";

import { bookListAPI, bookPurchaseAPI } from "@/apis/book.api";
import { latestPointAPI } from "@/apis/point.api";
import { tagListAPI } from "@/apis/tag.api";
import { writerListAPI } from "@/apis/writer.api";
import AdminLayout from "@/components/admin/admin-layout";
import BookCard from "@/components/book-card";
import { BookResponse, TagListParams, WriterListParams } from "@/interfaces";
import {
  AspectRatio,
  Autocomplete,
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
  const [availablePoint, setAvailablePoint] = useState<number>(0);
  const [writerList, setWriterList] = useState<WriterListParams[]>([]);
  const [tagList, setTagList] = useState<TagListParams[]>([]);
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [selectedWriter, setSelectedWriter] = useState<string[]>([]);
  const loaderRef = useRef(null);

  const token = localStorage.getItem("token");

  const initWriterList = async () => {
    const writer = await writerListAPI();

    setWriterList(writer?.data.data);
  };

  const initTagList = async () => {
    const tags = await tagListAPI();

    setTagList(tags?.data.data);
  };

  const initLatestPoint = async () => {
    const res = await latestPointAPI();
    setAvailablePoint(res?.data.data);
  };

  const initBookList = async () => {
    setIsLoading(true);
    const res = await bookListAPI({
      page: page,
      pageSize: pageSize,
      tags: selectedTag,
      writers: selectedWriter,
    });

    if (res?.data.data.books) {
      setIsLoading(false);
      setBooks((prev) => [...prev, ...res?.data.data.books]);
      setMaxPage(res?.data.data.totalPage);
    }
  };

  const purchase = async (book_id: number) => {
    await bookPurchaseAPI(book_id);
    initLatestPoint();
  };

  useEffect(() => {
    initBookList();
    initLatestPoint();
    initTagList();
    initWriterList();
  }, [page]);

  useEffect(() => {
    setPage(1);
    setPageSize(10);
    initBookList();
    initLatestPoint();
  }, [selectedTag, selectedWriter]);

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
          justifyContent: "space-between",
        }}
      >
        <Typography level="h3">Shops</Typography>
        <Typography level="h3">Available Points: {availablePoint}</Typography>
      </Box>
      <Card>
        <CardContent>
          <Stack flexDirection="row" gap={3}>
            <Autocomplete
              placeholder="Tags"
              multiple
              options={tagList?.map((item) => item.title) ?? []}
              onChange={(event, newValue) => setSelectedTag(newValue)}
            />
            <Autocomplete
              placeholder="Writers"
              multiple
              options={writerList?.map((item) => item.name) ?? []}
              onChange={(event, newValue) => setSelectedWriter(newValue)}
            />
          </Stack>
        </CardContent>
      </Card>
      <Stack flexDirection="row" flexWrap="wrap" gap={2}>
        {books?.map((item, key) => (
          <BookCard item={item} purchase={purchase} />
        ))}
        <div ref={loaderRef}>Loading...</div>
      </Stack>
    </AdminLayout>
  );
}
