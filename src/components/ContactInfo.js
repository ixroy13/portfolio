import React from "react";
import { useTranslation } from "react-i18next";

export default function ContactInfo() {
  const { t } = useTranslation();
  const userEmail = "palaleksander111@gmail.com";
  const userPhone = "+48732937754";

  return (
    <div className="primary-info">
      <h1>{t("contact")}</h1>
      <div className="name">
        <i className="fas fa-pen-nib" aria-hidden="true"></i>
        <p>Aleksander Pal</p>
      </div>
      <div className="email">
        <i className="fas fa-at" aria-hidden="true"></i>
        <a href={`mailto:${userEmail}`}>{userEmail}</a>
      </div>
      <div className="phone">
        <i className="fas fa-phone" aria-hidden="true"></i>
        <a href={`tel:${userPhone}`}>+48 732 937 754</a>
      </div>
      <div className="address">
        <i className="fas fa-home" aria-hidden="true"></i>
        <p>{t("cvLocation")}</p>
      </div>
    </div>
  );
}
