"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Box, Button, useTheme } from "@mui/material";
import SnackbarContent from "@mui/material/SnackbarContent";
import Stack from "@mui/material/Stack";

import { getLocalStorage, setLocalStorage } from "@/utils/storageHelper";

export default function CookieBanner() {
  const theme = useTheme();

  const [cookieConsent, setCookieConsent] = useState(null);

  useEffect(() => {
    const storedCookiesConsent = getLocalStorage("cookie_consent", null);
    setCookieConsent(storedCookiesConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    if (cookieConsent !== null) {
      const newValue = cookieConsent ? "granted" : "denied";
      window.gtag("consent", "update", {
        analytics_storage: newValue
      });

      setLocalStorage("cookie_consent", cookieConsent);

      console.log("Cookie Consent: ", cookieConsent);
    }
  }, [cookieConsent]);

  return (
    <Stack
      spacing={1}
      sx={{
        maxWidth: 600,
        position: "fixed",
        bottom: 0,
        right: 0,
        padding: theme.spacing(2)
      }}>
      {cookieConsent === null && (
        <>
          <SnackbarContent
            sx={{
              bgcolor: theme.palette.primary.main
            }}
            message={
              <>
                We use tracking cookies to understand how you use the product and help us improve.
                Please accept cookies to help us improve.{" "}
                <Link href="/privacy-policy">
                  <span>Learn more.</span>
                </Link>
              </>
            }
            action={
              <Box
                sx={{
                  display: "flex",
                  gap: theme.spacing(1)
                }}>
                <Button onClick={() => setCookieConsent(true)}>Accept cookies</Button>{" "}
                <Button onClick={() => setCookieConsent(false)}>Decline cookies</Button>
              </Box>
            }></SnackbarContent>
        </>
      )}
    </Stack>
  );
}
