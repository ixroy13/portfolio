import React from "react";
import { useTranslation } from "react-i18next";
import CareerTimeline from "../../components/career-timeline/CareerTimeline";
import "./career.css";

export default function Career() {
  const { t } = useTranslation();

  const careerSteps = [
    {
      id: "career-goal",
      category: "career-goal",
      title: t("careerGoalTitle"),
      period: t("careerGoalPeriod"),
      description: t("careerGoalDescription"),
    },
    {
      id: "google-agile-project-management-course",
      category: "self-development",
      title: t("careerAgileTitle"),
      period: t("careerAgilePeriod"),
      description: t("careerAgileDescription"),
    },
    {
      id: "falcon-sfera-project-coordination",
      category: "self-development",
      title: t("careerFalconTitle"),
      period: t("careerFalconPeriod"),
      description: t("careerFalconDescription"),
    },
    {
      id: "akademia-przyszlosci-volunteering",
      category: "self-development",
      title: t("careerVolunteeringTitle"),
      period: t("careerVolunteeringPeriod"),
      description: t("careerVolunteeringDescription"),
    },
    {
      id: "management-engineering-studies",
      category: "education",
      title: t("careerEducationTitle"),
      period: t("careerEducationPeriod"),
      description: t("careerEducationDescription"),
    },
    {
      id: "rossmann-issp-sales-logistics",
      category: "work",
      title: t("careerRossmannTitle"),
      period: t("careerRossmannPeriod"),
      description: t("careerRossmannDescription"),
    },
    {
      id: "biedronka-delivery-receiving",
      category: "work",
      title: t("careerBiedronkaTitle"),
      period: t("careerBiedronkaPeriod"),
      description: t("careerBiedronkaDescription"),
    },
    {
      id: "family-green-area-maintenance",
      category: "work",
      title: t("careerGreenMaintenanceTitle"),
      period: t("careerGreenMaintenancePeriod"),
      description: t("careerGreenMaintenanceDescription"),
    },
    {
      id: "lesny-kurort-waiter-bartender-assistant",
      category: "work",
      title: t("careerResortTitle"),
      period: t("careerResortPeriod"),
      description: t("careerResortDescription"),
    },
  ];

  return (
    <section className="career-container">
      <CareerTimeline events={careerSteps} />
    </section>
  );
}
