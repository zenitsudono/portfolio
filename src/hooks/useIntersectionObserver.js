import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const thresholdStr = JSON.stringify(options.threshold);
  const rootMargin = options.rootMargin;
  const root = options.root;

  useEffect(() => {
    const parsedThreshold = thresholdStr ? JSON.parse(thresholdStr) : undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: parsedThreshold,
      rootMargin,
      root
    });

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [thresholdStr, rootMargin, root]);

  return [elementRef, isVisible];
};

export default useIntersectionObserver;
