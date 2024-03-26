// components/Navbar.js
'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, InputBase } from "@mui/material";

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
      <Box className="logo">
        <Link href="/">
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
              <Link href="/cards" passHref>
                <a style={{ textDecoration: "none", color: "inherit" }}>Cards</a>
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
                  <Link href="/cards/category1" passHref>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Star Wars
                    </Typography>
                  </Link>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category2" passHref>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Hockey
                    </Typography>
                  </Link>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category3" passHref>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Soccer
                    </Typography>
                  </Link>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category4" passHref>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Baseball
                    </Typography>
                  </Link>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category5" passHref>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
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
            <Link href="/about" passHref>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: theme.palette.background.paper,
                  "&:hover": {
                    color: theme.palette.accent.main,
                    textDecoration: "underline",
                  },
                }}
              >
                About
              </span>
            </Link>
          </li>

          <li>
            <Link href="/signup" passHref>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: theme.palette.background.paper,
                  "&:hover": {
                    color: theme.palette.accent.main,
                    textDecoration: "underline",
                  },
                }}
              >
                Signup
              </span>
            </Link>
          </li>

          <li>
            <Link href="/signin" passHref>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: theme.palette.background.paper,
                  "&:hover": {
                    color: theme.palette.accent.main,
                    textDecoration: "underline",
                  },
                }}
              >
                Login
              </span>
            </Link>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <Link href="/profile" passHref>
                  <span
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: theme.palette.background.paper,
                      "&:hover": {
                        color: theme.palette.accent.main,
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Profile
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/logout" passHref>
                  <span
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: theme.palette.background.paper,
                      "&:hover": {
                        color: theme.palette.accent.main,
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Logout
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </Box>
  );
};

export default Navbar;


