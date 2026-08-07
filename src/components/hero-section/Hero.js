import React from "react";
import "./hero.css";
import Tile from "../Tile";
import Contact from "../contact/Contact";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  const scrollToSkills = (event) => {
    event.preventDefault();

    const skillsSection = document.getElementById("skills-section");
    if (!skillsSection) return;

    const startPosition = window.scrollY;
    const navHeight = document.querySelector(".main-nav")?.getBoundingClientRect().height || 0;
    const targetPosition = startPosition + skillsSection.getBoundingClientRect().top - navHeight;
    const distance = targetPosition - startPosition;
    const duration = Math.min(900, Math.max(450, Math.abs(distance) * 0.7));
    let animationStart;

    const animateScroll = (timestamp) => {
      if (animationStart === undefined) animationStart = timestamp;

      const progress = Math.min((timestamp - animationStart) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) window.requestAnimationFrame(animateScroll);
    };

    window.requestAnimationFrame(animateScroll);
  };

  return (
    <section className="hero-section">
      <div className="hero-wrap">
        <div className="main-text">
          <h1>{t("greeting")}</h1>
        </div>
        <div className="tiles">
          <Tile shape="square" title={t("city")} value={t("cvLocation")} />
          <Tile shape="top-right-round" title={t("university")} value={t("universityValue")} />
          <Tile shape="bottom-left-round" title={t("fieldOfStudy")} value={t("fieldOfStudyValue")} />
          <Tile shape="square" title={t("project")} value={t("projectValue")} />
        </div>
      </div>
      <div className="swipe-btn">
        <a
          className="btn-deafult scroll-arrow"
          href="#skills-section"
          onClick={scrollToSkills}
          aria-label={t("scrollToSkills")}
        >
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
      <div className="info-box">
        <Contact />
      </div>
    </section>
  );
}
