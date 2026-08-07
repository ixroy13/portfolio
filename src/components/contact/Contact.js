import React from "react";
import "./contact.css";
import ContactInfo from "../ContactInfo";
import { useTranslation } from "react-i18next";

export default function Contact({ isOpen }) {
  const { t } = useTranslation();
  return (
    <div className={`side-drawer ${isOpen ? "open-drawer" : ""}`}>
      <div className="drawer-content">
        <div className="describe-ys">
          <h1>👋</h1>
          {t("describeYs").split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <ContactInfo />
      </div>
    </div>
  );
}
