import { useDraggable } from "@dnd-kit/core";
import Card, { type CardProps } from "./Card.tsx";
import * as React from "react";

type DraggableCardProps = {
  children?: React.ReactNode;
  cardProps: CardProps;
  draggableId: string;
  draggableData?: object;
};

export default function DraggableCard({
  children = null,
  cardProps,
  draggableId,
  draggableData,
}: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: draggableId,
    data: draggableData,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={"flex-grow touch-none"}
    >
      <Card {...cardProps}>{children}</Card>
    </div>
  );
}
