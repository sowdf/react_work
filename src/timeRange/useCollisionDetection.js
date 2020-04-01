/*
 * @Author: caozhihui@leedarson.com
 * @Date: 2020/4/1
 * Copyright © Leedarson. All rights reserved.
 */
// 碰撞检测
import { useRef, useCallback, useEffect } from "react";
const SIZE = 30;
const useCollisionDetection = indexCollection => {
  const positionRef = useRef({});
  useEffect(() => {
    indexCollection.forEach(index => {
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
    if (previous && next) {
      if (y > 0 && y < next.y - (previous.y + SIZE)) {
        return false;
      } else {
        return true;
      }
    }
    // 只有上一个 表示在最后一个
    if (previous) {
      if (y > previous.y + SIZE) {
        return false;
      }
      return true;
    }
    // 只有下一个 表示在第一个
    if (next - SIZE) {
      return true;
    }
  }, []);
  return { setPositionY, getCollisionStateY };
};

export default useCollisionDetection;
