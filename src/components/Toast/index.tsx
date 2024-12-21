/* eslint-disable no-restricted-imports */
import * as RadixToast from "@radix-ui/react-toast";
import { ToastProps } from "@radix-ui/react-toast";
import styled from "styled-components";
import { ToastType } from "./constants";

const Toast = ({
  open,
  onOpenChange,
  title,
  description,
  type,
}: {
  open: ToastProps["open"];
  onOpenChange: ToastProps["onOpenChange"];
  title: string;
  description: string;
  type: ToastType;
}) => {
  return (
    <Root
      $type={type}
      open={open}
      type="foreground"
      onOpenChange={(isOpen) => onOpenChange?.(isOpen)}
    >
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Root>
  );
};

export const Viewport = styled(RadixToast.Viewport)`
  position: fixed;
  bottom: 0;
  left: 50vw;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 10px;
  width: 350px;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
  background-color: transparent;
`;

const Root = styled(RadixToast.Root)<{ $type: ToastType }>`
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: "title action" "description action";
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;

  &,
  & > * {
    background-color: ${(props) =>
      props.$type === ToastType.Success
        ? props.theme.color.lime
        : props.theme.color.scarlet};
    color: ${(props) => props.theme.color.white};
  }

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(calc(100% + var(--viewport-padding)));
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes swipeOut {
    from {
      transform: translateY(var(--radix-toast-swipe-end-x));
    }
    to {
      transform: translateY(calc(100% + var(--viewport-padding)));
    }
  }

  &[data-state="open"] {
    animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state="closed"] {
    animation: hide 100ms ease-in;
  }
  &[data-swipe="move"] {
    transform: translateY(var(--radix-toast-swipe-move-x));
  }
  &[data-swipe="cancel"] {
    transform: translateY(0);
    transition: transform 200ms ease-out;
  }
  &[data-swipe="end"] {
    animation: swipeOut 100ms ease-out;
  }
`;

const Title = styled(RadixToast.Title)`
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 15px;
  font-weight: 600;
`;

const Description = styled(RadixToast.Description)`
  grid-area: description;
  margin: 0;
  font-size: 13px;
  line-height: 1.3;
`;

export default Toast;
