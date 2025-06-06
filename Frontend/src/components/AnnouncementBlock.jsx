import React from "react";
import { HiSpeakerphone } from "react-icons/hi";

const AnnouncementBlock = ({ title, message, ctaText, ctaLink }) => {
  // If ctaLink is provided, wrap the entire block in an <a>. Otherwise, render as a plain <div>.
  const Container = ctaLink ? "a" : "div";
  const containerProps = ctaLink
    ? {
        href: ctaLink,
        target: "_blank",
        // if you want external links to open in a new tab, uncomment this:
        // rel: "noopener noreferrer"
      }
    : {};

  return (
    <Container
      {...containerProps}
      className="w-[80%]  mx-auto block bg-blue-200 border-l-4 border-blue-400 p-4 mb-4 rounded-md hover:bg-blue-100 transition"
    >
      <div className="flex items-start">
        <HiSpeakerphone className="w-6 h-6 text-blue-400 flex-shrink-0" />
        <div className="ml-3 w-full">
          <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
          <p className="mt-1 text-sm text-blue-700">{message}</p>
          {ctaText && ctaLink && (
            <span className="inline-block mt-3 text-sm font-medium text-blue-600 hover:underline">
              {ctaText}
            </span>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AnnouncementBlock;
