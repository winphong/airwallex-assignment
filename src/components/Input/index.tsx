import styled from "styled-components";

interface Props {
  fieldName: string;
  placeholder?: string;
}
const Input = ({ fieldName, placeholder }: Props) => {
  return (
    <Fieldset>
      <FormInput id={fieldName} placeholder={placeholder} />
    </Fieldset>
  );
};

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

export default Input;
