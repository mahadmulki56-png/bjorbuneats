import { useEffect } from 'react';

/**
 * Custom hook to apply a subtle 'fade-in-up' entrance animation to major
 * section containers when they enter the viewport using an IntersectionObserver.
 */
export function useScrollReveal(selector = '.organic-container-large') {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const elements = document.querySelectorAll<HTMLElement>(selector);
    if (!elements.length) return;

    // Graceful fallback for legacy environments without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Unobserve once revealed so it remains rendered smoothly
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [selector]);
}
