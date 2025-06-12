import { useNavigate, useParams } from "react-router-dom";
import type { appUser } from "../../types/appUser.ts";
import { useCallback, useEffect, useState } from "react";
import type { gruppe } from "../../types/gruppe.ts";
import axios from "axios";
import { titleStyle } from "../../App.tsx";
import type { tagebuchEintrag } from "../../types/tagebuchEintrag.ts";
import Card from "../ui/Card.tsx";

type GruppentagebuchUebersichtParams = {
  appUser: appUser | null | undefined;
};

export default function GruppentagebuchUebersicht({
  appUser,
}: GruppentagebuchUebersichtParams) {
  const nav = useNavigate();

  if (!appUser) {
    nav("/");
  }

  const { gruppenId } = useParams();

  const [gruppe, setGruppe] = useState<gruppe>();
  const [tagebuchEintraege, setTagebuchEintraege] = useState<tagebuchEintrag[]>(
    [],
  );

  const loadGruppe = useCallback(() => {
    axios
      .get<gruppe>(`/api/gruppe/${gruppenId}`)
      .then((r) => {
        setGruppe(r.data);
      })
      .catch((e) => {
        console.error(e);
        nav("/gruppen");
      });
  }, [gruppenId, nav]);

  const loadTagebuchEintraege = useCallback(() => {
    axios
      .get<tagebuchEintrag[]>(`/api/gruppentagebuch/${gruppenId}`)
      .then((r) => {
        const eintraege = r.data.map((e) => {
          return { ...e, datum: new Date(e.datum) };
        });
        setTagebuchEintraege(eintraege);
        console.log(eintraege);
      })
      .catch((e) => {
        console.error(e);
        nav("/gruppen");
      });
  }, [gruppenId, nav]);

  useEffect(() => {
    loadGruppe();
    loadTagebuchEintraege();
  }, [loadGruppe, loadTagebuchEintraege]);

  return (
    <div>
      <h1 className={titleStyle}>Gruppentagebuch Übersicht {gruppe?.name}</h1>
      <div className={"flex flex-col-reverse"}>
        {tagebuchEintraege.map((tagebuchEintrag) => (
          <Card
            title={tagebuchEintrag.datum.toLocaleDateString()}
            key={tagebuchEintrag.id}
          >
            <p>{tagebuchEintrag.eintrag}</p>
            <div className={"flex flex-row flex-wrap gap-4"}>
              <Card title={"Anwesenheit nicht bekannt"}>
                <ul>
                  {tagebuchEintrag.anwesenheitUnbekannt.map((kind) => (
                    <li key={kind.id}>
                      {kind.firstName} {kind.lastName}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card title={"Anwesend"}>
                <ul>
                  {tagebuchEintrag.anwesend.map((kind) => (
                    <li key={kind.id}>
                      {kind.firstName} {kind.lastName}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card title={"Krank"}>
                <ul>
                  {tagebuchEintrag.krank.map((kind) => (
                    <li key={kind.id}>
                      {kind.firstName} {kind.lastName}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card title={"Urlaub"}>
                <ul>
                  {tagebuchEintrag.urlaub.map((kind) => (
                    <li key={kind.id}>
                      {kind.firstName} {kind.lastName}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card title={"Unentschuldigt"}>
                <ul>
                  {tagebuchEintrag.unentschuldigt.map((kind) => (
                    <li key={kind.id}>
                      {kind.firstName} {kind.lastName}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
