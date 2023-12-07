import React, { useState } from "react";
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,

}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <g onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      </g>
      <EdgeLabelRenderer >
        <div
          className="nodrag nopan"
          style={{
            fontSize: 12,
            pointerEvents: "all",
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <button style={{borderRadius:"50%",height:"30px",width:"30px",cursor:"pointer"}} >
              ×
            </button>)}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
