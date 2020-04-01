import React, { useState, useRef, useEffect } from "react";
import { useDrag } from "react-use-gesture";
import useSpring from "./useSpring";
import useCollisionDetection from "./useCollisionDetection";
const mo = function(e) {
  e.preventDefault();
};

/***禁止滑动***/
function stop() {
  document.body.style.overflow = "hidden";
  document.addEventListener("touchmove", mo, { passive: false }); //禁止页面滑动
}

/***取消滑动限制***/
function move() {
  document.body.style.overflow = ""; //出现滚动条
  document.removeEventListener("touchmove", mo, { passive: false });
}
const Dot = ({ moving, moveEnd, initializePositionY }) => {
  const [position, set] = useSpring(() => ({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0
  }));
  const { x, y, lastX, lastY } = position;
  const oDivRef = useRef();
  // 最大移动量
  const maxMovePositionRef = useRef();
  const isLimitRef = useRef();
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(props => {
    if (!props.offset) {
      return;
    }
    const {
      down,
      dragging,
      offset: [ox, oy],
      lastOffset,
      xy,
      movement: [mx, my]
    } = props;
    console.log("___________________props_______________", props);
    const top = oDivRef.current.getBoundingClientRect().top;
    const [onOff, currentTop] = moving(top);
    console.log("___________________top_______________", top);
    console.log("___________________my_______________", my);
    console.log("___________________currentTop_______________", currentTop);
    if (onOff) {
      if (my === 0) {
        return;
      }
      if (!maxMovePositionRef.current) {
        if (my < 0) {
          maxMovePositionRef.current = currentTop - top; // < 0
        } else {
          maxMovePositionRef.current = top - currentTop; // > 0
        }
      }
      return;
    } else {
      maxMovePositionRef.current = "";
    }
    console.log(onOff);
    let deviationPositionY =
      lastY +
      (maxMovePositionRef.current === undefined
        ? maxMovePositionRef.current
        : my);
    if (down) {
      set({ ...position, y: deviationPositionY });
      // stop();
    } else {
      set({ ...position, lastY: deviationPositionY });
      moveEnd(top);
      maxMovePositionRef.current = "";
      // move();
    }
    return false;
    // set({ x: down ? x + mx : x, y: down ? y + my : y });
  });
  useEffect(() => {
    const top = oDivRef.current.getBoundingClientRect().top;
    initializePositionY(top);
  }, []);

  // Bind it to a component
  if (oDivRef.current) {
    //  console.log(oDivRef.current.previousElementSibling);
    // console.log(oDivRef.current.nextElementSibling);
    // console.log(oDivRef.current.getBoundingClientRect());
  }
  return (
    <div
      className="dot"
      ref={div => (oDivRef.current = div)}
      {...bind()}
      style={{
        transform: `translate(${x}px,${y}px)`
      }}
    ></div>
  );
};
export default Dot;
