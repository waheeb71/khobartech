"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // If IntersectionObserver is not supported, reveal everything immediately
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal, .reveal-stagger, .reveal-stagger > *, .reveal-scale").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            // If it's a stagger container, also reveal its children
            if (entry.target.classList.contains("reveal-stagger")) {
              Array.from(entry.target.children).forEach((child) => {
                child.classList.add("is-revealed");
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    const registerElements = () => {
      const elements = document.querySelectorAll(".reveal, .reveal-stagger, .reveal-stagger > *, .reveal-scale");
      elements.forEach((el) => {
        if (!el.classList.contains("is-revealed")) {
          observer.observe(el);
        }
      });
    };

    // Immediate check + short delay check for painted DOM
    registerElements();
    const timer = setTimeout(registerElements, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

