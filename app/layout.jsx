import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth/next";
import SessionProvider from "@/utils/SessionProvider";
import Navbar from "../components/Navbar";
import { CssBaseline, Box } from "@mui/material";

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
                  sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
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