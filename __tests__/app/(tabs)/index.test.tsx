import React from "react";
import { render } from "@testing-library/react-native";

// Mock global.css import (no-op for tests)
jest.mock("@/global.css", () => {}, { virtual: true });

// Mock expo-router Link
jest.mock("expo-router", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    Link: ({ href, children, className }: any) => (
      <Text
        testID={`link-${typeof href === "string" ? href : href?.pathname}`}
        accessibilityRole="link"
      >
        {children}
      </Text>
    ),
  };
});

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

import App from "@/app/(tabs)/index";

describe("Home screen (index.tsx)", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).not.toBeNull();
  });

  it("renders the 'Welcome to Nativewind!' text", () => {
    const { getByText } = render(<App />);
    expect(getByText("Welcome to Nativewind!")).toBeTruthy();
  });

  it("renders the 'Go To Onboarding' link", () => {
    const { getByText } = render(<App />);
    expect(getByText("Go To Onboarding")).toBeTruthy();
  });

  it("renders the 'Go To Sign In' link", () => {
    const { getByText } = render(<App />);
    expect(getByText("Go To Sign In")).toBeTruthy();
  });

  it("renders the 'Go To Sign Up' link", () => {
    const { getByText } = render(<App />);
    expect(getByText("Go To Sign Up")).toBeTruthy();
  });

  it("renders the 'Spotify Subscription' link", () => {
    const { getByText } = render(<App />);
    expect(getByText("Spotify Subscription")).toBeTruthy();
  });

  it("renders the 'Claude Max Subscription' link", () => {
    const { getByText } = render(<App />);
    expect(getByText("Claude Max Subscription")).toBeTruthy();
  });

  it("renders all 5 navigation links", () => {
    const { getAllByRole } = render(<App />);
    const links = getAllByRole("link");
    expect(links.length).toBe(5);
  });

  it("Spotify link has correct href '/subscriptions/spotify'", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("link-/subscriptions/spotify")).toBeTruthy();
  });

  it("Claude Max link uses pathname '/subscriptions/[id]'", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("link-/subscriptions/[id]")).toBeTruthy();
  });

  it("Onboarding link has href '/onboarding'", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("link-/onboarding")).toBeTruthy();
  });

  it("Sign In link has href '/sign-in'", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("link-/sign-in")).toBeTruthy();
  });

  it("Sign Up link has href '/sign-up'", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("link-/sign-up")).toBeTruthy();
  });
});