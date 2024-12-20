import styled from "styled-components";
import Button from "../Button";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "../ControlledInput";
import { inviteFormSchema } from "@/validator";

interface Props {
  fullWidth?: boolean;
}

export interface InviteFormState {
  name: string;
  email: string;
  confirmEmail: string;
}

const Form = ({ fullWidth }: Props) => {
  const form = useForm<InviteFormState>({
    defaultValues: {
      name: "",
      email: "",
      confirmEmail: "",
    },
    resolver: zodResolver(inviteFormSchema),
  });

  const onSubmit: SubmitHandler<InviteFormState> = (data) => {
    console.log(data);
  };

  const disabled = Object.keys(form.formState.errors).length > 0;

  return (
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
