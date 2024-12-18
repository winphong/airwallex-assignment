import styled from "styled-components";
import Input from "../Input";
import Button from "../Button";

interface Props {
  fullWidth?: boolean;
}

const Form = ({ fullWidth }: Props) => {
  return (
    <Container fullWidth={fullWidth}>
      <Input fieldName="name" placeholder="Full name" />
      <Input fieldName="email" placeholder="Email" />
      <Input fieldName="confirmEmail" placeholder="Confirm email" />
      <StyledButton onClick={() => console.log("Invite")}>Invite!</StyledButton>
    </Container>
  );
};

const Container = styled("div")<{ fullWidth?: boolean }>`
  width: ${(props) => (props.fullWidth ? "100%" : "unset")};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 40px;

  & > * {
    background-color: white;
    min-height: 50px;
  }
`;

export default Form;
