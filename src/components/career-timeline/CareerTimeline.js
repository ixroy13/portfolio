import React from "react";
import CareerTimelineItem from "./CareerTimelineItem";
import "./career-timeline.css";

export default function CareerTimeline({ events }) {
  return (
    <ol className="career-timeline">
      {events.map((event, index) => (
        <CareerTimelineItem key={event.id} event={event} index={index} />
      ))}
    </ol>
  );
}
