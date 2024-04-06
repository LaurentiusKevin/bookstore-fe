import Sheet from "@mui/joy/Sheet";
import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  FormLabel,
  Input,
  ModalClose,
  Stack,
} from "@mui/joy";
import * as React from "react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormHelperText from "@mui/joy/FormHelperText";

export default function InstallmentProviderDrawer({
  isOpen,
  setOpen,
  inputData,
  mutation,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  inputData: any;
  mutation: UseMutationResult<
    any,
    Error,
    Database["public"]["Tables"]["installment_provider"]["Row"],
    unknown
  >;
}) {
  const onSubmit = () => {};

  useEffect(() => {
    if (inputData) {
      // setValue("id", inputData.id);
      // setValue("title", inputData.title);
    } else {
      // resetField("id");
      // resetField("title");
    }
  }, [inputData]);

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
            <input type="hidden" {...register("id")} />
            <DialogContent sx={{ gap: 2 }}>
              <FormControl error={errors.title?.message !== undefined}>
                <FormLabel>Provider</FormLabel>
                <Input {...register("title", { required: "Required!" })} />
                <FormHelperText>{errors.title?.message}</FormHelperText>
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
              <Button type="submit" disabled={mutation.isPending}>
                Save
              </Button>
            </Stack>
          </Sheet>
        </form>
      </Sheet>
    </Drawer>
  );
}
