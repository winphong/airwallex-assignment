import styled from "styled-components";
import Button from "@/ui/Button";
import Typo from "@/ui/Typography";
import { media } from "@/theme";
import Form from "@/organism/Form";
import Dialog from "@/ui/Dialog";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/ui/Fallback";

export const Content = () => {
  return (
    <>
      <Flex>
        <Title>
          <span>A better way </span>
          <span>to enjoy every day.</span>
        </Title>
        <Typo.Label role="heading" aria-level={2}>
          Be the first to know when we launch.
        </Typo.Label>
        <ErrorBoundary
          FallbackComponent={Fallback}
          onError={(error, info) => console.log({ error, info })}
        >
          <Dialog
            trigger={<Button>Request an invite</Button>}
            title={
              <Typo.Label size={"1.8rem"} $weight={600}>
                Request an Invite
              </Typo.Label>
            }
          >
            <Form />
          </Dialog>
        </ErrorBoundary>
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
