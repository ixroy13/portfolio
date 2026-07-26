import React from "react";
import "./SkillsSection.css";
import SkillBar from "../skill-progress-bar/SkillProgresBar";
import { useTranslation } from "react-i18next";

export default function SkillsSection() {
  const { t } = useTranslation();

  return (
    <section className="skills" id="skills-section">
      <div className="title">
        <h1>{t("skills")}</h1>
      </div>
      <div className="skills-level">
        <SkillBar icon="file-excel" label={t("skillExcel")} skill={85} />
        <SkillBar icon="file-powerpoint" label={t("skillPowerPoint")} skill={85} />
        <SkillBar icon="file-word" label={t("skillWord")} skill={85} />
        <SkillBar icon="list-check" label={t("skillJira")} skill={80} />
        <SkillBar icon="people-group" label={t("skillTeamwork")} skill={80} />
        <SkillBar icon="arrows-rotate" label={t("skillAgile")} skill={75} />
      </div>
      <p className="bar-info">{t("skillsNote")}</p>
    </section>
  );
}
