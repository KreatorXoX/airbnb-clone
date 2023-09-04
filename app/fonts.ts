import { Poppins, Nunito } from "next/font/google";
export const fontLogo = Poppins({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: "700",
  preload: true,
});
export const font = Nunito({
  subsets: ["latin"],
  variable: "--font-general",
  preload: true,
});
