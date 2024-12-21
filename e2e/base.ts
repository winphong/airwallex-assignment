import { test as base } from "@playwright/test";
import { HomePage } from "./pages/home-page";
import { InvitationFormModal } from "./pages/invitation-form-modal";
import { Toast } from "./pages/toast";

type Fixtures = {
  fixtures: {
    $home: HomePage;
    $invitationModal: InvitationFormModal;
    $toast: Toast;
  };
};

export const test = base.extend<Fixtures>({
  fixtures: async ({ page }, setup) => {
    await setup({
      $home: new HomePage(page),
      $invitationModal: new InvitationFormModal(page),
      $toast: new Toast(page),
    });
  },
});

export { expect } from "@playwright/test";
