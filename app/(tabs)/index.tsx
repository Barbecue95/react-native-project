import "@/global.css";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-6xl font-sans-extrabold">Home</Text>
      <Link
        href="/onboarding"
        className="mt-4 font-sans-bold rounded bg-primary text-white p-4"
      >
        Go To Onboarding
      </Link>
      <Link
        href="/sign-in"
        className="mt-4 font-sans-bold rounded bg-primary text-white p-4"
      >
        Go To Sign In
      </Link>
      <Link
        href="/sign-up"
        className="mt-4 font-sans-bold rounded bg-primary text-white p-4"
      >
        Go To Sign Up
      </Link>
      {/* <Link
        href="/subscriptions/spotify"
        className="mt-4 font-sans-bold rounded bg-primary text-white p-4"
      >
        Spotify Subscription
      </Link>
      <Link
        href={{
          pathname: "/subscriptions/[id]",
          params: { id: "claude" },
        }}
        className="mt-4 font-sans-bold rounded bg-primary text-white p-4"
      >
        Claude Max Subscription
      </Link> */}
    </SafeAreaView>
  );
}
