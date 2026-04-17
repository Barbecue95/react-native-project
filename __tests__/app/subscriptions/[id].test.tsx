import React from "react";
import { render } from "@testing-library/react-native";

// Control what useLocalSearchParams returns
const mockUseLocalSearchParams = jest.fn(() => ({ id: "spotify" }));

jest.mock("expo-router", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    Link: ({ href, children }: any) => (
      <Text testID={`link-${href}`} accessibilityRole="link">
        {children}
      </Text>
    ),
    useLocalSearchParams: () => mockUseLocalSearchParams(),
  };
});

import SubscriptionsDetails from "@/app/subscriptions/[id]";

describe("SubscriptionsDetails screen (app/subscriptions/[id].tsx)", () => {
  beforeEach(() => {
    mockUseLocalSearchParams.mockReturnValue({ id: "spotify" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { toJSON } = render(<SubscriptionsDetails />);
    expect(toJSON()).not.toBeNull();
  });

  it("renders 'subscriptions' static text", () => {
    const { getByText } = render(<SubscriptionsDetails />);
    expect(getByText("subscriptions")).toBeTruthy();
  });

  it("renders 'Go Back' link to navigate to root '/'", () => {
    const { getByText } = render(<SubscriptionsDetails />);
    expect(getByText("Go Back")).toBeTruthy();
  });

  it("Go Back link has href '/'", () => {
    const { getByTestId } = render(<SubscriptionsDetails />);
    expect(getByTestId("link-/")).toBeTruthy();
  });

  it("calls useLocalSearchParams to read the id param", () => {
    render(<SubscriptionsDetails />);
    expect(mockUseLocalSearchParams).toHaveBeenCalled();
  });

  it("renders correctly with id='spotify'", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "spotify" });
    const { getByText } = render(<SubscriptionsDetails />);
    expect(getByText("subscriptions")).toBeTruthy();
  });

  it("renders correctly with id='claude'", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "claude" });
    const { getByText } = render(<SubscriptionsDetails />);
    expect(getByText("subscriptions")).toBeTruthy();
  });

  it("renders correctly with an arbitrary id", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "some-new-service" });
    const { getByText } = render(<SubscriptionsDetails />);
    expect(getByText("subscriptions")).toBeTruthy();
  });

  it("renders correctly when id is undefined", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: undefined });
    const { getByText } = render(<SubscriptionsDetails />);
    // Component still renders - id is read but not displayed in current implementation
    expect(getByText("subscriptions")).toBeTruthy();
  });

  it("has a 'Go Back' link with accessible role", () => {
    const { getAllByRole } = render(<SubscriptionsDetails />);
    const links = getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it("renders only the single 'subscriptions' text (not multiple)", () => {
    const { getAllByText } = render(<SubscriptionsDetails />);
    expect(getAllByText("subscriptions")).toHaveLength(1);
  });
});