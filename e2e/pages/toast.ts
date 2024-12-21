import { expect, Locator, Page } from "@playwright/test";

export class Toast {
  readonly page: Page;
  readonly root: Locator;
  readonly title: Locator;
  readonly description: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = this.page.locator("#toast-root");
    this.title = this.page.locator("#toast-title");
    this.description = this.page.locator("#toast-description");
  }

  public isReady = async () => {
    await expect(this.root).toBeVisible();
    await expect(this.title).toBeVisible();
    await expect(this.description).toBeVisible();
  };

  public validateContent = async ({
    title,
    description,
    color,
  }: {
    title: string;
    description: string;
    color: string;
  }) => {
    expect(
      await this.root.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      )
    ).toEqual(color);
    await expect(this.title).toHaveText(title);
    await expect(this.description).toHaveText(new RegExp(description));
  };

  public isClosed = async () => {
    await this.title.waitFor({ state: "detached", timeout: 5000 });
    await this.description.waitFor({ state: "detached", timeout: 5000 });
    await expect(this.title).not.toBeVisible();
    await expect(this.description).not.toBeVisible();
  };
}
