'use client';

import { ParallaxBanner } from 'react-scroll-parallax';

export interface ParallaxDefaultBannerProps {
  imgsData: {
    image: {
      asset: {
        metadata: {
          dimensions: {
            height: number;
            width: number;
          };
        };
        url: string;
      };
    };
    title: string;
    speed: number;
  }[];
}

export const ParallaxDefaultBanner = ({ imgsData }: ParallaxDefaultBannerProps) => {
  const orderedImgsData = imgsData.sort((a, b) => {
    if (a.title === 'Banner background') return -1;
    if (b.title === 'Banner background') return 1;
    return 0;
  });

  return (
    <ParallaxBanner
      layers={orderedImgsData.map(img => ({ image: img.image.asset.url, speed: img.speed }))}
      // layers={[
      //   {
      //     image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-background.jpg',
      //     speed: -20,
      //   },
      //   { image: '/static/banner-foreground.png', speed: -10 },
      // ]}
      className='aspect-[2/1]'
    />
  );
};
