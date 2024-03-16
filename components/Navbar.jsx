// components/Navbar.js

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = ({ isLoggedIn }) => {
  const [showCardDropdown, setShowCardDropdown] = useState(false);

  const handleSearch = (event) => {
    console.log('Searching for:', event.target.value);
  };

  const toggleCardDropdown = () => {
    setShowCardDropdown(!showCardDropdown);
  };

  return (
    <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#14213D', padding: '8px 16px' }}>
      <div className="logo">
        <Link href="/">
          <Image src="/logo.png" alt="Play Trade" width={50} height={50} />
        </Link>
      </div>

      <div className="search" style={{ maxWidth: '480px', width: '100%' }}>
        <input
          type="text"
          placeholder="Search cards..."
          onChange={handleSearch}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}
        />
      </div>

      <nav className="nav">
        <ul style={{ display: 'flex', listStyleType: 'none', gap: '16px' }}>
          <li onMouseEnter={toggleCardDropdown} onMouseLeave={toggleCardDropdown}>
            <span style={{ cursor: 'pointer' }}>Cards</span>
            {showCardDropdown && (
              <ul className="dropdown-content" style={{ position: 'absolute', backgroundColor: '#FFFFFF', color: '#000000', padding: '16px', listStyleType: 'none' }}>
                <h4 style={{ marginBottom: '8px' }}>Card categories</h4>
                <li style={{ marginBottom: '8px' }}>
                  <Link href="/cards/category1">Star Wars</Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link href="/cards/category2">Hockey</Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link href="/cards/category3">Soccer</Link>
                </li>
                {/* Add more categories as needed */}
              </ul>
            )}
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
