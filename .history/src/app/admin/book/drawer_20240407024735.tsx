import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  ModalClose,
  Stack,
  Sheet,
} from "@mui/joy";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormBook } from "@/interfaces";
import FormInput, { InputType } from "@/components/form-input";

export default function BookDrawer({
  isOpen,
  setOpen,
  selectedData,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedData?: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<FormBook>();

  const onSubmit = () => {};

  useEffect(() => {
    if (selectedData) {
      // setValue("id", inputData.id);
      // setValue("title", inputData.title);
    } else {
      // resetField("id");
      // resetField("title");
    }
  }, [selectedData]);

  return (
    <Drawer
      size="md"
      variant="plain"
      anchor="right"
      open={isOpen}
      onClose={() => setOpen(false)}
      slotProps={{
        content: {
          sx: {
            bgcolor: "transparent",
            p: { md: 3, sm: 0 },
            boxShadow: "none",
          },
        },
      }}
      style={{ zIndex: 99999 }}
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
              <FormInput
                register={register("title", {
                  required: "Required!",
                })}
                label="Title"
                type={InputType.TEXT_INPUT}
                error={errors.title}
              />
              <FormInput
                register={register("writer", {
                  required: "Required!",
                })}
                label="Writer"
                type={InputType.TEXT_INPUT}
                error={errors.writer}
              />
              <FormInput
                register={register("cover_image", {
                  required: "Required!",
                })}
                label="Cover Image"
                type={InputType.TEXT_INPUT}
                error={errors.cover_image}
              />
              <FormInput
                register={register("point", {
                  required: "Required!",
                })}
                label="Point"
                type={InputType.NUMERIC}
                error={errors.point}
              />
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
