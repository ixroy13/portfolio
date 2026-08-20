import React, { useEffect, useRef, useState } from "react";
import "./SkillsSection.css";
import SkillBar from "../skill-progress-bar/SkillProgresBar";
import { useTranslation } from "react-i18next";

export default function SkillsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -15% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`skills ${isVisible ? "is-visible" : ""}`}
      id="skills-section"
    >
      <div className="title">
        <h1>{t("skills")}</h1>
      </div>
      <div className="skills-level">
        <SkillBar icon="file-excel" label={t("skillExcel")} skill={90} />
        <SkillBar icon="file-powerpoint" label={t("skillPowerPoint")} skill={85} />
        <SkillBar icon="file-word" label={t("skillWord")} skill={85} />
        <SkillBar icon="chart-column" label={t("skillPowerBI")} skill={5} />
        <SkillBar icon="list-check" label={t("skillJira")} skill={85} />
        <SkillBar icon="people-group" label={t("skillTeamwork")} skill={95} />
        <SkillBar icon="arrows-rotate" label={t("skillAgile")} skill={75} />
        <SkillBar icon="book-open" label={t("skillConfluence")} skill={90} />
      </div>
      <p className="bar-info">{t("skillsNote")}</p>
    </section>
  );
}
