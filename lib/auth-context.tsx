'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

interface AuthContextType {
  user: User | null;
  userRole: 'admin' | 'buyer' | 'seller' | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string, role?: 'admin' | 'buyer' | 'seller') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'buyer' | 'seller' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role || 'buyer'); // Default to buyer if no role
          } else {
            setUserRole('buyer'); // Default role
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole('buyer'); // Default role on error
        }
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, name?: string, role: 'admin' | 'buyer' | 'seller' = 'buyer') => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    if (result.user) {
      // Update profile with name
      if (name) {
        await updateProfile(result.user, {
          displayName: name,
        });
      }
      
      // Store user data in Firestore including role
      await setDoc(doc(db, 'users', result.user.uid), {
        name: name || '',
        email: email,
        role: role,
        createdAt: new Date().toISOString(),
      });
      
      // Sign out immediately after registration
      // User should login manually to access their account
      await firebaseSignOut(auth);
      setUserRole(null);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUserRole(null);
  };

  const value = {
    user,
    userRole,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
