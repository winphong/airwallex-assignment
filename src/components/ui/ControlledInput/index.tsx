import { ForwardedRef, forwardRef, useCallback } from "react";
import { Controller, useFormContext, Path, FieldValues } from "react-hook-form";
import Input from "@/ui/Input";
import styled from "styled-components";

type ControlledInputProps<T> = {
  name: Path<T>;
  placeholder?: string;
};

export const ControlledInput = forwardRef(
  <T extends FieldValues>(
    { name, placeholder }: ControlledInputProps<T>,
    forwardedRef: ForwardedRef<HTMLInputElement>
  ) => {
    const {
      control,
      formState: { errors },
    } = useFormContext<T>();

    const handleRef = useCallback(
      (instance: HTMLInputElement | null) => {
        if (typeof forwardedRef === "function") {
          forwardedRef(instance);
        } else if (forwardedRef) {
          forwardedRef.current = instance;
        }
      },
      [forwardedRef]
    );

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const error = errors[field.name];

          return (
            <div>
              <Input
                {...field}
                ref={(e: HTMLInputElement | null) => {
                  handleRef(e);
                  field.ref(e);
                }}
                placeholder={placeholder}
              />
              {error && typeof error.message === "string" && (
                <ErrorText>{error.message}</ErrorText>
              )}
            </div>
          );
        }}
      />
    );
  }
);

const ErrorText = styled.p`
  color: ${(props) => props.theme.color.red};
  font-style: italic;
`;

ControlledInput.displayName = "ControlledInput";
