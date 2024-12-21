import { test } from "./base";

test("should request an invitation successfully", async ({
  page,
  fixtures: { $home, $invitationModal, $toast },
}) => {
  await page.goto("/");

  await $home.isReady();
  await $home.requestBtn.click();

  await $invitationModal.isReady();
  await $invitationModal.fillDetails({
    name: "John Doe",
    email: "john@gmail.com",
    confirmEmail: "john@gmail.com",
  });

  await $invitationModal.submit();

  await $invitationModal.isProcessingRequest();
  await $invitationModal.isRequestCompleted();

  await $toast.isReady();
  await $toast.validateContent({
    title: "Invitation sent!",
    description: "We can't wait to have your friend at Brocolli & Co!",
    color: "rgb(50, 205, 50)",
  });
  await $toast.isClosed();
});
