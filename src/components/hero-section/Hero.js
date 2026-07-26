import React from "react";
import "./hero.css";
import Tile from "../Tile";
import Contact from "../contact/Contact";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <div className="hero-wrap">
        <div className="main-text">
          <h1>{t("greeting")}</h1>
        </div>
        <div className="tiles">
          <Tile title={t("city")} value={t("cvLocation")} />
          <Tile title={t("university")} value={t("universityValue")} />
          <Tile title={t("fieldOfStudy")} value={t("fieldOfStudyValue")} />
          <Tile title={t("project")} value={t("projectValue")} />
        </div>
      </div>
      <div className="swipe-btn">
        <a className="btn-deafult scroll-arrow" href="#skills-section" aria-label={t("scrollToSkills")}>
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
      <div className="info-box">
        <Contact />
      </div>
    </section>
  );
}
