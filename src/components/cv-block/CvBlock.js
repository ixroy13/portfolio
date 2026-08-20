import React from "react";
import "./cv-block.css";

function CvBlock({ title, description, location, period, bullets = [] }) {
  return (
    <article className="cv-entry">
      <div className="cv-entry-heading">
        <div className="cv-entry-title">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="cv-entry-meta" aria-label={`${location}, ${period}`}>
          <p>{location}</p>
          <p>{period}</p>
        </div>
      </div>

      {bullets.length > 0 && (
        <ul className="cv-entry-bullets">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default CvBlock;
