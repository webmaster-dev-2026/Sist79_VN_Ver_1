import React from 'react';

interface CoverBackgroundProps {
  src: string;
  fallbackColor?: string;
}

export default function CoverBackground({
  src,
  fallbackColor = '#f8fbfe',
}: CoverBackgroundProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: fallbackColor,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
      />
    </div>
  );
}
