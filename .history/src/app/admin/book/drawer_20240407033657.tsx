import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  ModalClose,
  Stack,
  Sheet,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Autocomplete,
  AutocompleteOption,
  ListItemDecorator,
} from "@mui/joy";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormBook, TagListParams, WriterListParams } from "@/interfaces";
import FormInput, { InputType } from "@/components/form-input";
import { writerListAPI } from "@/apis/writer.api";
import { FiPlus } from "react-icons/fi";
import { tagListAPI } from "@/apis/tag.api";
import { bookCreateAPI } from "@/apis/book.api";

export default function BookDrawer({
  isOpen,
  setOpen,
  selectedData,
  initBookList,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedData?: any;
  initBookList: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [writerList, setWriterList] = useState<WriterListParams[]>([]);
  const [tagList, setTagList] = useState<TagListParams[]>([]);
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<FormBook>();

  const initWriterList = async () => {
    const writer = await writerListAPI();

    setWriterList(writer?.data.data);
  };

  const initTagList = async () => {
    const tags = await tagListAPI();

    setTagList(tags?.data.data);
  };

  const onSubmit = async (data: FormBook) => {
    const book = await bookCreateAPI({
      book: {
        title: data.title,
        point: data.point,
        cover_image: data.cover_image,
      },
      writer: {
        name: data.writer,
      },
      tags: selectedTag,
    });

    setOpen(false);
  };

  useEffect(() => {
    if (selectedData) {
      // setValue("id", inputData.id);
      // setValue("title", inputData.title);
    } else {
      // resetField("id");
      // resetField("title");
    }
  }, [selectedData]);

  useEffect(() => {
    initWriterList();
    initTagList();
  }, []);

  return (
    <Drawer
      size="md"
      variant="plain"
      anchor="right"
      open={isOpen}
      onClose={() => {
        initBookList();
        setOpen(false);
      }}
      slotProps={{
        content: {
          sx: {
            bgcolor: "transparent",
            p: { md: 3, sm: 0 },
            boxShadow: "none",
          },
        },
      }}
      style={{ zIndex: 5 }}
    >
      <Sheet
        sx={{
          borderRadius: "md",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
          overflow: "auto",
        }}
      >
        <DialogTitle>Modify Data</DialogTitle>
        <ModalClose />
        <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
          <Sheet
            sx={{
              borderRadius: "md",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Divider sx={{ mt: "auto" }} />
            {/* <input type="hidden" {...register("id")} /> */}
            <DialogContent sx={{ gap: 2 }}>
              <FormControl error={errors.title?.message !== undefined}>
                <FormLabel>Title</FormLabel>
                <Input {...register("title", { required: "Required!" })} />
                <FormHelperText>{errors.title?.message}</FormHelperText>
              </FormControl>
              <FormControl error={errors.writer?.message !== undefined}>
                <FormLabel>Writer</FormLabel>
                <Input {...register("writer", { required: "Required!" })} />
                <FormHelperText>{errors.writer?.message}</FormHelperText>
              </FormControl>
              <FormControl error={errors.cover_image?.message !== undefined}>
                <FormLabel>Cover Image</FormLabel>
                <Input
                  {...register("cover_image", { required: "Required!" })}
                  defaultValue="https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
                />
                <FormHelperText>{errors.cover_image?.message}</FormHelperText>
              </FormControl>
              <FormControl error={errors.point?.message !== undefined}>
                <FormLabel>Point</FormLabel>
                <Input
                  {...register("point", { required: "Required!" })}
                  type="number"
                />
                <FormHelperText>{errors.point?.message}</FormHelperText>
              </FormControl>
              <FormControl error={errors.point?.message !== undefined}>
                <FormLabel>Tag</FormLabel>
                <Autocomplete
                  placeholder="Tags"
                  multiple
                  options={tagList.map((item) => item.title)}
                  onChange={(event, newValue) => setSelectedTag(newValue)}
                  // freeSolo
                  // renderOption={(props, option) => (
                  //   <AutocompleteOption {...props}>
                  //     {option.title?.startsWith('Add "') && (
                  //       <ListItemDecorator>
                  //         <FiPlus />
                  //       </ListItemDecorator>
                  //     )}
                  //     {option.title}
                  //   </AutocompleteOption>
                  // )}
                />
                <FormHelperText>{errors.tag?.message}</FormHelperText>
              </FormControl>
            </DialogContent>
            <Divider sx={{ mt: "auto" }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              useFlexGap
              spacing={1}
            >
              <Button variant="outlined" color="danger">
                Delete
              </Button>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </Stack>
          </Sheet>
        </form>
      </Sheet>
    </Drawer>
  );
}
