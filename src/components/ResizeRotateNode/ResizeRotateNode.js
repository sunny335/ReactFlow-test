import React, { useEffect, useState, useRef } from 'react';
import {
  Handle,
  Position,
  useUpdateNodeInternals,
  NodeResizer,
} from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from './style.module.css';

export default function ResizeRotateNode({
  id,
  sourcePosition = Position.Left,
  targetPosition = Position.Right,
  data,
}) {
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);
  const [resizable, setResizable] = useState(!!data.resizable);
  const [rotatable, setRotatable] = useState(!!data.rotatable);

  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on('drag', (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      updateNodeInternals(id);
    });

    selection.call(dragHandler);
  }, [id, updateNodeInternals]);

  return (
    <>
      <div
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
        className={styles.node}
      >
        
     
      </div>
    </>
  );
}
