import {useState, useEffect} from 'react';

interface Category {
  name: string;
  handle: string;
}

interface StickyScrollMenuProps {
  categories: Category[];
}

export function StickyScrollMenu({categories}: StickyScrollMenuProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const header = document.querySelector('header.site-header');
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
        if (entry.isIntersecting) setIsExpanded(false);
      },
      {threshold: 0},
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  if (!isVisible || categories.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 z-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="m-3 w-10 h-10 flex items-center justify-center bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
        aria-label="Toggle category menu"
        aria-expanded={isExpanded}
      >
        {isExpanded ? (
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
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
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
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {isExpanded && (
        <nav
          className="fixed top-14 left-3 bg-white rounded-lg shadow-xl max-h-[80vh] overflow-y-auto w-64 border border-gray-200"
          aria-label="Category navigation"
        >
          <ul className="py-2">
            {categories.map((cat) => (
              <li key={cat.handle}>
                <a
                  href={`/collections/${cat.handle}`}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                  onClick={() => setIsExpanded(false)}
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
