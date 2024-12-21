import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly heading: Locator;
  readonly subheading: Locator;
  readonly requestBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = this.page.getByRole("heading", { name: "Broccoli & Co." });
    this.heading = this.page.getByRole("heading", {
      name: "A better way to enjoy every day.",
    });
    this.subheading = this.page.getByRole("heading", {
      name: "Be the first to know when we launch.",
    });
    this.requestBtn = this.page.getByRole("button", {
      name: "Request an invite",
    });
  }

  public isReady = async () => {
    await expect(this.logo).toBeVisible();
    await expect(this.heading).toBeVisible();
    await expect(this.subheading).toBeVisible();
    await expect(this.requestBtn).toBeVisible();
  };
}
