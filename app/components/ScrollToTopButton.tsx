import {useState, useEffect} from 'react';

/* Reveal pattern matches StickyScrollMenu.tsx: hidden until the site header
   scrolls out of view, so it never appears while already at/near the top of
   the page (nothing to scroll to yet). */
export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const header = document.querySelector('header.site-header');
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      {threshold: 0},
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      aria-label="Return to top"
      className="fixed bottom-0 left-0 m-3 w-10 h-10 flex items-center justify-center bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
