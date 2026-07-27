import { useEffect, useState } from 'react';

export function useScrollSpy(ids: string[], offset = 140) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    function handleScroll() {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) {
          current = id;
        }
      }
      setActiveId(current);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
}
