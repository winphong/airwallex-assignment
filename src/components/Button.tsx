import { media } from "@/theme";
import styled from "styled-components";
import { ReactNode } from "react";
import Typo from "./Typography";
import React from "react";

interface Props {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ onClick, children, className }, ref) => {
    return (
      <ButtonContainer className={className}>
        <StyledButton ref={ref} onClick={onClick}>
          <Typo.Label>{children}</Typo.Label>
        </StyledButton>
      </ButtonContainer>
    );
  }
);

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
  border-radius: 0.3rem;
`;

export default Button;
