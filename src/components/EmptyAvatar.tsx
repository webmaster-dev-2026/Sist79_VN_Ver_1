import { useId } from 'react';

interface EmptyAvatarProps {
  size?: number;
}

export default function EmptyAvatar({ size = 132 }: EmptyAvatarProps) {
  const gradientId = useId();

  return (
    <svg
      className="empty-avatar"
      width={size}
      height={size}
      viewBox="0 0 132 132"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f4fbff" />
          <stop offset="100%" stopColor="#d6ecfc" />
        </linearGradient>
      </defs>
      <circle cx="66" cy="66" r="66" fill={`url(#${gradientId})`} />
      <circle cx="66" cy="52" r="22" fill="#069beb" fillOpacity="0.28" />
      <path
        d="M28 118c4.5-22 17.5-34 38-34s33.5 12 38 34"
        fill="#069beb"
        fillOpacity="0.28"
      />
    </svg>
  );
}
