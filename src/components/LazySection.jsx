import { useState, useEffect, useRef } from 'react';

const LazySection = ({ children, fallback, threshold = 0.1, rootMargin = '100px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={sectionRef} className="min-h-screen">
      {isVisible ? children : fallback}
    </div>
  );
};

export default LazySection;