import { IconKey, icons } from "@/constants/icon";

describe("icons", () => {
  it("exports all expected icon keys", () => {
    const expectedKeys: IconKey[] = [
      "home",
      "wallet",
      "setting",
      "activity",
      "add",
      "back",
      "menu",
      "plus",
      "notion",
      "dropbox",
      "openai",
      "adobe",
      "medium",
      "figma",
      "spotify",
      "github",
      "claude",
      "canva",
    ];
    expectedKeys.forEach((key) => {
      expect(icons).toHaveProperty(key);
    });
  });

  it("has exactly 18 icon entries", () => {
    expect(Object.keys(icons)).toHaveLength(18);
  });

  it("no icon value is undefined or null", () => {
    Object.entries(icons).forEach(([key, value]) => {
      expect(value).not.toBeUndefined();
      expect(value).not.toBeNull();
    });
  });

  it("includes tab-bar icons: home, wallet, activity, setting", () => {
    expect(icons.home).toBeDefined();
    expect(icons.wallet).toBeDefined();
    expect(icons.activity).toBeDefined();
    expect(icons.setting).toBeDefined();
  });

  it("includes navigation icons: back, add, menu, plus", () => {
    expect(icons.back).toBeDefined();
    expect(icons.add).toBeDefined();
    expect(icons.menu).toBeDefined();
    expect(icons.plus).toBeDefined();
  });

  it("includes service brand icons", () => {
    expect(icons.notion).toBeDefined();
    expect(icons.dropbox).toBeDefined();
    expect(icons.openai).toBeDefined();
    expect(icons.adobe).toBeDefined();
    expect(icons.medium).toBeDefined();
    expect(icons.figma).toBeDefined();
    expect(icons.spotify).toBeDefined();
    expect(icons.github).toBeDefined();
    expect(icons.claude).toBeDefined();
    expect(icons.canva).toBeDefined();
  });

  it("does not include a netflix icon key (not in the PR)", () => {
    expect(icons).not.toHaveProperty("netflix");
  });
});

describe("IconKey type", () => {
  it("all object keys are valid IconKey values", () => {
    const keys = Object.keys(icons) as IconKey[];
    keys.forEach((key) => {
      // If the key is valid, accessing it should not throw
      expect(icons[key]).toBeDefined();
    });
  });
});