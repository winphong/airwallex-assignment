/* eslint-disable no-restricted-imports */
import * as RadixToast from "@radix-ui/react-toast";
import { useToast } from "@/store/useToast";
import Toast, { Viewport } from "@/components/Toast";

const ToastContext = () => {
  const { isOpen, close, message } = useToast();

  return (
    <RadixToast.Provider duration={3000} swipeDirection="down">
      <Toast
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            close();
          }
        }}
        message={message}
      />
      <Viewport />
    </RadixToast.Provider>
  );
};

export default ToastContext;
