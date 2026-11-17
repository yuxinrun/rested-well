import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rested Well — Sleep Better. Feel Better. Live Better.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FDFBF6',
          padding: 72,
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: '#E2EBE0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 30, height: 30, borderRadius: 30, background: '#486845' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#2F3632', letterSpacing: 2 }}>RESTED WELL</div>
            <div style={{ fontSize: 13, color: '#5F815B', letterSpacing: 4 }}>SLEEP &amp; ENERGY</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 700, color: '#2E432C', lineHeight: 1.1 }}>
            Sleep Better.
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, color: '#5F815B', lineHeight: 1.1 }}>
            Feel Better.
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, color: '#83A7BF', lineHeight: 1.1 }}>
            Live Better.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 4, background: '#D69A64', borderRadius: 2 }} />
          <div style={{ fontSize: 20, color: '#5A635E' }}>A Chinese knowledge platform for sleep &amp; energy</div>
        </div>
      </div>
    ),
    size
  );
}
