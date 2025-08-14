'use client';

import { useEffect } from 'react';
import { useAuth } from './auth-context';
import { useRouter } from 'next/navigation';

interface RoleProtectionProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'buyer' | 'seller')[];
  redirectTo?: string;
}

export function RoleProtection({ 
  children, 
  allowedRoles, 
  redirectTo = '/login' 
}: RoleProtectionProps) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }

      if (userRole && !allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on role
        if (userRole === 'admin') {
          router.push('/admin/dashboard');
        } else if (userRole === 'buyer') {
          router.push('/buyer/dashboard');
        } else if (userRole === 'seller') {
          router.push('/seller/dashboard');
        } else {
          router.push('/');
        }
        return;
      }
    }
  }, [user, userRole, loading, allowedRoles, redirectTo, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#6b7280'
      }}>
        Loading...
      </div>
    );
  }

  // Show nothing while redirecting
  if (!user || (userRole && !allowedRoles.includes(userRole))) {
    return null;
  }

  return <>{children}</>;
}
