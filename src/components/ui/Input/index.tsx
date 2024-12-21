import { forwardRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import styled from "styled-components";

type Props = {
  placeholder?: string;
} & ControllerRenderProps;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, placeholder, ...rest }, ref) => {
    return (
      <Fieldset>
        <FormInput
          id={name}
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
      </Fieldset>
    );
  }
);
const Fieldset = styled.fieldset`
  all: unset;
  width: 100%;
  display: flex;
`;

const FormInput = styled.input`
  width: 100%;
  min-height: 42px;
  font-weight: 500;
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontSizes.base};
  background-color: ${(props) => props.theme.color.white};
  padding: 4px 10px;
  color: ${(props) => props.theme.color.gray1};
`;

Input.displayName = "Input";

export default Input;
