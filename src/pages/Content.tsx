import styled from "styled-components";
import Button from "@/components/Button";
import Typo from "@/components/Typography";
import { media } from "@/theme";
import Form from "@/components/Form";
import Dialog from "@/components/Dialog";
import Toast, { Viewport } from "@/components/Toast";
import { useState } from "react";

export const Content = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Flex>
        <Title>
          <span>A better way </span>
          <span>to enjoy every day.</span>
        </Title>
        <Typo.Label>Be the first to know when we launch.</Typo.Label>
        <Dialog
          trigger={
            <Button onClick={() => console.log("Requesting")}>
              Request an invite
            </Button>
          }
          title={
            <Typo.Label size={"1.8rem"} $weight={600}>
              Request an Invite
            </Typo.Label>
          }
        >
          <Form />
        </Dialog>
        {/* TODO: Move this to App root */}
        <Toast open={isOpen} onOpenChange={setIsOpen} />
        <Viewport />
      </Flex>
    </>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100dvh;
  gap: 2rem;
  padding: 0 4vw;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.giga};
  text-align: center;
  line-height: 1;
  display: flex;
  flex-direction: column;
  text-align: center;

  & > * {
    font-weight: 600;
  }

  ${media("sm")} {
    font-size: ${(props) => props.theme.fontSizes.mega};
  }
`;
