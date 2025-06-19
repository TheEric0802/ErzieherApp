import { useDroppable } from "@dnd-kit/core";
import Card, { type CardProps } from "./Card.tsx";
import * as React from "react";

type DroppableCardProps = {
  children?: React.ReactNode;
  cardProps: CardProps;
  droppableId: string;
};

export default function DroppableCard({
  children = null,
  cardProps,
  droppableId,
}: DroppableCardProps) {
  const { setNodeRef } = useDroppable({
    id: droppableId,
  });

  return (
    <div ref={setNodeRef} className={"flex-grow my-2 h-full"}>
      <Card {...cardProps} fullHeight={true}>
        {children}
      </Card>
    </div>
  );
}
