import React from "react";

/**
 * 무한스크롤 커스텀 훅
 * @default targetRef 감지하고있는 목표 Ref
 */

const useInterSection = (targetRef: React.RefObject<HTMLElement>) => {
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const [intersecting, setInterSecting] = React.useState(false);

  const getObserver = React.useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        setInterSecting(entries.some((entry) => entry.isIntersecting));
      });
    }
    return observerRef.current;
  }, [observerRef.current]);

  React.useEffect(() => {
    if (targetRef.current) {
      getObserver().observe(targetRef.current);
    }
  }, [targetRef.current]);

  return intersecting;
};
export default useInterSection;
