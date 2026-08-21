import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "QuiPraia: Qual praia hoje?",
  description: "Previsão de surf, maré, vento e relatos locais das praias de Salvador.",
  icons: { icon: "/brand/final/quipraia-3c-symbol.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${sora.variable}`}>{children}</body>
    </html>
  );
}
