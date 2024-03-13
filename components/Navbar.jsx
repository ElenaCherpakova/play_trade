// components/Navbar.js

'use client';
import Link from 'next/link';

const Navbar = () => {
  const handleSearch = (event) => {
    // Implement search functionality here
    console.log('Searching for:', event.target.value);
  };
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">
          Play Trade
        </Link>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search cards..."
          onChange={handleSearch}
        />
      </div>

      <nav className="nav">
        <ul>
          <li>
            <Link href="/cards">
              Cards
            </Link>
          </li>
          <li>
            <Link href="/about">
              About
            </Link>
          </li>
          <li>
            <Link href="/signup">
              Signup
            </Link>
          </li>
          <li>
            <Link href="/login">
              Login
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>

    </header>
  );
};

export default Navbar;
