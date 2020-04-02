/*
 * @Author: caozhihui@leedarson.com
 * @Date: 2020/4/2
 * Copyright © Leedarson. All rights reserved.
 */
import React from 'react';

const dots = [0, 1, 2, 3];

const Rectangle = () => {
  return (
    <div className="rectangle">
      {dots.map(index => {
        return <div className={`rectangle-${index}`} key={index}>{`time _____ ${index}`}</div>;
      })}
    </div>
  );
};
export default Rectangle;
