import { media } from "@/theme";
import styled, { useTheme } from "styled-components";
import { forwardRef, ReactNode } from "react";
import Typo from "./Typography";

interface Props {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ onClick, children, className, disabled }, ref) => {
    const theme = useTheme();

    return (
      <ButtonContainer className={className}>
        <StyledButton disabled={disabled} ref={ref} onClick={onClick}>
          <Typo.Label color={theme.color.gray1}>{children}</Typo.Label>
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

Button.displayName = "Button";

export default Button;
