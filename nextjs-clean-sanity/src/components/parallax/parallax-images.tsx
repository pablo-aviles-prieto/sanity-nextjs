'use client';

import { Parallax } from 'react-scroll-parallax';

interface ParallaxData {
  src: string;
  speed: number;
}

interface ParallaxImagesProp {
  parallaxImages: ParallaxData[];
}

export const ParallaxImages = ({ parallaxImages }: ParallaxImagesProp) => {
  return (
    <div>
      {parallaxImages.map((img, i) => (
        <Parallax key={img.src} speed={img.speed}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} alt={`Image ${i}`} className='w-60 rounded-lg shadow-lg' />
        </Parallax>
      ))}
    </div>
  );
};
