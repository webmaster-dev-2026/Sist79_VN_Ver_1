import logoHeader from '../assets/logo_header.svg';

/** Header logo crop: viewBox 900×195 */
const LOGO_VIEW_W = 900;
const LOGO_VIEW_H = 195;
const LOGO_HEIGHT = 52;

const LOGO_WIDTH = Math.round(LOGO_HEIGHT * (LOGO_VIEW_W / LOGO_VIEW_H));

export default function BrandLogo() {
  return (
    <img
      src={logoHeader}
      alt="SiST 79 — Prévention Santé Travail"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      draggable={false}
      style={{
        width: LOGO_WIDTH,
        height: LOGO_HEIGHT,
        minWidth: LOGO_WIDTH,
        minHeight: LOGO_HEIGHT,
        maxWidth: LOGO_WIDTH,
        maxHeight: LOGO_HEIGHT,
        flexShrink: 0,
        display: 'block',
        objectFit: 'contain',
      }}
    />
  );
}
