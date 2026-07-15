import React from 'react';

export interface DarkSectionProps {
  children: React.ReactNode;
  /** which navy to use as background */
  tone?: '900' | '950';
  /** render a soft concave white curve overlapping the top edge */
  curveTop?: boolean;
}

export function DarkSection({ children, tone = '900', curveTop = false }: DarkSectionProps) {
  const bg = tone === '950' ? 'var(--navy-950)' : 'var(--navy-900)';
  return (
    <section
      style={{
        position: 'relative',
        background: bg,
        padding: '96px 0',
        overflow: 'hidden',
      }}
    >
      {curveTop && (
        <svg
          viewBox="0 0 100 6"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: -1, left: 0, width: '100%', height: 48, display: 'block' }}
        >
          <path d="M0,6 Q50,0 100,6 L100,0 L0,0 Z" fill="#ffffff" />
        </svg>
      )}
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 32px', position: 'relative' }}>
        {children}
      </div>
    </section>
  );
}
