'use client';

import {useEffect, useRef} from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
      }, 100);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        follower.style.backgroundColor = 'var(--accent)';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.backgroundColor = 'transparent';
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50"
        style={{
          backgroundColor: '#e8ff47',
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
        style={{
          border: '1px solid #e8ff47',
          transform: 'translate(-50%, -50%)',
          transition: 'transform 200ms ease-out',
        }}
      />
    </>
  );
}
