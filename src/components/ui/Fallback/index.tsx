import * as RadixDialog from "@radix-ui/react-dialog";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

const Fallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <RadixDialog.Root open>
      <RadixDialog.Portal>
        <Overlay />
        <Content onEscapeKeyDown={(e) => e.preventDefault()}>
          <TitleContainer>
            <RadixDialog.Title>Oops! Something went wrong</RadixDialog.Title>
            <Description onClick={() => resetErrorBoundary()}>
              It's not you. It's us. Click here to retry
            </Description>
          </TitleContainer>
        </Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
const Content = styled(RadixDialog.Content)`
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
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
`;

const Overlay = styled(RadixDialog.Overlay)`
  inset: 0;
  opacity: 0.8;
  z-index: 1000;
  position: fixed;
  background-color: ${(props) => props.theme.color.gray1};
`;

const Description = styled(RadixDialog.Description)`
  cursor: pointer;
  color: ${(props) => props.theme.color.red};
`;

export default Fallback;
