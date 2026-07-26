import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function MenuList() {
  const { t } = useTranslation();
  return (
    <ul>
      <li>
        <Link to="/">{t('homePage')}</Link>
      </li>
      <li>
        <Link to="/cv">CV</Link>
      </li>
    </ul>
  );
}
