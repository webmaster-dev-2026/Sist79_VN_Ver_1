import logoHeader from '../assets/logo_header.svg';

export default function BrandLogo() {
  return (
    <img
      src={logoHeader}
      alt="SiST 79 — Prévention Santé Travail"
      className="kiosk-brand-logo"
      draggable={false}
    />
  );
}
