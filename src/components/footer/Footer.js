import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./footer.css";

export default function Footer() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const footerMessage = pathname === "/" ? t("footerHome") : t("footerCodex");

  return (
    <footer>
      <div className="nav-links">
        <p>{footerMessage}</p>
      </div>
      <div className="socials">
        <div className="in">
          <a href="https://www.linkedin.com/in/aleksanderpal" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <div className="gh">
          <a href="https://github.com/ixroy13" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
      <div className="contact">
        <p>© {new Date().getFullYear()} Aleksander Pal</p>
      </div>
    </footer>
  );
}
