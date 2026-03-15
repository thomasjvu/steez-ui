import React from "react";

import styles from "./AvatarStage.module.css";

export interface AvatarStageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  backdrop?: React.ReactNode;
  stageHeight?: number | string;
  viewportWidth?: number | string;
  viewportClassName?: string;
}

export function AvatarStage({
  children,
  backdrop,
  stageHeight = "34rem",
  viewportWidth = "min(100%, 30rem)",
  className = "",
  viewportClassName = "",
  style,
  ...props
}: AvatarStageProps) {
  const mergedStyle = {
    ...style,
    ["--avatar-stage-height" as string]:
      typeof stageHeight === "number" ? `${stageHeight}px` : stageHeight,
    ["--avatar-stage-viewport-width" as string]:
      typeof viewportWidth === "number" ? `${viewportWidth}px` : viewportWidth,
  } as React.CSSProperties;

  return (
    <div className={`${styles.root} ${className}`.trim()} style={mergedStyle} {...props}>
      {backdrop ? <div className={styles.backdrop}>{backdrop}</div> : null}
      <div className={`${styles.viewport} ${viewportClassName}`.trim()}>{children}</div>
    </div>
  );
}
