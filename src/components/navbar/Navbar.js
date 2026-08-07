import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./nav.css";
import MenuList from "../MenuItems";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Contact from "../contact/Contact";

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [theme, setTheme] = useState("dark");
  const [isOpened, setIsOpened] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  function changeMenuState() {
    setIsInfoOpen(false);
    setIsOpened((prevValue) => !prevValue);
  }

  function closeMenu() {
    setIsOpened(false);
    setIsInfoOpen(false);
  }

  const darkModeSwitch = () => {
    document.body.classList.toggle("light-mode");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const openInfoBox = () => {
    setIsInfoOpen((prev) => !prev);
  };

  useEffect(() => {
    const shouldLockScroll = isOpened || isInfoOpen;
    document.body.classList.toggle("fixed-position", shouldLockScroll);
    document.documentElement.classList.toggle("fixed-position", shouldLockScroll);

    return () => {
      document.body.classList.remove("fixed-position");
      document.documentElement.classList.remove("fixed-position");
    };
  }, [isOpened, isInfoOpen]);

  useEffect(() => {
    setIsOpened(false);
    setIsInfoOpen(false);
  }, [location.pathname]);

  let themeModeIcon =
    theme === "light" ? (
      <i className="far fa-moon"></i>
    ) : (
      <i className="far fa-sun"></i>
    );

  return (
    <>
      <nav className={`main-nav ${isInfoOpen ? "info-open" : ""}`}>
        <div className="logo-btn">
          <Link to="/" onClick={closeMenu}>
            <h1>Ixroy</h1>
          </Link>
        </div>

        <div
          className="menu-list"
          data-visible={isOpened ? "visible" : "hidden"}
        >
          <MenuList onNavigate={closeMenu} />
        </div>

        <div className="nav-btns">
          <LanguageSwitcher />
          <button
            className="btn-deafult theme-switch primary-btn"
            onClick={darkModeSwitch}
            title={theme === "dark" ? t("lightMode") : t("darkMode")}
          >
            {themeModeIcon}
            <span className="sr-only">{t("themeSwitch")}</span>
          </button>

          <button
            onClick={openInfoBox}
            title={t("personalInfo")}
            className="btn-deafult primary-btn info-btn"
            aria-expanded={isInfoOpen}
          >
            <i className="far fa-user"></i>
            <span className="sr-only">{t("personalInfo")}</span>
          </button>

          <button
            onClick={changeMenuState}
            className="button btn-deafult menu-toggle"
            aria-expanded={isOpened}
          >
            <svg
              fill="var(--button-color)"
              className="hamburger"
              viewBox="0 0 100 100"
              width="30"
            >
              <rect
                className="line top"
                width="80"
                height="10"
                x="10"
                y="25"
                rx="5"
              ></rect>
              <rect
                className="line middle"
                width="80"
                height="10"
                x="10"
                y="45"
                rx="5"
              ></rect>
              <rect
                className="line bottom"
                width="80"
                height="10"
                x="10"
                y="65"
                rx="5"
              ></rect>
            </svg>
            <span className="sr-only">{t("menuToggle")}</span>
          </button>
        </div>
      </nav>

      <Contact isOpen={isInfoOpen} />
    </>
  );
}
