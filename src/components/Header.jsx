import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styling/header.css';

const NAV_ITEMS = [
    { path: '/about', label: 'About' },
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/myjourney', label: 'My Journey' },
];

const MOBILE_BREAKPOINT = 768;

function Header() {
    const location = useLocation();
    const headerRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    // Close the menu whenever the route changes.
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    // While the menu is open: close on Escape, on an outside tap, or as soon
    // as the viewport grows back past the mobile breakpoint.
    useEffect(() => {
        if (!menuOpen) return undefined;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };

        const handlePointerDown = (e) => {
            if (headerRef.current && !headerRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth > MOBILE_BREAKPOINT) setMenuOpen(false);
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('touchstart', handlePointerDown, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('touchstart', handlePointerDown);
            window.removeEventListener('resize', handleResize);
        };
    }, [menuOpen]);

    return (
        <header ref={headerRef} className={`header ${menuOpen ? 'header-open' : ''}`}>

            <button
                type="button"
                className={`nav-toggle ${menuOpen ? 'is-open' : ''}`}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="primary-nav"
                onClick={() => setMenuOpen((open) => !open)}
            >
                <span className="nav-toggle-bar"></span>
                <span className="nav-toggle-bar"></span>
                <span className="nav-toggle-bar"></span>
            </button>

            <nav
                id="primary-nav"
                className={`nav-links ${menuOpen ? 'nav-open' : ''}`}
            >
                {NAV_ITEMS.map((item, index) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                        style={{ '--nav-index': `${index}` }}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

        </header>
    );
}

export default Header;
