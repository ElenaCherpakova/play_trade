// components/Navbar.js
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, InputBase } from '@mui/material';

const Navbar = ({ isLoggedIn }) => {
  const theme = useTheme();
  const [showCardDropdown, setShowCardDropdown] = React.useState(false);

  const handleSearch = (event) => {
    console.log('Searching for:', event.target.value);
  };

  const toggleCardDropdown = () => {
    setShowCardDropdown(!showCardDropdown);
  };

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(2),
      }}
    >
      <Box className="logo">
        <Link href="/">
          <Image src="/logo.png" alt="Play Trade" width={50} height={50} />
        </Link>
      </Box>
      <Box className="search" sx={{ maxWidth: theme.spacing(48), width: '100%' }}>
        <InputBase
          type="text"
          placeholder="Search cards..."
          onChange={handleSearch}
          sx={{
            width: '100%',
            padding: theme.spacing(1),
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        />
      </Box>

      <nav className="nav">
        <ul style={{ display: 'flex', listStyleType: 'none', gap: theme.spacing(2) }}>
          <li
            onMouseEnter={toggleCardDropdown}
            onMouseLeave={toggleCardDropdown}
            style={{ position: 'relative' }}
          >
            <Typography
              variant="body1"
              sx={{
                cursor: 'pointer',
                color: theme.palette.background.paper,
                '&:hover': {
                  color: theme.palette.accent.main,
                },
              }}
            >
              Cards
            </Typography>
            {showCardDropdown && (
              <ul
                className="dropdown-content"
                style={{
                  position: 'absolute',
                  left: 0,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  paddingRight: theme.spacing(8),
                  listStyleType: 'none',
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: theme.spacing(1), textAlign: 'center' }}>
                  Categories
                </Typography>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Typography
                    variant="body1"
                    component="a"
                    href="/cards/category1"
                    sx={{ textDecoration: 'none', color: theme.palette.primary.main }}
                  >
                    Star Wars
                  </Typography>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Typography
                    variant="body1"
                    component="a"
                    href="/cards/category2"
                    sx={{ textDecoration: 'none', color: theme.palette.primary.main }}
                  >
                    Hockey
                  </Typography>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Typography
                    variant="body1"
                    component="a"
                    href="/cards/category3"
                    sx={{ textDecoration: 'none', color: theme.palette.primary.main }}
                  >
                    Soccer
                  </Typography>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Typography
                    variant="body1"
                    component="a"
                    href="/cards/category4"
                    sx={{ textDecoration: 'none', color: theme.palette.primary.main }}
                  >
                    Baseball
                  </Typography>
                </li>

                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Typography
                    variant="body1"
                    component="a"
                    href="/cards/category4"
                    sx={{ textDecoration: 'none', color: theme.palette.primary.main }}
                  >
                    Basketball
                  </Typography>
                </li>
                {/* End of categories */}
              </ul>
            )}
          </li>

          <li>
            <Typography
              variant="body1"
              component="a"
              href="/about"
              textDecoration="none"
              sx={{
                cursor: 'pointer',
                textDecoration: 'none',
                color: theme.palette.background.paper,
                '&:hover': {
                  color: theme.palette.accent.main,
                  textDecoration: 'none'
                },
              }}
            >
              About
            </Typography>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link href="/profile" style={{ textDecoration: 'none', color: theme.palette.background.paper }}>
                  <Typography
                    variant="body1"
                    component="a"
                    sx={{
                      cursor: 'pointer',
                      color: theme.palette.background.paper,
                      '&:hover': {
                        color: theme.palette.accent.main,
                      },
                    }}
                  >
                    Profile
                  </Typography>
                </Link>
              </li>
              <li>
                <Link href="/logout" style={{ textDecoration: 'none', color: theme.palette.background.paper }}>
                  <Typography
                    variant="body1"
                    component="a"
                    sx={{
                      cursor: 'pointer',
                      color: theme.palette.background.paper,
                      '&:hover': {
                        color: theme.palette.accent.main,
                      },
                    }}
                  >
                    Logout
                  </Typography>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup" style={{ textDecoration: 'none', color: theme.palette.background.paper }}>
                  <Typography
                    variant="body1"
                    component="a"
                    sx={{
                      cursor: 'pointer',
                      color: theme.palette.background.paper,
                      '&:hover': {
                        color: theme.palette.accent.main,
                      },
                    }}
                  >
                    Signup
                  </Typography>
                </Link>
              </li>
              <li>
                <Link href="/signin" style={{ textDecoration: 'none', color: theme.palette.background.paper }}>
                  <Typography
                    variant="body1"
                    component="a"
                    sx={{
                      cursor: 'pointer',
                      color: theme.palette.background.paper,
                      '&:hover': {
                        color: theme.palette.accent.main,
                      },
                    }}
                  >
                    Login
                  </Typography>
                </Link>
              </li>
            </>
          )}
          {/* End of nav items */}
        </ul>
      </nav>
    </Box>
  );
};

export default Navbar;
