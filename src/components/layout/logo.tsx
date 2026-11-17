import Link from 'next/link';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="好好睡觉 Rested Well 首页">
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="19" fill="#E2EBE0" />
        <path
          d="M25.8 25.6A9.2 9.2 0 0 1 14.4 14.2a9.4 9.4 0 1 0 11.4 11.4Z"
          fill="#486845"
        />
        <path
          d="M12 12.4c.9.2 1.6.7 2 1.5.4-.8 1.1-1.3 2-1.5-.9-.2-1.6-.7-2-1.5-.4.8-1.1 1.3-2 1.5Z"
          fill="#D69A64"
        />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-lg font-semibold tracking-wide text-ink">好好睡觉</span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-sage-600">
            Rested Well
          </span>
        </span>
      )}
    </Link>
  );
}
