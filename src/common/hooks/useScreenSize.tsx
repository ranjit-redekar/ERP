import { useState, useEffect } from 'react';

type ScreenSize = 'mobile' | 'tablet' | 'desktop';

function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    if (window.innerWidth <= 576) {
      return 'mobile';
    } else if (window.innerWidth <= 992) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setScreenSize('mobile');
      } else if (window.innerWidth <= 992) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
}

export default useScreenSize;
