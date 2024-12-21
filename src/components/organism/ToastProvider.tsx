// eslint-disable-next-line no-restricted-imports
import * as RadixToast from "@radix-ui/react-toast";
import { useToast } from "@/store/useToast";
import Toast, { Viewport } from "@/ui/Toast";

const ToastContext = () => {
  const { isOpen, close, title, type, description } = useToast();

  return (
    <RadixToast.Provider duration={3000} swipeDirection="down">
      <Toast
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            close();
          }
        }}
        title={title}
        description={description}
        type={type}
      />
      <Viewport />
    </RadixToast.Provider>
  );
};

export default ToastContext;
