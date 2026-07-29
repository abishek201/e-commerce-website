import type { Metadata } from "next";
import { CartProvider } from "@/app/context/CartContext";
import "./globals.css";




export const metadata: Metadata = {
  title: "e-commerce app",
  description: "welcome to my website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return   (
    <html lang="en" >
      <body>
        <CartProvider>
           {children}
        </CartProvider>
       </body>
       
     
    </html>
  )
   
}
