import type { Metadata } from "next";
import "./globals.css";
import { ModalProvider } from "../providers/modal-provider";
import QueryProvider from "../providers/query-provider";
import { ErrorBoundary } from "@/components/error-boundary";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ModalProvider>
          <ErrorBoundary>
            <QueryProvider>{children}</QueryProvider>
          </ErrorBoundary>
        </ModalProvider>
      </body>
    </html>
  );
}
