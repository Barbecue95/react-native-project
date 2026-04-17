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

import Subscriptions from "@/app/(tabs)/subscriptions";

describe("Subscriptions tab screen (subscriptions.tsx)", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Subscriptions />);
    expect(toJSON()).not.toBeNull();
  });

  it("renders 'Subscriptions' text content (capitalized)", () => {
    const { getByText } = render(<Subscriptions />);
    expect(getByText("Subscriptions")).toBeTruthy();
  });

  it("does NOT render lowercase 'subscriptions' text (PR renamed the component and text)", () => {
    const { queryByText } = render(<Subscriptions />);
    expect(queryByText("subscriptions")).toBeNull();
  });

  it("renders within a SafeAreaView", () => {
    const { getByTestId } = render(<Subscriptions />);
    expect(getByTestId("safe-area-view")).toBeTruthy();
  });

  it("SafeAreaView contains the Subscriptions text", () => {
    const { getByTestId, getByText } = render(<Subscriptions />);
    expect(getByTestId("safe-area-view")).toBeTruthy();
    expect(getByText("Subscriptions")).toBeTruthy();
  });

  it("renders only one text element", () => {
    const { getAllByText } = render(<Subscriptions />);
    expect(getAllByText("Subscriptions")).toHaveLength(1);
  });

  it("component is exported as a named component (Subscriptions, PascalCase)", () => {
    // The PR renamed 'subscriptions' function to 'Subscriptions' (PascalCase)
    expect(typeof Subscriptions).toBe("function");
    expect(Subscriptions.name).toBe("Subscriptions");
  });
});