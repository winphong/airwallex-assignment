import { media } from "@/theme";
import styled from "styled-components";
import { Label } from "@/components/Typography";
import { ReactNode } from "react";

interface Props {
  onClick: () => void;
  children: ReactNode;
}

const Button = ({ onClick, children }: Props) => {
  return (
    <ButtonContainer>
      <StyledButton onClick={onClick}>
        <Label>{children}</Label>
      </StyledButton>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  width: 30vw;
  :hover {
    cursor: pointer;
  }

  ${media("sm")} {
    width: 40vw;
  }

  ${media("xs")} {
    width: 50vw;
  }
`;

const StyledButton = styled.button`
  min-height: 60px;
  width: 100%;
  background-color: beige;
  border-radius: 0.3rem;
`;

export default Button;
