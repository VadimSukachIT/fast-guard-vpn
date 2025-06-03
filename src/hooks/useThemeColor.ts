import { useEffect } from 'react';

export function useThemeColor(color: string = '#ECF1F9') {
  useEffect(() => {
    let metaTag = document.querySelector('meta[name="theme-color"]');

    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'theme-color');
      document.head.appendChild(metaTag);
    }

    const previousColor = metaTag.getAttribute('content');
    metaTag.setAttribute('content', color);

    return () => {
      if (previousColor) {
        metaTag!.setAttribute('content', previousColor);
      }
    };
  }, [color]);
}