import styled from "styled-components";
import Button from "@/components/Button";
import { Label } from "@/components/Typography";
import { media } from "@/theme";

export const Content = () => {
  return (
    <Flex>
      <Title>
        <span>A better way </span>
        <span>to enjoy every day.</span>
      </Title>
      <Label>Be the first to know when we launch.</Label>
      <Button onClick={() => console.log("Requesting")}>
        Request an invite
      </Button>
    </Flex>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100dvh;
  background-color: beige;
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

  ${media("sm")} {
    font-size: ${(props) => props.theme.fontSizes.mega};
  }
`;
