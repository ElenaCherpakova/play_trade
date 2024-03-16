import Link from 'next/link';

const SubNavbar = () => {
    return (
        <nav className="sub-nav">
            <ul style={{ display: 'flex', listStyleType: 'none', gap: '16px' }}>
                <li>
                    <Link href="/marketplace">
                        Marketplace
                    </Link>
                </li>
                <li>
                    <Link href="/welcome">
                        Welcome Hero
                    </Link>
                </li>
                <li className="dropdown">
                    <span>Card Categories</span>
                    <ul className="dropdown-content">
                        <li>
                            <Link href="/categories/category1">
                                Category 1
                            </Link>
                        </li>
                        <li>
                            <Link href="/categories/category2">
                                Category 2
                            </Link>
                        </li>
                        {/* Add more categories as needed */}
                    </ul>
                </li>
                {/* Add more subheader links as needed */}
            </ul>
        </nav>
    );
};

export default SubNavbar;
