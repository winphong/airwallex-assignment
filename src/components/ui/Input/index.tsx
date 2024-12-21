import { forwardRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import styled, { css } from "styled-components";

type Props = {
  placeholder?: string;
  $error?: boolean;
} & ControllerRenderProps;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, placeholder, $error, ...rest }, ref) => {
    return (
      <Fieldset>
        <HiddenLabel htmlFor={name}>{placeholder}</HiddenLabel>
        <FormInput
          {...rest}
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          ref={ref}
          $error={$error}
        />
      </Fieldset>
    );
  }
);
const Fieldset = styled.fieldset`
  all: unset;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HiddenLabel = styled.label`
  font-size: 0;
`;

const errorStyles = css`
  border: 1.5px solid ${(props) => props.theme.color.red};

  :focus,
  :focus-visible {
    outline: ${(props) => props.theme.color.red} auto 1px;
  }
`;

const FormInput = styled.input<{ $error?: boolean }>`
  min-height: 42px;
  font-weight: 500;
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontSizes.base};
  background-color: ${(props) => props.theme.color.white};
  padding: 4px 10px;
  color: ${(props) => props.theme.color.gray1};

  ${(props) => props.$error && errorStyles}
`;

Input.displayName = "Input";

export default Input;
