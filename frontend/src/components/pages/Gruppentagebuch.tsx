import type { appUser } from "../../types/appUser.ts";
import { titleStyle } from "../../App.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "../ui/Card.tsx";
import type { tagebuchEintrag } from "../../types/tagebuchEintrag.ts";

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
          <Card title={"Anwesenheit nicht bekannt"}>
            <ul>
              {tagebuchEintrag?.anwesenheitUnbekannt.map((kind) => (
                <li key={kind.id}>
                  {kind.firstName} {kind.lastName}
                </li>
              ))}
            </ul>
          </Card>
          <Card title={"Anwesend"}>
            <ul>
              {tagebuchEintrag?.anwesend.map((kind) => (
                <li key={kind.id}>
                  {kind.firstName} {kind.lastName}
                </li>
              ))}
            </ul>
          </Card>
          <Card title={"Krank"}>
            <ul>
              {tagebuchEintrag?.krank.map((kind) => (
                <li key={kind.id}>
                  {kind.firstName} {kind.lastName}
                </li>
              ))}
            </ul>
          </Card>
          <Card title={"Urlaub"}>
            <ul>
              {tagebuchEintrag?.urlaub.map((kind) => (
                <li key={kind.id}>
                  {kind.firstName} {kind.lastName}
                </li>
              ))}
            </ul>
          </Card>
          <Card title={"Unentschuldigt"}>
            <ul>
              {tagebuchEintrag?.unentschuldigt.map((kind) => (
                <li key={kind.id}>
                  {kind.firstName} {kind.lastName}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Card>
    </>
  );
}
