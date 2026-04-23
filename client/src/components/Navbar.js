import { useEffect, useRef, useState } from "react";
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
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        <ul className={`nav-list ${isOpen ? "show" : ""}`}>
          {NAV_ITEMS.map((item, index) => (
            <li key={item.to} style={{ "--nav-index": index }}>
              <NavLink to={item.to} className={navClassName} onClick={closeMenus}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className={`mobile-backdrop ${isOpen ? "show" : ""}`}
        type="button"
        aria-label="Close navigation"
        onClick={closeMenus}
      />
    </header>
  );
}

export default Navbar;
