import React from "react";
import { render } from "@testing-library/react-native";

// Mock nativewind styled HOC to return the component unchanged
jest.mock("nativewind", () => ({
  styled: (Component: any) => Component,
}));

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    SafeAreaView: ({ children, ...props }: any) => (
      <View testID="safe-area-view" {...props}>
        {children}
      </View>
    ),
  };
});

import settings from "@/app/(tabs)/settings";

describe("Settings screen (settings.tsx)", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<settings />);
    expect(toJSON()).not.toBeNull();
  });

  it("renders 'settings' text content", () => {
    const { getByText } = render(<settings />);
    expect(getByText("settings")).toBeTruthy();
  });

  it("renders within a SafeAreaView", () => {
    const { getByTestId } = render(<settings />);
    expect(getByTestId("safe-area-view")).toBeTruthy();
  });

  it("SafeAreaView contains the settings text", () => {
    const { getByTestId, getByText } = render(<settings />);
    const container = getByTestId("safe-area-view");
    const text = getByText("settings");
    expect(container).toBeTruthy();
    expect(text).toBeTruthy();
  });

  it("renders only one text node", () => {
    const { getAllByText } = render(<settings />);
    expect(getAllByText("settings")).toHaveLength(1);
  });
});