import { test } from "./base";
test("should not be allowed to request invitation if name is less than 3 characters", async ({
  page,
  fixtures: { $home, $invitationModal },
}) => {
  await page.goto("/");

  await $home.isReady();
  await $home.requestBtn.click();

  await $invitationModal.isReady();
  await $invitationModal.fillDetails({
    name: "Jo",
    email: "john@gmail.com",
    confirmEmail: "john@gmail.com",
  });
  await $invitationModal.submit();
  await $invitationModal.hasValidationError({
    nameError: "Name must be at least 3 characters long",
  });
});

test("should not be allowed to request invitation if email and confirm email mismatch", async ({
  page,
  fixtures: { $home, $invitationModal },
}) => {
  await page.goto("/");

  await $home.isReady();
  await $home.requestBtn.click();

  await $invitationModal.isReady();
  await $invitationModal.fillDetails({
    name: "John Doe",
    email: "john@gmail.com",
    confirmEmail: "john@gmail.co",
  });
  await $invitationModal.submit();
  await $invitationModal.hasValidationError({
    confirmEmailError: "Email must match the one provided above",
  });
});

test("should not be allowed to request invitation if email / confirmEmail has wrong email format", async ({
  page,
  fixtures: { $home, $invitationModal },
}) => {
  await page.goto("/");

  await $home.isReady();
  await $home.requestBtn.click();

  await $invitationModal.isReady();
  await $invitationModal.fillDetails({
    name: "John Doe",
    email: "john@gmail",
    confirmEmail: "john@gmail",
  });
  await $invitationModal.submit();
  await $invitationModal.hasValidationError({
    emailError: "Invalid email address",
    confirmEmailError: "Invalid email address",
  });
});

test("should show email is already in use error", async ({
  page,
  fixtures: { $home, $invitationModal, $toast },
}) => {
  await page.goto("/");

  await $home.isReady();
  await $home.requestBtn.click();

  await $invitationModal.isReady();
  await $invitationModal.fillDetails({
    name: "John Doe",
    email: "usedemail@airwallex.com",
    confirmEmail: "usedemail@airwallex.com",
  });

  await $invitationModal.submit();

  await $invitationModal.isProcessingRequest();
  await $invitationModal.isRequestCompleted();

  await $invitationModal.hasValidationError({
    emailError: "Email is already in use",
    confirmEmailError: "Email is already in use",
  });

  await $toast.isReady();
  await $toast.validateContent({
    title: "Oops, please try again!",
    description: "Email is already in use",
    color: "rgb(255, 36, 0)",
  });
  await $toast.isClosed();
});
