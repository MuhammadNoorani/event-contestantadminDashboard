'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Event Contest Platform
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/contestant" className={pathname === '/contestant' ? 'underline' : ''}>
                  Contestant Dashboard
                </Link>
              </Button>
              {user.role === 'admin' && (
                <Button variant="ghost" asChild>
                  <Link href="/admin" className={pathname === '/admin' ? 'underline' : ''}>
                    Admin Dashboard
                  </Link>
                </Button>
              )}
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login" className={pathname === '/login' ? 'underline' : ''}>
                  Login
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/signup" className={pathname === '/signup' ? 'underline' : ''}>
                  Sign Up
                </Link>
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;