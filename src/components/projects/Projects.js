import React from "react";
import "./projects.css";
import Project from "../Project";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section className="projects">
      <div className="project-baner">
        <h1>{t("projects")}</h1>
      </div>
      <div className="project-tiles">
        <Project title={t("sferaTitle")} tech={t("sferaMeta")} describe={t("sferaDescribe")} />
        <Project title={t("googleTitle")} tech={t("googleMeta")} describe={t("googleDescribe")} />
      </div>
    </section>
  );
}
