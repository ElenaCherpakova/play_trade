// components/Navbar.js
'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, InputBase } from "@mui/material";
import AuthControl from "./AuthControl"; // Importing AuthControl component

const Navbar = ({ isLoggedIn }) => {
  const theme = useTheme();
  const [showCardDropdown, setShowCardDropdown] = useState(false);

  const handleSearch = (event) => {
    console.log("Searching for:", event.target.value);
  };

  const toggleCardDropdown = () => {
    setShowCardDropdown(!showCardDropdown);
  };

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(2),
      }}
    >
      <Box className="logo" sx={{ cursor: "pointer" }}>
        <Link href="/" legacyBehavior>
          <Image src="/logo.png" alt="Play Trade" width={50} height={50} />
        </Link>
      </Box>
      <Box className="search" sx={{ maxWidth: theme.spacing(48), width: "100%" }}>
        <InputBase
          type="text"
          placeholder="Search cards..."
          onChange={handleSearch}
          sx={{
            width: "100%",
            padding: theme.spacing(1),
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        />
      </Box>

      <nav className="nav">
        <ul style={{ display: "flex", listStyleType: "none", gap: theme.spacing(2) }}>
          <li
            onMouseEnter={toggleCardDropdown}
            onMouseLeave={toggleCardDropdown}
            style={{ position: "relative" }}
          >
            <span
              style={{
                cursor: "pointer",
                color: theme.palette.background.paper,
                "&:hover": {
                  color: theme.palette.accent.main,
                  textDecoration: "none",
                },
              }}
            >
              <Link
                href="/cards"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}>
                Cards
              </Link>
            </span>
            {showCardDropdown && (
              <ul
                className="dropdown-content"
                style={{
                  position: "absolute",
                  left: 0,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  paddingRight: theme.spacing(8),
                  listStyleType: "none",
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: theme.spacing(1), textAlign: "center" }}>
                  Categories
                </Typography>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category1" passHref legacyBehavior>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          color: theme.palette.accent.main,
                        },
                      }}
                    >
                      Star Wars
                    </Typography>
                  </Link>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category2" passHref legacyBehavior>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          color: theme.palette.accent.main,
                        },
                      }}
                    >
                      Hockey
                    </Typography>
                  </Link>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category3" passHref legacyBehavior>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          color: theme.palette.accent.main,
                        },
                      }}
                    >
                      Soccer
                    </Typography>
                  </Link>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category4" passHref legacyBehavior>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          color: theme.palette.accent.main,
                        },
                      }}
                    >
                      Baseball
                    </Typography>
                  </Link>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category5" passHref legacyBehavior>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          color: theme.palette.accent.main,
                        },
                      }}
                    >
                      Basketball
                    </Typography>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/about" passHref legacyBehavior>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: theme.palette.background.paper,
                  "&:hover": {
                    color: theme.palette.accent.main,
                  },
                }}
              >
                About
              </span>
            </Link>
          </li>

          <li>
            <Link href="/signup" passHref legacyBehavior>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: theme.palette.background.paper,
                  "&:hover": {
                    color: theme.palette.accent.main,
                  },
                }}
              >
                Signup
              </span>
            </Link>
          </li>

          {/* AuthControl component for authentication controls */}
          <AuthControl isLoggedIn={isLoggedIn} />
        </ul>
      </nav>
    </Box>
  );
};

export default Navbar;
