import styled from "styled-components";
import Button from "../../ui/Button";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "../../ui/ControlledInput";
import { inviteFormSchema } from "@/validator";
import { useToast } from "@/store/useToast";
import { useInviteService } from "@/services/useInviteService";
import Spinner from "../../ui/Spinner";
import { ToastType } from "../../ui/Toast/constants";
import { useEffect } from "react";

interface Props {
  fullWidth?: boolean;
}

export interface InviteFormState {
  name: string;
  email: string;
  confirmEmail: string;
}

const Form = ({ fullWidth }: Props) => {
  const { open } = useToast();
  const { invite, loading } = useInviteService();

  const form = useForm<InviteFormState>({
    defaultValues: {
      name: "",
      email: "",
      confirmEmail: "",
    },
    resolver: zodResolver(inviteFormSchema),
  });

  const {
    formState: { isSubmitted, errors },
    watch,
    clearErrors,
    setError,
    reset,
  } = form;

  const email = watch("email");
  const confirmEmail = watch("confirmEmail");

  useEffect(() => {
    if (!isSubmitted || !confirmEmail || errors.email) {
      return;
    }

    if (email === confirmEmail) {
      clearErrors("confirmEmail");
      return;
    }

    setError("confirmEmail", {
      message: "Email must match the one provided above",
    });
  }, [email, confirmEmail, isSubmitted, clearErrors, setError, errors.email]);

  const onSubmit: SubmitHandler<InviteFormState> = async (data) => {
    const response = await invite({
      name: data.name,
      email: data.email,
    });

    if (response.success) {
      open({
        title: "Invitation sent!",
        type: ToastType.Success,
        description: "We can't wait to have your friend at Brocolli & Co!",
      });
      reset({ name: "", email: "", confirmEmail: "" });
      return;
    }

    open({
      title: "Oops, please try again!",
      type: ToastType.Failure,
      description: response.errorMessage,
    });

    if (response.errorMessage.toLowerCase().includes("email")) {
      const errorMessage = "Email is already in use";
      setError("email", { message: errorMessage });
      setError("confirmEmail", { message: errorMessage });
    }
  };

  const disabled = Object.keys(errors).length > 0 || loading;

  return (
    <>
      {loading && <Spinner />}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Container fullWidth={fullWidth}>
            <ControlledInput name="name" placeholder="Name" />
            <ControlledInput name="email" placeholder="Email" />
            <ControlledInput name="confirmEmail" placeholder="Confirm email" />
            <StyledButton disabled={disabled}>Invite!</StyledButton>
          </Container>
        </form>
      </FormProvider>
    </>
  );
};

const Container = styled("div")<{ fullWidth?: boolean }>`
  width: ${(props) => (props.fullWidth ? "100%" : "unset")};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 40px;

  & > * {
    background-color: white;
    min-height: 50px;
  }

  :disabled {
    background-color: ${(props) => props.theme.color.gray3};
  }
`;

export default Form;
