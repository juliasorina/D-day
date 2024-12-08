import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Variable.ttf'),
    Raydis: require('../assets/fonts/Raydis.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Stack screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="+not-found"/>
        <Stack.Screen name="HolidayInfoPage"/>
        <Stack.Screen name="createNewHolidayPage"/>
      </Stack>
  );
}
