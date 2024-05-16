import "./globals.css";

import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";

import { CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import Navbar from "../components/Navbar";

import Footer from "@/components/Footer";
import { theme } from "@/styles/theme";
import SessionProvider from "@/utils/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <AppRouterCacheProvider>
            <CssBaseline />
            <ThemeProvider theme={theme}>
              <Navbar />
              <main>
                <Box
                  display="flex"
                  flexDirection="column"
                  flexGrow={1}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: "1"
                  }}>
                  {children}
                </Box>
              </main>
              <Footer />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
