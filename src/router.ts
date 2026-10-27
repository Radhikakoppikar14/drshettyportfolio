import { useEffect, useState } from 'react';

// Tiny hash router (no extra packages, works on any hosting without server config).
//   #/        -> common home page (heart + dental)
//   #/heart   -> heart care website
//   #/dental  -> dental care website
export type Route = 'home' | 'heart' | 'dental';

const parse = (): Route => {
  const h = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (h.startsWith('heart')) return 'heart';
  if (h.startsWith('dental')) return 'dental';
  return 'home';
};

export const hrefFor = (r: Route) => (r === 'home' ? '#/' : `#/${r}`);

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parse);
  useEffect(() => {
    const on = () => {
      setRoute(parse());
      // 'instant' so a new page always starts at the top (CSS smooth scrolling would animate it)
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}