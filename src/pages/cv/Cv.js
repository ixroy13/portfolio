import React from "react";
import { useTranslation } from "react-i18next";
import CvBlock from "../../components/cv-block/CvBlock";
import "./cv.css";

function CvSection({ title, children }) {
  return (
    <section className="cv-section">
      <h2>{title}</h2>
      <div className="cv-section-content">{children}</div>
    </section>
  );
}

function Cv() {
  const { t } = useTranslation();

  const projects = [
    {
      title: t("cvFalcon"),
      description: t("cvFalconRole"),
      location: t("cvLocation"),
      period: t("cvFalconPeriod"),
      bullets: [
        t("cvFalconBullet1"),
        t("cvFalconBullet2"),
        t("cvFalconBullet3"),
      ],
    },
    {
      title: t("cvWiosna"),
      description: t("cvWiosnaRole"),
      location: t("cvLocation"),
      period: t("cvWiosnaPeriod"),
      bullets: [t("cvWiosnaBullet1"), t("cvWiosnaBullet2")],
    },
  ];

  const experience = [
    {
      title: t("cvRossmann"),
      description: t("cvRossmannRole"),
      location: t("cvLocation"),
      period: t("cvRossmannPeriod"),
      bullets: [
        t("cvRossmannBullet1"),
        t("cvRossmannBullet2"),
        t("cvRossmannBullet3"),
      ],
    },
    {
      title: t("cvBiedronka"),
      description: t("cvBiedronkaRole"),
      location: t("cvBiedronkaLocation"),
      period: t("cvBiedronkaPeriod"),
      bullets: [t("cvBiedronkaBullet1")],
    },
    {
      title: t("cvResort"),
      description: t("cvResortRole"),
      location: t("cvResortLocation"),
      period: t("cvResortPeriod"),
    },
  ];

  const education = [
    {
      title: t("cvUniversity"),
      description: t("cvDegree"),
      location: t("cvLocation"),
      period: t("cvGraduation"),
    },
    {
      title: t("cvHighSchool"),
      description: t("cvHighSchoolDegree"),
      location: t("cvHighSchoolLocation"),
      period: t("cvHighSchoolPeriod"),
    },
  ];

  const skills = [
    {
      title: t("cvSkillsToolsHeading"),
      items: [
        t("cvSkillsTools1"),
        t("cvSkillsTools2"),
        t("cvSkillsTools3"),
        t("cvSkillsTools4"),
        t("cvSkillsTools5"),
      ],
    },
    {
      title: t("cvSkillsCompetenciesHeading"),
      items: [
        t("cvSkillsCompetencies1"),
        t("cvSkillsCompetencies2"),
        t("cvSkillsCompetencies3"),
        t("cvSkillsCompetencies4"),
        t("cvSkillsCompetencies5"),
      ],
    },
    {
      title: t("cvSkillsLanguagesHeading"),
      items: [t("cvSkillsLanguages1"), t("cvSkillsLanguages2")],
    },
  ];

  return (
    <div className="cv-page">
      <div className="cv-rotate-prompt" role="status">
        <span className="cv-rotate-icon" aria-hidden="true">
          ↻
        </span>
        <p>{t("cvRotatePrompt")}</p>
      </div>

      <article className="cv-document">
        <header className="cv-header">
          <h1>Aleksander Pal</h1>
        </header>

        <p className="cv-summary">{t("cvSummary")}</p>

        <CvSection title={t("cvProjectsHeading")}>
          {projects.map((entry) => (
            <CvBlock key={entry.title} {...entry} />
          ))}
        </CvSection>

        <CvSection title={t("cvExperienceHeading")}>
          {experience.map((entry) => (
            <CvBlock key={entry.title} {...entry} />
          ))}
        </CvSection>

        <CvSection title={t("cvEducationHeading")}>
          {education.map((entry) => (
            <CvBlock key={entry.title} {...entry} />
          ))}
        </CvSection>

        <section className="cv-skills" aria-labelledby="cv-skills-heading">
          <h2 id="cv-skills-heading">{t("cvSkillsHeading")}</h2>
          <div className="cv-skills-grid">
            {skills.map((skillGroup) => (
              <div className="cv-skill-group" key={skillGroup.title}>
                <h3>{skillGroup.title}</h3>
                <ul>
                  {skillGroup.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

export default Cv;
