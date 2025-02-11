import { useEffect } from "react";

export const formatTimestamp = (timestamp: string): string => {
  if (!timestamp) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(new Date(timestamp));
};

export const scrollToTop = () => {
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    mainContent.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
};

export const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  onClickOutside: () => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

export interface SlideFunctions {
  slideUp: (target: HTMLElement, duration?: number) => void;
  slideDown: (target: HTMLElement, duration?: number) => void;
}

export const useSlide = (): SlideFunctions => {
  const slideUp = (target: HTMLElement, duration = 300): void => {
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.boxSizing = "border-box";
    target.style.height = target.offsetHeight + "px";
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    target.style.border = "none";

    window.setTimeout(() => {
      target.style.display = "none";
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.style.removeProperty("border");
    }, duration);
  };

  const slideDown = (target: HTMLElement, duration = 300): void => {
    target.style.removeProperty("display");
    let display = window.getComputedStyle(target).display;
    if (display === "none") display = "grid";
    target.style.display = display;
    const height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    target.offsetHeight;
    target.style.boxSizing = "border-box";
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.border = "none";

    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("border");

    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.style.removeProperty("border");
    }, duration);
  };

  return { slideUp, slideDown };
};
