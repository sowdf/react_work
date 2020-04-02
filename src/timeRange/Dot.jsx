import React, { useState, useRef, useEffect, useCallback } from 'react';
import useSpring from './useSpring';

const mo = function(e) {
  e.preventDefault();
};

/** *禁止滑动** */
function stop() {
  document.body.style.overflow = 'hidden';
  document.addEventListener('touchmove', mo, { passive: false }); // 禁止页面滑动
}

/** *取消滑动限制** */
function move() {
  document.body.style.overflow = ''; // 出现滚动条
  document.removeEventListener('touchmove', mo, { passive: false });
}
const Dot = ({ moving, moveEnd, initializeTop, limitfn }) => {
  const [position, set] = useSpring(() => ({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  }));
  const { x, y } = position;
  const latestRef = useRef(0);
  const disY = useRef(0);
  const oDivRef = useRef();
  const startClientRef = useRef();
  const limitRef = useRef();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const { top } = oDivRef.current.getBoundingClientRect();
    initializeTop(top);
  }, [initializeTop]);

  const handleTouchmove = useCallback(
    e => {
      const {
        touches: [{ clientY }],
      } = e;
      // const boundingClientRect = oDivRef.current.getBoundingClientRect();
      disY.current = clientY - startClientRef.current;
      const limit = limitRef.current;
      if (disY.current < 0) {
        // ↑↑↑↑↑↑↑↑↑↑↑
        if (limit[0] < Math.abs(disY.current)) {
          disY.current = -limit[0];
        }
        set({ ...position, y: latestRef.current + disY.current });
      } else {
        // ↓↓↓↓↓↓↓↓↓↓
        if (limit[1] < Math.abs(disY.current)) {
          disY.current = limit[1];
        }
        set({ ...position, y: latestRef.current + disY.current });
      }
    },
    [position, set],
  );

  const handleTouchend = useCallback(() => {
    latestRef.current += disY.current;
    const boundingClientRect = oDivRef.current.getBoundingClientRect();
    moveEnd(boundingClientRect.top);
    document.removeEventListener('touchmove', handleTouchmove);
    document.removeEventListener('touchend', handleTouchend);
    // set({ ...position, lastY: y });
  }, [handleTouchmove, moveEnd]);

  const handleTouchstart = useCallback(
    e => {
      const {
        touches: [{ clientY }],
      } = e;

      limitRef.current = limitfn();
      startClientRef.current = clientY;
      document.addEventListener('touchmove', handleTouchmove);
      document.addEventListener('touchend', handleTouchend);
    },
    [handleTouchend, handleTouchmove],
  );

  useEffect(() => {
    if (!loaded) {
      oDivRef.current.addEventListener('touchstart', handleTouchstart);
      setLoaded(true);
    }
  }, [handleTouchstart, loaded]);

  return (
    <div
      className="dot"
      ref={div => {
        oDivRef.current = div;
      }}
      style={{
        transform: `translate(${x}px,${y}px)`,
      }}
    />
  );
};
export default Dot;
