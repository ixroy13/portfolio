import React from "react";

export default function Project({ title, tech, describe, link }) {
  const content = (
    <div className="all-tile">
      <div className="information">
        <h1>{title}</h1>
        <p>{tech}</p>
      </div>
      <div>
        <p>{describe}</p>
      </div>
    </div>
  );

  return link ? <a href={link}>{content}</a> : <article className="project-card">{content}</article>;
}
