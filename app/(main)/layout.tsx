import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react'

const MainLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <AuthProvider>
      <Header />
      <main className="flex-1 bg-neutral-100 flex flex-col w-full">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  )
}

export default MainLayout