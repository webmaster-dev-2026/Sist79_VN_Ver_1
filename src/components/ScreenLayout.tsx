import React from 'react';
import KioskHeader from './KioskHeader';
import CoverBackground from './CoverBackground';
import bgImage from '../assets/bgv1.png';
import { BRAND } from '../theme/brand';

interface ScreenLayoutProps {
  children: React.ReactNode;
  subtitle?: string;
  footer?: string;
  backgroundImage?: string;
  overlay?: boolean;
}

export default function ScreenLayout({
  children,
  subtitle,
  footer,
  backgroundImage = bgImage,
  overlay = true,
}: ScreenLayoutProps) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: BRAND.bg,
      overflow: 'hidden',
    }}>
      <CoverBackground src={backgroundImage} fallbackColor={BRAND.bg} overlay={overlay} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
      }}>
        <KioskHeader subtitle={subtitle} />
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', width: '100%' }}>
          {children}
        </div>
        {footer && (
          <footer className="liquid-glass-bar" style={{
            textAlign: 'center',
            padding: '16px 24px',
            color: BRAND.muted,
            fontSize: '13px',
            fontWeight: 500,
            flexShrink: 0,
          }}>
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
