import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function MenuList({ onNavigate }) {
  const { t } = useTranslation();
  return (
    <ul>
      <li>
        <NavLink to="/" end onClick={onNavigate}>
          <span>{t('homePage')}</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/kariera" onClick={onNavigate}>
          <span>{t('career')}</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/cv" onClick={onNavigate}>
          <span>CV</span>
        </NavLink>
      </li>
    </ul>
  );
}
