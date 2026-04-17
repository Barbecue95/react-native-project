import { colors, components, spacing, theme } from "@/constants/theme";

describe("colors", () => {
  it("has all expected color keys", () => {
    expect(colors).toHaveProperty("background");
    expect(colors).toHaveProperty("foreground");
    expect(colors).toHaveProperty("card");
    expect(colors).toHaveProperty("muted");
    expect(colors).toHaveProperty("mutedForeground");
    expect(colors).toHaveProperty("primary");
    expect(colors).toHaveProperty("accent");
    expect(colors).toHaveProperty("border");
    expect(colors).toHaveProperty("success");
    expect(colors).toHaveProperty("destructive");
    expect(colors).toHaveProperty("subscription");
  });

  it("returns correct hex color values", () => {
    expect(colors.background).toBe("#fff9e3");
    expect(colors.foreground).toBe("#081126");
    expect(colors.card).toBe("#fff8e7");
    expect(colors.muted).toBe("#f6eecf");
    expect(colors.primary).toBe("#081126");
    expect(colors.accent).toBe("#ea7a53");
    expect(colors.success).toBe("#16a34a");
    expect(colors.destructive).toBe("#dc2626");
    expect(colors.subscription).toBe("#8fd1bd");
  });

  it("returns correct rgba color values", () => {
    expect(colors.mutedForeground).toBe("rgba(0, 0, 0, 0.6)");
    expect(colors.border).toBe("rgba(0, 0, 0, 0.1)");
  });

  it("is a frozen (const) object - all values are strings", () => {
    Object.values(colors).forEach((value) => {
      expect(typeof value).toBe("string");
    });
  });

  it("primary and foreground share the same dark color", () => {
    expect(colors.primary).toBe(colors.foreground);
  });
});

describe("spacing", () => {
  it("has spacing value 0 equal to 0", () => {
    expect(spacing[0]).toBe(0);
  });

  it("has spacing value 1 equal to 4", () => {
    expect(spacing[1]).toBe(4);
  });

  it("has spacing value 2 equal to 8", () => {
    expect(spacing[2]).toBe(8);
  });

  it("has spacing value 4 equal to 16", () => {
    expect(spacing[4]).toBe(16);
  });

  it("has spacing value 5 equal to 20", () => {
    expect(spacing[5]).toBe(20);
  });

  it("has spacing value 8 equal to 32", () => {
    expect(spacing[8]).toBe(32);
  });

  it("has spacing value 12 equal to 48", () => {
    expect(spacing[12]).toBe(48);
  });

  it("has spacing value 18 equal to 72", () => {
    expect(spacing[18]).toBe(72);
  });

  it("has spacing value 30 equal to 120", () => {
    expect(spacing[30]).toBe(120);
  });

  it("all values are non-negative numbers", () => {
    Object.values(spacing).forEach((value) => {
      expect(typeof value).toBe("number");
      expect(value).toBeGreaterThanOrEqual(0);
    });
  });

  it("spacing values increase monotonically with keys", () => {
    const entries = Object.entries(spacing).map(([k, v]) => [Number(k), v]);
    entries.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < entries.length; i++) {
      expect(entries[i][1]).toBeGreaterThanOrEqual(entries[i - 1][1]);
    }
  });
});

describe("components.tabBar", () => {
  it("has all expected tabBar keys", () => {
    expect(components.tabBar).toHaveProperty("height");
    expect(components.tabBar).toHaveProperty("horizontalInset");
    expect(components.tabBar).toHaveProperty("radius");
    expect(components.tabBar).toHaveProperty("iconFrame");
    expect(components.tabBar).toHaveProperty("itemPaddingVertical");
  });

  it("tabBar.height uses spacing[18]", () => {
    expect(components.tabBar.height).toBe(spacing[18]);
  });

  it("tabBar.horizontalInset uses spacing[5]", () => {
    expect(components.tabBar.horizontalInset).toBe(spacing[5]);
  });

  it("tabBar.radius uses spacing[8]", () => {
    expect(components.tabBar.radius).toBe(spacing[8]);
  });

  it("tabBar.iconFrame uses spacing[12]", () => {
    expect(components.tabBar.iconFrame).toBe(spacing[12]);
  });

  it("tabBar.itemPaddingVertical uses spacing[2]", () => {
    expect(components.tabBar.itemPaddingVertical).toBe(spacing[2]);
  });

  it("all tabBar values are positive numbers", () => {
    Object.values(components.tabBar).forEach((value) => {
      expect(typeof value).toBe("number");
      expect(value).toBeGreaterThan(0);
    });
  });
});

describe("theme (aggregate export)", () => {
  it("includes colors, spacing, and components", () => {
    expect(theme.colors).toBe(colors);
    expect(theme.spacing).toBe(spacing);
    expect(theme.components).toBe(components);
  });

  it("is a single object referencing the same sub-objects", () => {
    expect(theme).toHaveProperty("colors");
    expect(theme).toHaveProperty("spacing");
    expect(theme).toHaveProperty("components");
  });
});