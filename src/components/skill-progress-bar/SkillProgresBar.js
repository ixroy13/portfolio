import React from "react";
import "./SkillProgressBar.css"
import { useTranslation } from "react-i18next";

export default function SkillBar(props) {
    const { t } = useTranslation();
    const style = { "--skill-level": `${props.skill}%` };

    return (
        <div className="skill-box">
            <div className="skill-image">
                <i className={`fa-solid fa-${props.icon}`} aria-hidden="true"></i>
            </div>
            <div className="skill-progress">
                <div className="bar-box">
                    <span style={style} className="bar"></span>
                </div>
                <div className="label">
                    <p>{props.label}</p>
                    <p>{t("secondSkillLabel")}</p>
                </div>
            </div>
        </div>
    )
}
