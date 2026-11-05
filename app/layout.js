import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Navbar, Footer } from "@/components/Bits";
export const metadata = { title: "BookNook", description: "A small online library" };
export default function RootLayout({ children }) {
  return (<html lang="en" data-theme="light" suppressHydrationWarning><body className="min-h-screen flex flex-col">
    <Navbar /><main className="flex-1">{children}</main><Footer /><Toaster position="top-center" /></body></html>);
}
