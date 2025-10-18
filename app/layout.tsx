// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "IOT ENGINEERING",
  description: "Power & Control Systems",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <html lang="en">
      <head>
        {/* Load Google reCAPTCHA v3 script (render param) */}
        {siteKey && (
          <script
            src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
            async
            defer
          />
        )}
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
