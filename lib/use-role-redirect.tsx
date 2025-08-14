'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-context';

export function useRoleRedirect(skipRedirect = false) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && userRole && !skipRedirect) {
      if (userRole === 'admin') {
        router.push('/admin/dashboard');
      } else if (userRole === 'buyer') {
        router.push('/buyer/dashboard');
      } else if (userRole === 'seller') {
        router.push('/seller/dashboard');
      }
    }
  }, [user, userRole, loading, router, skipRedirect]);

  return { user, userRole, loading };
}
