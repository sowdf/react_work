import React, { useRef, useEffect, useCallback } from 'react';
import Dot from './Dot';
import Rectangle from './Rectangle';

const dots = [0, 1, 2, 3, 4];
const SIZE = 30;
const PADDING = 5;
const TimeRange = () => {
  // const { getCollisionStateY, setPositionY } = useCollisionDetection(dots);\
  const topsRef = useRef({});
  const boxRef = useRef();
  const boxHeightRef = useRef();
  const boxTopRef = useRef();

  useEffect(() => {
    boxTopRef.current = boxRef.current.getBoundingClientRect().top;
    boxHeightRef.current = boxRef.current.getBoundingClientRect().height;
    /*    dots.forEach(index => {
      if (!topsRef.current[index]) {
        topsRef.current[index] = {};
      }
    }); */
  }, []);

  const setTop = useCallback((index, top) => {
    console.log('___________________top_______________', top);
    topsRef.current[index] = { top };
  }, []);
  console.log('___________________tops_______________', topsRef.current);
  const createLimit = index => {
    const tops = topsRef.current;
    const previous = tops[index - 1];
    const next = tops[index + 1];
    const current = tops[index];
    if (previous && next) {
      const upMovePosition = current.top - (previous.top + SIZE);
      const downMovePosition = next.top - (current.top + SIZE);
      return [upMovePosition, downMovePosition];
    }
    // 只有上一个 表示在最后一个
    if (previous) {
      const upMovePosition = current.top - (previous.top + SIZE);
      const downMovePosition = boxHeightRef.current + boxTopRef.current - PADDING - (current.top + SIZE);
      return [upMovePosition, downMovePosition];
    }
    // 只有下一个 表示在第一个
    if (next) {
      const upMovePosition = current.top - (boxTopRef.current + PADDING);
      const downMovePosition = next.top - (boxTopRef.current + SIZE);
      return [upMovePosition, downMovePosition];
    }
    return [];
  };
  console.log('___________________topsRef_______________', topsRef.current);
  return (
    <div className="box">
      <Rectangle />
      <div className="zhuzi" ref={div => (boxRef.current = div)}>
        {dots.map(index => {
          return (
            <Dot
              initializeTop={top => {
                setTop(index, top);
              }}
              limitfn={() => createLimit(index)}
              moveEnd={top => {
                setTop(index, top);
              }}
              index={index}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};
export default TimeRange;
