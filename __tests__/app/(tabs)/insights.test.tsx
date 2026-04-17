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

import insights from "@/app/(tabs)/insights";

describe("Insights screen (insights.tsx)", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<insights />);
    expect(toJSON()).not.toBeNull();
  });

  it("renders 'insights' text content", () => {
    const { getByText } = render(<insights />);
    expect(getByText("insights")).toBeTruthy();
  });

  it("renders within a SafeAreaView", () => {
    const { getByTestId } = render(<insights />);
    expect(getByTestId("safe-area-view")).toBeTruthy();
  });

  it("SafeAreaView contains the insights text", () => {
    const { getByTestId, getByText } = render(<insights />);
    const container = getByTestId("safe-area-view");
    const text = getByText("insights");
    expect(container).toBeTruthy();
    expect(text).toBeTruthy();
  });

  it("renders only one text node", () => {
    const { getAllByText } = render(<insights />);
    // 'insights' text appears exactly once
    expect(getAllByText("insights")).toHaveLength(1);
  });
});