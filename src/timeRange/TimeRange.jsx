import React, { useState } from "react";
import { useDrag } from "react-use-gesture";
import useSpring from "./useSpring";
const TimeRange = () => {
  const [{ x, y, lastX, lastY }, set] = useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0
  });
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(props => {
    console.log("___________________props_______________", props);
    if (!props.offset) {
      return;
    }
    const {
      down,
      moving,
      dragging,
      offset: [ox, oy],
      lastOffset,
      xy,
      movement: [mx, my]
    } = props;
    console.log("___________________down_______________", down);
    console.log("___________________dragging_______________", dragging);
    if (down) {
      set({ x: lastX + mx, y: lastY + my });
    } else {
      set({ lastX: lastX + mx, lastY: lastY + my });
    }
    return false;
    // set({ x: down ? x + mx : x, y: down ? y + my : y });
  });
  // Bind it to a component
  return (
    <div
      {...bind()}
      style={{
        transform: `translate(${x}px,${y}px)`,
        width: "100px",
        height: "100px",
        left: "50px",
        top: "50px",
        background: "red"
      }}
    ></div>
  );
};
export default TimeRange;
