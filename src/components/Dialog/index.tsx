import { media } from "@/theme";
import * as RadixDialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  title: ReactNode;
  children: ReactNode;
  trigger: ReactNode;
}
const Dialog = ({ children, title, trigger }: Props) => (
  <RadixDialog.Root>
    <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
    <RadixDialog.Portal>
      <Overlay />
      <Content onEscapeKeyDown={(e) => e.preventDefault()}>
        <TitleContainer>
          <RadixDialog.Title>{title}</RadixDialog.Title>
          <RadixDialog.Description>Start now!</RadixDialog.Description>
        </TitleContainer>
        {children}
      </Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
);

export default Dialog;

const Content = styled(RadixDialog.Content)`
  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  ${media("sm")} {
    padding: 30px;
  }

  z-index: 1001;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  max-width: 450px;
  min-width: 300px;
  max-height: 85vh;
  padding: 50px 40px;
  animation: contentShow 200ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const Overlay = styled(RadixDialog.Overlay)`
  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  inset: 0;
  opacity: 0.8;
  z-index: 1000;
  position: fixed;
  background-color: ${(props) => props.theme.color.gray1};
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  height: 160px;
  align-content: center;
  transform: translateY(-25px);
`;
