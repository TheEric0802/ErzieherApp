import type { appUser } from "../../types/appUser.ts";
import { titleStyle } from "../../App.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "../ui/Card.tsx";
import type { tagebuchEintrag } from "../../types/tagebuchEintrag.ts";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
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

  function handleDragEnd(e: DragEndEvent) {
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
        <div className={"flex flex-row flex-wrap gap-4"}>
          <DndContext onDragEnd={handleDragEnd}>
            {/*<DroppableCard*/}
            {/*  droppableId={"anwesenheitUnbekannt"}*/}
            {/*  cardProps={{ title: "Anwesenheit nicht bekannt" }}*/}
            {/*>*/}
            {/*  <DraggableCard*/}
            {/*    cardProps={{ title: "Test Draggable" }}*/}
            {/*    draggableId={"1"}*/}
            {/*  ></DraggableCard>*/}
            {/*</DroppableCard>*/}
            {
              //   {
              //   anwesenheitUnbekannt: "Anwesenheit nicht bekannt",
              //   anwesend: "Anwesend",
              //   krank: "Krank",
              //   urlaub: "Urlaub",
              //   unentschuldigt: "Unentschuldigt",
              // }
              Array.from(statuses).map(([key, value]) => (
                <DroppableCard
                  key={key}
                  droppableId={key}
                  cardProps={{ title: value }}
                >
                  {(
                    tagebuchEintrag?.[key as keyof tagebuchEintrag] as kind[]
                  )?.map((kind) => (
                    <DraggableCard
                      key={kind.id}
                      cardProps={{
                        title: `${kind.firstName} ${kind.lastName}`,
                      }}
                      draggableId={kind.id}
                      draggableData={kind}
                    ></DraggableCard>
                  ))}
                </DroppableCard>
              ))
            }
            {/*<Card title={"Anwesenheit nicht bekannt"}>*/}
            {/*  <ul>*/}
            {/*    {tagebuchEintrag?.anwesenheitUnbekannt.map((kind) => (*/}
            {/*      <li key={kind.id}>*/}
            {/*        {kind.firstName} {kind.lastName}*/}
            {/*      </li>*/}
            {/*    ))}*/}
            {/*  </ul>*/}
            {/*</Card>*/}
            {/*<Card title={"Anwesend"}>*/}
            {/*  <ul>*/}
            {/*    {tagebuchEintrag?.anwesend.map((kind) => (*/}
            {/*      <li key={kind.id}>*/}
            {/*        {kind.firstName} {kind.lastName}*/}
            {/*      </li>*/}
            {/*    ))}*/}
            {/*  </ul>*/}
            {/*</Card>*/}
            {/*<Card title={"Krank"}>*/}
            {/*  <ul>*/}
            {/*    {tagebuchEintrag?.krank.map((kind) => (*/}
            {/*      <li key={kind.id}>*/}
            {/*        {kind.firstName} {kind.lastName}*/}
            {/*      </li>*/}
            {/*    ))}*/}
            {/*  </ul>*/}
            {/*</Card>*/}
            {/*<Card title={"Urlaub"}>*/}
            {/*  <ul>*/}
            {/*    {tagebuchEintrag?.urlaub.map((kind) => (*/}
            {/*      <li key={kind.id}>*/}
            {/*        {kind.firstName} {kind.lastName}*/}
            {/*      </li>*/}
            {/*    ))}*/}
            {/*  </ul>*/}
            {/*</Card>*/}
            {/*<Card title={"Unentschuldigt"}>*/}
            {/*  <ul>*/}
            {/*    {tagebuchEintrag?.unentschuldigt.map((kind) => (*/}
            {/*      <li key={kind.id}>*/}
            {/*        {kind.firstName} {kind.lastName}*/}
            {/*      </li>*/}
            {/*    ))}*/}
            {/*  </ul>*/}
            {/*</Card>*/}
          </DndContext>
        </div>
      </Card>
    </>
  );
}
