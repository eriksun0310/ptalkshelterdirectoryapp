import { Redirect } from 'expo-router';

import { useAuthStore } from '@/stores/auth.store';

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 根據認證狀態導向
  if (isAuthenticated) {
    return <Redirect href={'/(main)' as any} />;
  }

  return <Redirect href={'/(auth)/login' as any} />;
}
