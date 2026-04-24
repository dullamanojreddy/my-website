import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/certifications", label: "Certifications" },
  { to: "/contact", label: "Contact" }
];

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const forceClose = () => setIsOpen(false);

    window.addEventListener("hashchange", forceClose);
    window.addEventListener("pageshow", forceClose);
    window.addEventListener("resize", forceClose);

    return () => {
      window.removeEventListener("hashchange", forceClose);
      window.removeEventListener("pageshow", forceClose);
      window.removeEventListener("resize", forceClose);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;
      const isFarEnough = currentY > 90;

      if (scrollingDown && isFarEnough && !isOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const closeMenus = () => {
    setIsOpen(false);
  };

  const navClassName = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const mobileMenu = isOpen
    ? createPortal(
        <>
          <button
            className="mobile-backdrop show"
            type="button"
            aria-label="Close navigation"
            onClick={closeMenus}
          />
          <div className="mobile-nav-panel show" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <ul className="nav-list nav-list-mobile">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={navClassName} onClick={closeMenus}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <header className={`site-header ${isHidden ? "hidden" : ""}`}>
      <nav className="nav-wrap">
        <NavLink to="/" className="brand" onClick={closeMenus}>
          <span className="brand-dot" />
          Dulla Manoj Reddy
        </NavLink>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>
      {mobileMenu}
    </header>
  );
}

export default Navbar;
