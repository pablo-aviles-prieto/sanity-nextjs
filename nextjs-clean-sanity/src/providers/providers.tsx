'use client';

import { ParallaxProvider } from 'react-scroll-parallax';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ParallaxProvider>{children}</ParallaxProvider>;
};
