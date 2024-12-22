import { render, screen, waitFor } from "@/tests/test-utils";
import Form from ".";
import userEvent from "@testing-library/user-event";
import { useInviteService } from "src/services/useInviteService";

describe("Form", () => {
  beforeEach(() => {
    const inviteMock = vi.fn().mockResolvedValue({ success: true });

    useInviteService.setState({
      loading: false,
      invite: inviteMock,
    });
  });

  it("should render initial Form component", () => {
    render(<Form />);

    const nameInput = screen.getByRole("textbox", { name: "Name" });
    expect(nameInput).toHaveValue("");

    const emailInput = screen.getByRole("textbox", { name: "Email" });
    expect(emailInput).toHaveValue("");

    const confirmEmailInput = screen.getByRole("textbox", {
      name: "Confirm email",
    });
    expect(confirmEmailInput).toHaveValue("");

    const button = screen.getByRole("button", { name: "Invite!" });
    expect(button).not.toBeDisabled();
  });

  it("should show form field error when submitting empty form", async () => {
    render(<Form />);

    const button = screen.getByRole("button", { name: "Invite!" });

    await userEvent.click(button);

    expect(
      screen.getByText("Name must be at least 3 characters long")
    ).toBeVisible();
    expect(screen.getAllByText("Invalid email address")).toHaveLength(2);
    expect(button).toBeDisabled();
  });

  it("should only validate fields after submitting once", async () => {
    render(<Form />);

    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const confirmEmailInput = screen.getByRole("textbox", {
      name: "Confirm email",
    });

    const button = screen.getByRole("button", { name: "Invite!" });
    expect(button).not.toBeDisabled();

    await userEvent.type(nameInput, "J");
    await userEvent.type(emailInput, "john@gmail.com");
    await userEvent.type(confirmEmailInput, "nina@gmail.com");

    // Before submitting form for the 1st time
    expect(
      screen.queryByText("Name must be at least 3 characters long")
    ).toBeNull();
    expect(
      screen.queryByText("Email must match the one provided above")
    ).toBeNull();
    expect(button).not.toBeDisabled();

    await userEvent.click(button);

    // After submitting form for the 1st time
    expect(
      screen.getByText("Name must be at least 3 characters long")
    ).toBeVisible();
    expect(
      screen.getByText("Email must match the one provided above")
    ).toBeVisible();
    expect(button).toBeDisabled();
  });

  it("should be able to submit form once form validation error is resolved", async () => {
    render(<Form />);

    const button = screen.getByRole("button", { name: "Invite!" });
    await userEvent.click(button);
    expect(button).toBeDisabled();

    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const confirmEmailInput = screen.getByRole("textbox", {
      name: "Confirm email",
    });

    await userEvent.type(nameInput, "John");
    expect(nameInput).toHaveValue("John");
    await userEvent.type(emailInput, "john@gmail.com");
    expect(emailInput).toHaveValue("john@gmail.com");
    await userEvent.type(confirmEmailInput, "john@gmail.com");
    expect(confirmEmailInput).toHaveValue("john@gmail.com");

    expect(button).not.toBeDisabled();

    await userEvent.click(button);

    await waitFor(() => expect(button).not.toBeDisabled());

    // Field will be cleared after successful submission
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(confirmEmailInput).toHaveValue("");
  });

  describe("email validations", () => {
    it("should validate email-format for confirmEmail first before validating matching with email field", async () => {
      render(<Form />);

      const button = screen.getByRole("button", { name: "Invite!" });
      // Manually trigger validation check on all fields
      await userEvent.click(button);

      const emailInput = screen.getByRole("textbox", { name: "Email" });
      const confirmEmailInput = screen.getByRole("textbox", {
        name: "Confirm email",
      });
      await userEvent.type(emailInput, "john@gmail.com");
      await userEvent.type(confirmEmailInput, "nina");

      expect(screen.getByText("Invalid email address")).toBeVisible();
      await userEvent.type(confirmEmailInput, "@gmail.com");

      expect(
        screen.getByText("Email must match the one provided above")
      ).toBeVisible();
    });

    it("should validate email field against confirmEmail on email field change", async () => {
      render(<Form />);

      const button = screen.getByRole("button", { name: "Invite!" });
      // Manually trigger validation check on all fields
      await userEvent.click(button);

      const emailInput = screen.getByRole("textbox", { name: "Email" });
      const confirmEmailInput = screen.getByRole("textbox", {
        name: "Confirm email",
      });
      await userEvent.type(confirmEmailInput, "john@gmail.com");
      expect(
        screen.getByText("Email must match the one provided above")
      ).toBeVisible();

      await userEvent.type(emailInput, "john@gmail.com");
      expect(
        screen.queryByText("Email must match the one provided above")
      ).toBeNull();
    });

    it("should validate email field against confirmEmail on email field change", async () => {
      render(<Form />);

      const button = screen.getByRole("button", { name: "Invite!" });
      // Manually trigger validation check on all fields
      await userEvent.click(button);

      const emailInput = screen.getByRole("textbox", { name: "Email" });
      const confirmEmailInput = screen.getByRole("textbox", {
        name: "Confirm email",
      });
      await userEvent.type(confirmEmailInput, "john@gmail.com");
      expect(
        screen.getByText("Email must match the one provided above")
      ).toBeVisible();

      await userEvent.type(emailInput, "john@gmail.com");
      expect(
        screen.queryByText("Email must match the one provided above")
      ).toBeNull();
    });

    it("should validate confirmEmail field against email on confirmEmail field change", async () => {
      render(<Form />);

      const button = screen.getByRole("button", { name: "Invite!" });
      // Manually trigger validation check on all fields
      await userEvent.click(button);

      const emailInput = screen.getByRole("textbox", { name: "Email" });
      const confirmEmailInput = screen.getByRole("textbox", {
        name: "Confirm email",
      });
      await userEvent.type(emailInput, "john@gmail.com");
      expect(screen.getByText("Invalid email address")).toBeVisible();

      await userEvent.type(confirmEmailInput, "john@gmail.com");
      expect(screen.queryByText("Invalid email address")).toBeNull();
      expect(
        screen.queryByText("Email must match the one provided above")
      ).toBeNull();
    });
  });

  it("should ensure name has no leading or trailing spaces", async () => {
    render(<Form />);

    const button = screen.getByRole("button", { name: "Invite!" });
    // Manually trigger validation check on all fields
    await userEvent.click(button);

    const nameInput = screen.getByRole("textbox", { name: "Name" });
    await userEvent.type(nameInput, "John Doe ");
    expect(
      screen.getByText("Name should not have spaces at the start or end")
    ).toBeVisible();

    await userEvent.clear(nameInput);
    expect(
      screen.queryByText("Name should not have spaces at the start or end")
    ).toBeNull();

    await userEvent.type(nameInput, " John Doe");
    expect(
      screen.getByText("Name should not have spaces at the start or end")
    ).toBeVisible();
  });

  it("should show feedback to user when server return email is in use error", async () => {
    useInviteService.setState({
      loading: false,
      invite: vi.fn().mockResolvedValue({
        success: false,
        errorMessage: "Email is already in use",
      }),
    });

    render(<Form />);

    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const confirmEmailInput = screen.getByRole("textbox", {
      name: "Confirm email",
    });

    await userEvent.type(nameInput, "John");
    await userEvent.type(emailInput, "xxxx@airwallex.com");
    await userEvent.type(confirmEmailInput, "xxxx@airwallex.com");

    const button = screen.getByRole("button", { name: "Invite!" });
    await userEvent.click(button);

    expect(button).toBeDisabled();

    expect(nameInput).toHaveValue("John");
    expect(emailInput).toHaveValue("xxxx@airwallex.com");
    expect(confirmEmailInput).toHaveValue("xxxx@airwallex.com");
    expect(screen.getAllByText("Email is already in use")).toHaveLength(2);
  });

  it("should show spinner after submitting request to server", async () => {
    useInviteService.setState({
      loading: false,
      invite: vi.fn(async () => {
        useInviteService.setState({ loading: true });
        // Simulate async behavior with a delay
        await new Promise((resolve) => setTimeout(resolve, 100));

        useInviteService.setState({ loading: false });
        return {
          success: true,
          errorMessage: "",
        };
      }),
    });

    render(<Form />);

    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const confirmEmailInput = screen.getByRole("textbox", {
      name: "Confirm email",
    });

    await userEvent.type(nameInput, "John");
    await userEvent.type(emailInput, "xxxx@airwallex.com");
    await userEvent.type(confirmEmailInput, "xxxx@airwallex.com");

    const button = screen.getByRole("button", { name: "Invite!" });
    await userEvent.click(button);

    await waitFor(() => expect(screen.getByRole("status")).toBeVisible());
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
  });
});
