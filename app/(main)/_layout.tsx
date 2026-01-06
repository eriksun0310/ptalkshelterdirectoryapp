import { Redirect, Stack } from 'expo-router';

import { AppColors } from '@/constants/theme';
import { useAuthStore } from '@/stores/auth.store';

export default function MainLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 未登入則導向登入頁面
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: AppColors.background,
        },
        headerTintColor: AppColors.primary,
        headerTitleStyle: {
          color: AppColors.textPrimary,
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="shelter/[id]"
        options={{
          title: '詳細資訊',
          headerBackTitle: '返回',
        }}
      />
    </Stack>
  );
}
