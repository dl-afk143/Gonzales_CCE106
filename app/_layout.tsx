import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { Stack, router, useSegments } from "expo-router";
import { useContext, useEffect } from "react";

function NavigationGuard() {
  const auth = useContext(AuthContext);
  const segments = useSegments();

  useEffect(() => {
    if (!auth || auth.authLoading) {
      return;
    }

    const inSignIn = segments[0] === "sign-in";
    const inApp = segments[0] === "(app)" || segments[0] === "student";

    if (!auth.token && inApp) {
      router.replace("/sign-in");
    }

    if (auth.token && inSignIn) {
      router.replace("/(app)");
    }
  }, [auth, segments]);

  return null;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <NavigationGuard />

      <Stack screenOptions={{ headerTintColor: "#17324d" }}>
        <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen
          name="student/[id]"
          options={{ title: "Student Details" }}
        />
      </Stack>
    </AuthProvider>
  );
}
