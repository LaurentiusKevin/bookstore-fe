import { BookResponse } from "@/interfaces";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/joy";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookCard({
  item,
  purchase,
}: {
  item: BookResponse;
  purchase: (id: number) => Promise<void>;
}) {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handlePurchase = async (id: number) => {
    setIsLoading(true);
    await purchase(id);
    setIsLoading(false);
  };

  return (
    <Card sx={{ width: 320 }}>
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
            onClick={() => handlePurchase(parseInt(item.id))}
            disabled={isLoading}
          >
            {isLoading ? "Please wait" : "Purchase"}
          </Button>
        )}
      </div>
    </Card>
  );
}
