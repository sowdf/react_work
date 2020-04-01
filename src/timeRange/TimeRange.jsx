import React, { useState, useRef, useEffect, useCallback } from "react";
import Dot from "./Dot";
import useCollisionDetection from "./useCollisionDetection";
const dots = [0, 1, 2, 3, 4];
const SIZE = 30;
const PADDING = 10;
const TimeRange = () => {
  // const { getCollisionStateY, setPositionY } = useCollisionDetection(dots);\
  const positionRef = useRef({});
  const boxRef = useRef();
  const boxHeightRef = useRef();
  const boxTopRef = useRef();
  useEffect(() => {
    console.log(
      "___________________boxRef_______________",
      boxRef.current.getBoundingClientRect()
    );
    boxTopRef.current = boxRef.current.getBoundingClientRect().top;
    boxHeightRef.current = boxRef.current.getBoundingClientRect().height;
    console.log(
      "___________________  boxTopRef.current _______________",
      boxTopRef.current
    );
    console.log(
      "___________________boxHeightRef.current_______________",
      boxHeightRef.current
    );
    dots.forEach(index => {
      if (!positionRef.current[index]) {
        positionRef.current[index] = {};
      }
    });
  }, []);

  const setPositionY = useCallback((index, y) => {
    positionRef.current[index] = { y };
  }, []);

  const getCollisionStateY = useCallback((index, y) => {
    const previous = positionRef.current[index - 1];
    const next = positionRef.current[index + 1];
    const current = positionRef.current[index];
    if (previous && next) {
      if (previous.y + SIZE < y < next.y) {
        return false;
      } else {
        return true;
      }
    }
    // 只有上一个 表示在最后一个
    if (previous) {
      const maxLimitTop =
        boxHeightRef.current + boxTopRef.current - SIZE - PADDING;
      const minLimitTop = previous.y + SIZE;
      console.log("___________________maxLimitTop_______________", maxLimitTop);
      console.log("___________________minLimitTop_______________", minLimitTop);
      console.log("___________________y_______________", y);
      if (minLimitTop <= y && y <= maxLimitTop) {
        return [false, current.y];
      }
      return [true,  current.y];
    }
    // 只有下一个 表示在第一个
    if (next) {
      if (0 < y < next.y - (boxTopRef.current + PADDING)) {
        return false;
      }
      return true;
    }
  }, []);

  return (
    <div className="zhuzi" ref={div => (boxRef.current = div)}>
      {dots.map(index => {
        return (
          <Dot
            initializePositionY={y => {
              setPositionY(index, y);
            }}
            moveEnd={y => {
              setPositionY(index, y);
            }}
            moving={moveY => getCollisionStateY(index, Math.abs(moveY))}
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
};
export default TimeRange;
