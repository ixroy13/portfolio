import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CareerTimelineItem({ event, index }) {
  const { t } = useTranslation();
  const itemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const categoryLabels = {
    education: t("careerCategoryEducation"),
    work: t("careerCategoryWork"),
    "self-development": t("careerCategorySelfDevelopment"),
    "career-goal": t("careerCategoryCareerGoal"),
  };

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return undefined;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
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
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={itemRef}
      className={`career-timeline-item ${isVisible ? "is-visible" : ""}`}
      style={{ "--career-event-delay": `${index * 100}ms` }}
    >
      <div className="career-timeline-node" aria-hidden="true">
        <span />
      </div>

      <div className="career-timeline-meta">
        <h2>{event.title}</h2>
        <div className="career-timeline-meta-details">
          <p>{event.period}</p>
          <span className={`career-category career-category-${event.category}`}>
            {categoryLabels[event.category]}
          </span>
        </div>
      </div>

      <div className="career-timeline-description">
        <p>{event.description}</p>
      </div>
    </li>
  );
}
