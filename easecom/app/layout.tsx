import './globals.css'
import { Inter } from 'next/font/google'
import {ClerkProvider } from "@clerk/nextjs";
import {ModalProvider} from "@/providers/modal-provider";
import React from "react";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Ecom Dashboard',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
         <body className={inter.className}>
          <ModalProvider/>
          {children}
         </body>
      </html>
    </ClerkProvider>
  )
}
