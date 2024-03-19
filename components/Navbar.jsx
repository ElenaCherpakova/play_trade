// components/Navbar.js
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';


const Navbar = ({ isLoggedIn }) => {
  const theme = useTheme();
  const [showCardDropdown, setShowCardDropdown] = useState(false);

  const handleSearch = (event) => {
    console.log('Searching for:', event.target.value);
  };

  const toggleCardDropdown = () => {
    setShowCardDropdown(!showCardDropdown);
  };

  return (
    <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.palette.primary.main, padding: theme.spacing(2) }}>
      <div className="logo">
        <Link href="/">
          <Image src="/logo.png" alt="Play Trade" width={50} height={50} />
        </Link>
      </div>
      <div className="search" style={{ maxWidth: theme.spacing(48), width: '100%' }}>
        <input
          type="text"
          placeholder="Search cards..."
          onChange={handleSearch}
          style={{ width: '100%', padding: theme.spacing(1), borderRadius: theme.shape.borderRadius, backgroundColor: theme.palette.background.paper, boxSizing: 'border-box', color: theme.palette.text.primary }}
        />
      </div>

      <nav className="nav">
        <ul style={{ display: 'flex', listStyleType: 'none', gap: theme.spacing(2) }}>
          <li onMouseEnter={toggleCardDropdown} onMouseLeave={toggleCardDropdown} style={{ position: 'relative' }}>
            <span style={{ cursor: 'pointer', color: theme.palette.background.paper }}
              onMouseEnter={(e) => { e.target.style.color = theme.palette.accent.main; }}
              onMouseLeave={(e) => { e.target.style.color = theme.palette.background.paper; }}
            >Cards</span>
            {showCardDropdown && (
              <ul className="dropdown-content" style={{ position: 'absolute', left: 0, backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary, paddingRight: theme.spacing(8), listStyleType: 'none', borderRadius: theme.shape.borderRadius, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <h4 style={{ marginBottom: theme.spacing(1), width: '100%', color: theme.palette.text.primary, textAlign: 'center' }}>Categories</h4>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category1" style={{
                    textDecoration: 'none', color: theme.palette.primary.main
                  }} >Star Wars</Link>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category2" style={{
                    textDecoration: 'none', color: theme.palette.primary.main
                  }}>Hockey</Link>
                </li>
                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category3" style={{
                    textDecoration: 'none', color: theme.palette.primary.main
                  }}>
                    Soccer
                  </Link>
                </li>

                <li style={{ marginBottom: theme.spacing(1) }}>
                  <Link href="/cards/category4" style={{
                    textDecoration: 'none', color: theme.palette.primary.main
                  }}>
                    Baseball
                  </Link>
                </li>

                <li style={{ marginBottom: theme.spacing(3) }}>
                  <Link href="/cards/category5" style={{
                    textDecoration: 'none', color: theme.palette.primary.main
                  }}>
                    Basketball
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/about" style={{
              textDecoration: 'none', color: theme.palette.background.paper
            }}
              onMouseEnter={(e) => { e.target.style.color = theme.palette.accent.main; }}
              onMouseLeave={(e) => { e.target.style.color = theme.palette.background.paper; }}
            >About</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/profile" style={{ textDecoration: 'none', color: theme.palette.background.paper }}
                  onMouseEnter={(e) => { e.target.style.color = theme.palette.accent.main; }}
                  onMouseLeave={(e) => { e.target.style.color = theme.palette.background.paper; }}
                >Profile</Link>
              </li>
              <li>
                <Link href="/logout" style={{ textDecoration: 'none', color: theme.palette.background.paper }}
                  onMouseEnter={(e) => { e.target.style.color = theme.palette.accent.main; }}
                  onMouseLeave={(e) => { e.target.style.color = theme.palette.background.paper; }}
                >Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup" style={{ textDecoration: 'none', color: theme.palette.background.paper }}
                  onMouseEnter={(e) => { e.target.style.color = theme.palette.accent.main; }}
                  onMouseLeave={(e) => { e.target.style.color = theme.palette.background.paper; }}
                >Signup</Link>
              </li>
              <li>
                <Link href="/signin" style={{ textDecoration: 'none', color: theme.palette.background.paper }}
                  onMouseEnter={(e) => { e.target.style.color = theme.palette.accent.main; }}
                  onMouseLeave={(e) => { e.target.style.color = theme.palette.background.paper; }}
                >Login</Link>
              </li>
            </>
          )}
        </ul>


      </nav>
    </header>
  );
};

export default Navbar;
