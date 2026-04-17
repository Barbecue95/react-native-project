import { icons } from "@/constants/icon";
import { tabs } from "@/constants/data";

describe("tabs", () => {
  it("exports an array", () => {
    expect(Array.isArray(tabs)).toBe(true);
  });

  it("has exactly 4 tab entries", () => {
    expect(tabs).toHaveLength(4);
  });

  it("each tab has name, title, and icon properties", () => {
    tabs.forEach((tab) => {
      expect(tab).toHaveProperty("name");
      expect(tab).toHaveProperty("title");
      expect(tab).toHaveProperty("icon");
    });
  });

  it("first tab is the Home tab with name 'index'", () => {
    expect(tabs[0].name).toBe("index");
    expect(tabs[0].title).toBe("Home");
  });

  it("second tab is the Subscriptions tab", () => {
    expect(tabs[1].name).toBe("subscriptions");
    expect(tabs[1].title).toBe("Subscriptions");
  });

  it("third tab is the Insights tab", () => {
    expect(tabs[2].name).toBe("insights");
    expect(tabs[2].title).toBe("Insights");
  });

  it("fourth tab is the Settings tab", () => {
    expect(tabs[3].name).toBe("settings");
    expect(tabs[3].title).toBe("Settings");
  });

  it("Home tab uses icons.home icon", () => {
    expect(tabs[0].icon).toBe(icons.home);
  });

  it("Subscriptions tab uses icons.wallet icon", () => {
    expect(tabs[1].icon).toBe(icons.wallet);
  });

  it("Insights tab uses icons.activity icon", () => {
    expect(tabs[2].icon).toBe(icons.activity);
  });

  it("Settings tab uses icons.setting icon", () => {
    expect(tabs[3].icon).toBe(icons.setting);
  });

  it("all tab names are non-empty strings", () => {
    tabs.forEach((tab) => {
      expect(typeof tab.name).toBe("string");
      expect(tab.name.length).toBeGreaterThan(0);
    });
  });

  it("all tab titles are non-empty strings", () => {
    tabs.forEach((tab) => {
      expect(typeof tab.title).toBe("string");
      expect(tab.title.length).toBeGreaterThan(0);
    });
  });

  it("all tab names are unique", () => {
    const names = tabs.map((tab) => tab.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it("all tab titles are unique", () => {
    const titles = tabs.map((tab) => tab.title);
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  it("tab icons are all defined (not undefined or null)", () => {
    tabs.forEach((tab) => {
      expect(tab.icon).not.toBeUndefined();
      expect(tab.icon).not.toBeNull();
    });
  });
});