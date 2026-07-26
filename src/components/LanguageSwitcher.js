import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || i18n.language;
  const nextLanguage = currentLanguage === "pl" ? "en" : "pl";

  return (
    <button
      className="lang-btn"
      type="button"
      onClick={() => i18n.changeLanguage(nextLanguage)}
      aria-label={`Switch language to ${nextLanguage === "en" ? "English" : "Polish"}`}
    >
      {nextLanguage.toUpperCase()}
    </button>
  );
}
