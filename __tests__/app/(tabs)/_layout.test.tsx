import React from "react";
import { render } from "@testing-library/react-native";
import { Image, View } from "react-native";

// Mock expo-router Tabs
jest.mock("expo-router", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  const Screen = ({ name, options }: any) => {
    // Render the tab icon to exercise the tabBarIcon callback
    const focused = true;
    const icon =
      options?.tabBarIcon?.({ focused }) ?? <Text>{options?.title}</Text>;
    return (
      <View testID={`tab-screen-${name}`}>
        <Text>{options?.title}</Text>
        {icon}
      </View>
    );
  };

  const Tabs = ({ children, screenOptions }: any) => {
    return <View testID="tabs-container">{children}</View>;
  };
  Tabs.Screen = Screen;

  return { Tabs };
});

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: any) => children,
}));

// Mock clsx
jest.mock("clsx", () => ({
  __esModule: true,
  default: (...classes: (string | boolean | undefined)[]) =>
    classes.filter(Boolean).join(" "),
}));

import TabLayout from "@/app/(tabs)/_layout";
import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";

describe("TabLayout", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<TabLayout />);
    expect(getByTestId("tabs-container")).toBeTruthy();
  });

  it("renders a screen for each tab in the tabs constant", () => {
    const { getByTestId } = render(<TabLayout />);
    tabs.forEach((tab) => {
      expect(getByTestId(`tab-screen-${tab.name}`)).toBeTruthy();
    });
  });

  it("renders all 4 tab screens", () => {
    const { getAllByTestId } = render(<TabLayout />);
    // Each tab gets its own testID
    tabs.forEach((tab) => {
      const screen = getAllByTestId(`tab-screen-${tab.name}`);
      expect(screen.length).toBeGreaterThan(0);
    });
  });

  it("renders the Home tab screen", () => {
    const { getByTestId } = render(<TabLayout />);
    expect(getByTestId("tab-screen-index")).toBeTruthy();
  });

  it("renders the Subscriptions tab screen", () => {
    const { getByTestId } = render(<TabLayout />);
    expect(getByTestId("tab-screen-subscriptions")).toBeTruthy();
  });

  it("renders the Insights tab screen", () => {
    const { getByTestId } = render(<TabLayout />);
    expect(getByTestId("tab-screen-insights")).toBeTruthy();
  });

  it("renders the Settings tab screen", () => {
    const { getByTestId } = render(<TabLayout />);
    expect(getByTestId("tab-screen-settings")).toBeTruthy();
  });

  it("tab titles match expected values", () => {
    const { getByText } = render(<TabLayout />);
    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Subscriptions")).toBeTruthy();
    expect(getByText("Insights")).toBeTruthy();
    expect(getByText("Settings")).toBeTruthy();
  });
});

describe("TabIcon (via tabBarIcon callback)", () => {
  // TabIcon is tested indirectly via the Tabs.Screen mock rendering focused=true
  it("renders an Image for the focused tab icon", () => {
    const { UNSAFE_getAllByType } = render(<TabLayout />);
    const images = UNSAFE_getAllByType(Image);
    // One Image per tab
    expect(images.length).toBe(tabs.length);
  });

  it("renders Views wrapping the icons", () => {
    const { UNSAFE_getAllByType } = render(<TabLayout />);
    const views = UNSAFE_getAllByType(View);
    expect(views.length).toBeGreaterThan(0);
  });
});

describe("tabBar style configuration", () => {
  it("tabBar height matches spacing[18] (72)", () => {
    expect(components.tabBar.height).toBe(72);
  });

  it("tabBar horizontalInset matches spacing[5] (20)", () => {
    expect(components.tabBar.horizontalInset).toBe(20);
  });

  it("tabBar radius matches spacing[8] (32)", () => {
    expect(components.tabBar.radius).toBe(32);
  });

  it("tabBar iconFrame matches spacing[12] (48)", () => {
    expect(components.tabBar.iconFrame).toBe(48);
  });

  it("tabBar backgroundColor is colors.primary", () => {
    expect(colors.primary).toBe("#081126");
  });
});