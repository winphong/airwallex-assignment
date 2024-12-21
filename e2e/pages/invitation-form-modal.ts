import { expect, Locator, Page } from "@playwright/test";

export class InvitationFormModal {
  readonly page: Page;
  readonly dialog: Locator;
  readonly nameField: Locator;
  readonly nameError: Locator;
  readonly emailField: Locator;
  readonly emailError: Locator;
  readonly confirmEmailField: Locator;
  readonly confirmEmailError: Locator;

  readonly inviteBtn: Locator;
  readonly spinner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = this.page.getByRole("dialog");
    this.nameField = this.page.getByRole("textbox", {
      name: "Name",
    });
    this.nameError = this.page
      .getByRole("textbox", {
        name: "Name",
      })
      .locator("xpath=../following-sibling::p");
    this.emailField = this.page.getByRole("textbox", {
      name: "Email",
      exact: true,
    });
    this.emailError = this.page
      .getByRole("textbox", {
        name: "Email",
        exact: true,
      })
      .locator("xpath=../following-sibling::p");
    this.confirmEmailField = this.page.getByRole("textbox", {
      name: "Confirm email",
      exact: true,
    });
    this.confirmEmailError = this.confirmEmailField.locator(
      "xpath=../following-sibling::p"
    );
    this.inviteBtn = this.page.getByRole("button", {
      name: "Invite!",
    });
    this.spinner = this.page.getByRole("status");
  }

  public isReady = async () => {
    await expect(this.dialog).toBeVisible();
    await expect(this.nameField).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.confirmEmailField).toBeVisible();
    await expect(this.inviteBtn).toBeVisible();
  };

  public fillDetails = async ({
    name,
    email,
    confirmEmail,
  }: {
    name: string;
    email: string;
    confirmEmail: string;
  }) => {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.confirmEmailField.fill(confirmEmail);
  };

  public fillInvalidDetails = async () => {
    await this.nameField.fill("John Doe");
    await this.emailField.fill("usedemail@airwallex.com");
    await this.confirmEmailField.fill("usedemail@airwallex.com");
  };

  public submit = async () => {
    await this.inviteBtn.click();
  };

  public isProcessingRequest = async () => {
    await expect(this.spinner).toBeVisible();
  };

  public isRequestCompleted = async () => {
    await expect(this.spinner).not.toBeVisible({ timeout: 5000 });
  };

  public hasValidationError = async ({
    nameError,
    emailError,
    confirmEmailError,
  }: Partial<{
    nameError: string;
    emailError: string;
    confirmEmailError: string;
  }>) => {
    if (nameError) {
      await expect(this.nameError).toHaveText(nameError);
    }
    if (emailError) {
      await expect(this.emailError).toHaveText(emailError);
    }
    if (confirmEmailError) {
      await expect(this.confirmEmailError).toHaveText(confirmEmailError);
    }
  };
}
