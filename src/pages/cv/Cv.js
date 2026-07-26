import React from "react";
import "./cv.css";
import CvBlock from "../../components/cv-block/CvBlock";
import { useTranslation } from "react-i18next";

function Cv() {
  const { t } = useTranslation();

  return (
    <div className="cv-container">
      <h1 className="cv">Curriculum Vitae</h1>
      <h4>Aleksander Pal</h4>
      <div className="cv-contact-info">
        <p>{t("cvLocation")}</p>
        <p>• {t("cvStudent")}</p>
      </div>
      <CvBlock
        title={t("cvUniversity")}
        description={t("cvDegree")}
        location={t("cvLocation")}
        period={t("cvGraduation")}
      />
      <CvBlock
        title={t("cvFalcon")}
        description={t("cvFalconDescription")}
        location={t("cvUniversity")}
        period={t("cvPresent")}
      />
      <CvBlock
        title="Google Agile Project Management"
        description={t("cvGoogleDescription")}
        location="Google"
        period={t("cvCompleted")}
      />
    </div>
  );
}

export default Cv;
