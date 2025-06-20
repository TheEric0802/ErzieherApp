import type { appUser } from "../../types/appUser.ts";
import { titleStyle } from "../../App.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "../ui/Card.tsx";
import type { tagebuchEintrag } from "../../types/tagebuchEintrag.ts";
import { DndContext, type DragEndEvent, DragOverlay } from "@dnd-kit/core";
import type { kind } from "../../types/kind.ts";
import DraggableCard from "../ui/DraggableCard.tsx";
import DroppableCard from "../ui/DroppableCard.tsx";

type GruppentagebuchProps = {
  appUser: appUser | null | undefined;
};

export default function Gruppentagebuch({ appUser }: GruppentagebuchProps) {
  const nav = useNavigate();

  if (!appUser) {
    nav("/");
  }

  const { gruppenId, datum } = useParams();
  const datumDate = new Date(datum!);

  const [tagebuchEintrag, setTagebuchEintrag] = useState<tagebuchEintrag>();
  const [draggedKind, setDraggedKind] = useState<kind | null>(null);

  const loadTagebuchEintrag = useCallback(() => {
    axios
      .get<tagebuchEintrag>(`/api/gruppentagebuch/${gruppenId}/${datum}`)
      .then((r) => {
        setTagebuchEintrag(r.data);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          axios
            .post<tagebuchEintrag>(`/api/gruppentagebuch/initial/${gruppenId}`)
            .then((r) => setTagebuchEintrag(r.data))
            .catch((e) => {
              console.error(e);
            });
        } else {
          console.error(e);
          nav("/gruppen");
        }
      });
  }, [datum, gruppenId, nav]);

  useEffect(() => {
    loadTagebuchEintrag();
  }, [loadTagebuchEintrag]);

  function saveTagebuchEintrag() {
    if (!tagebuchEintrag) return;
    axios
      .put(`/api/gruppentagebuch/${gruppenId}/${datum}`, tagebuchEintrag)
      .catch((e) => {
        console.error(e);
      });
  }

  const statuses = new Map([
    ["anwesenheitUnbekannt", "Anwesenheit nicht bekannt"],
    ["anwesend", "Anwesend"],
    ["krank", "Krank"],
    ["urlaub", "Urlaub"],
    ["unentschuldigt", "Unentschuldigt"],
  ]);

  function handleDragStart(e: DragEndEvent) {
    const { active } = e;
    const kind: kind = active.data.current as kind;
    setDraggedKind(kind);
  }

  function handleDragEnd(e: DragEndEvent) {
    setDraggedKind(null);
    const { active, over } = e;

    if (!over) return;

    const kindId = active.id as string;
    const kind: kind = active.data.current as kind;
    const newStatus = over.id as string;

    for (const status of statuses.keys()) {
      const array = tagebuchEintrag![status as keyof tagebuchEintrag] as kind[];
      if (
        tagebuchEintrag &&
        status !== newStatus &&
        array.some((k) => k.id === kindId)
      ) {
        const newArrayOldStatus = [...array];
        const newArrayNewStatus = [
          ...(tagebuchEintrag[newStatus as keyof tagebuchEintrag] as kind[]),
        ];
        const index = newArrayOldStatus.indexOf(kind);
        newArrayOldStatus.splice(index, 1);
        newArrayNewStatus.push(kind);
        setTagebuchEintrag({
          ...tagebuchEintrag,
          [status as keyof tagebuchEintrag]: newArrayOldStatus,
          [newStatus as keyof tagebuchEintrag]: newArrayNewStatus,
        });
      }
    }
  }

  return (
    <>
      <h1 className={titleStyle}>Gruppentagebuch</h1>
      <Card
        title={`${tagebuchEintrag?.gruppe.name}`}
        badges={[datumDate.toLocaleDateString()]}
        actions={
          <>
            <button className={"btn btn-primary"} onClick={saveTagebuchEintrag}>
              Speichern
            </button>
            <button
              className={"btn btn-secondary"}
              onClick={() => {
                saveTagebuchEintrag();
                nav("/gruppen");
              }}
            >
              Zurück
            </button>
          </>
        }
      >
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Inhalt</legend>
          <textarea
            className="textarea h-24 w-full"
            placeholder="Inhalt"
            name={"content"}
            value={tagebuchEintrag?.eintrag}
            onChange={(e) => {
              setTagebuchEintrag(
                tagebuchEintrag && {
                  ...tagebuchEintrag,
                  eintrag: e.target.value,
                },
              );
            }}
          />
        </fieldset>
        <div className={"flex flex-row gap-4 mb-4"}>
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className={"flex-none mt-2"}>
              {Array.from(statuses)
                .filter((_entry, index) => index === 0)
                .map(([key, value]) => (
                  <>
                    <DroppableCard
                      key={key}
                      droppableId={key}
                      cardProps={{ title: value }}
                    >
                      <div className={"flex flex-col gap-2"}>
                        {(
                          tagebuchEintrag?.[
                            key as keyof tagebuchEintrag
                          ] as kind[]
                        )
                          ?.sort(
                            (a, b) =>
                              a.lastName.localeCompare(b.lastName) ||
                              a.firstName.localeCompare(b.firstName),
                          )
                          ?.map((kind) => (
                            <DraggableCard
                              key={kind.id}
                              cardProps={{
                                title: `${kind.firstName} ${kind.lastName}`,
                              }}
                              draggableId={kind.id}
                              draggableData={kind}
                            ></DraggableCard>
                          ))}
                      </div>
                    </DroppableCard>
                  </>
                ))}
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 mb-2">
              {Array.from(statuses)
                .slice(1)
                .map(([key, value]) => (
                  <>
                    <DroppableCard
                      key={key}
                      droppableId={key}
                      cardProps={{ title: value }}
                    >
                      <div className={"flex flex-col gap-2"}>
                        {(
                          tagebuchEintrag?.[
                            key as keyof tagebuchEintrag
                          ] as kind[]
                        )
                          ?.sort(
                            (a, b) =>
                              a.lastName.localeCompare(b.lastName) ||
                              a.firstName.localeCompare(b.firstName),
                          )
                          ?.map((kind) => (
                            <DraggableCard
                              key={kind.id}
                              cardProps={{
                                title: `${kind.firstName} ${kind.lastName}`,
                              }}
                              draggableId={kind.id}
                              draggableData={kind}
                            ></DraggableCard>
                          ))}
                      </div>
                    </DroppableCard>
                  </>
                ))}
            </div>
            <DragOverlay>
              {draggedKind ? (
                <DraggableCard
                  cardProps={{
                    title: `${draggedKind.firstName} ${draggedKind.lastName}`,
                  }}
                  draggableId={draggedKind.id}
                  draggableData={draggedKind}
                ></DraggableCard>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </Card>
    </>
  );
}
