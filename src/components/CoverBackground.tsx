import React from 'react';

interface CoverBackgroundProps {
  src: string;
  fallbackColor?: string;
  overlay?: boolean;
}

export default function CoverBackground({
  src,
  fallbackColor = '#f8fbfe',
  overlay = true,
}: CoverBackgroundProps) {
  return (
    <div
      className="cover-background"
      style={{ background: fallbackColor }}
    >
      <img
        className={`cover-background__image${overlay ? '' : ' cover-background__image--clean'}`}
        src={src}
        alt=""
        aria-hidden
        draggable={false}
      />
      {overlay && (
        <>
          <div className="cover-background__blur" aria-hidden />
          <div className="cover-background__scrim" aria-hidden />
          <div className="cover-background__grain" aria-hidden />
        </>
      )}
    </div>
  );
}
