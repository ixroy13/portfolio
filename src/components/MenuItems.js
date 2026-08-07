import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function MenuList({ onNavigate }) {
  const { t } = useTranslation();
  return (
    <ul>
      <li>
        <NavLink to="/" end onClick={onNavigate}>{t('homePage')}</NavLink>
      </li>
      <li>
        <NavLink to="/kariera" onClick={onNavigate}>{t('career')}</NavLink>
      </li>
      <li>
        <NavLink to="/cv" onClick={onNavigate}>CV</NavLink>
      </li>
    </ul>
  );
}
