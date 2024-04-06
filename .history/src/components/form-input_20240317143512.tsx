import { FormControl, FormLabel, Input, Option, Select } from "@mui/joy";
import Textarea from "@mui/joy/Textarea";
import React, { ChangeEvent } from "react";
import FormHelperText from "@mui/joy/FormHelperText";
import { NumericFormat } from "react-number-format";
import { Control, Controller, FieldValue } from "react-hook-form";

export enum InputType {
  TEXT_AREA,
  DATE_INPUT,
  NUMERIC,
  TEXT_INPUT,
  SELECT,
}

export default function FormInput({
  label,
  type,
  register,
  error,
  endDecorator,
  control,
  children,
  defaultValue,
}: Readonly<{
  label: string;
  type: InputType;
  register?: any;
  error?: any;
  endDecorator?: any;
  value?: string;
  onChange?: (newValue: ChangeEvent) => void;
  control?: Control<FieldValue<any>>;
  children?: any;
  defaultValue?: any;
}>) {
  return (
    <FormControl error={error?.message !== undefined}>
      <FormLabel>{label}</FormLabel>
      {type === InputType.TEXT_INPUT && (
        <Input
          {...register}
          endDecorator={endDecorator}
          // value={value}
        />
      )}
      {type === InputType.TEXT_AREA && (
        <Controller
          control={control}
          name={register.name}
          render={({ field: { onChange, name, value } }) => (
            <Textarea
              {...register}
              minRows={3}
              value={value}
              onChange={(event) => onChange(event.currentTarget.value)}
            />
            // <NumericFormat
            //   customInput={Input}
            //   prefix="Rp "
            //   decimalSeparator=","
            //   thousandSeparator="."
            //   name={name}
            //   value={value}
            //   onValueChange={(item) => onChange(item.value)}
            // />
          )}
        />
      )}
      {type === InputType.DATE_INPUT && (
        <Input
          {...register}
          type="date"
          // value={value}
          // onChange={(newValue) => setValue(newValue.currentTarget.value ?? "")}
        />
      )}
      {type === InputType.SELECT && <Select {...register}>{children}</Select>}
      {type === InputType.NUMERIC && (
        <Controller
          control={control}
          name={register.name}
          defaultValue={defaultValue}
          render={({ field: { onChange, name, value } }) => (
            <NumericFormat
              customInput={Input}
              prefix="Rp "
              decimalSeparator=","
              thousandSeparator="."
              name={name}
              value={value}
              onValueChange={(item) => onChange(item.value)}
            />
          )}
        />
      )}
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
