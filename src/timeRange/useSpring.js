import { useState, useEffect } from "react";
const useSpring = fn => {
  const [xy, setXy] = useState({ x: 0, y: 0,lastX:0,lastY:0 });
  useEffect(() => {
    setXy(fn());
  }, []);

  return [xy, setXy];
};

export default useSpring;
