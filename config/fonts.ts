import { Varela_Round, IBM_Plex_Mono } from "next/font/google";

export const fontmono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["200", "500", "700"],
  variable: "--font-mono",
});

export const fontsans = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
