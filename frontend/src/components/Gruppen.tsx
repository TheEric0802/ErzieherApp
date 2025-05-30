import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import type { gruppe } from "../types/gruppe.ts";
import { useNavigate } from "react-router-dom";
import type { appUser } from "../types/appUser.ts";
import { cardStyle, titleStyle } from "../App.tsx";

type GruppenProps = {
  appUser: appUser | null | undefined;
};

export default function Gruppen({ appUser }: GruppenProps) {
  const nav = useNavigate();
  if (!appUser) {
    nav("/");
  }
  const [gruppen, setGruppen] = useState<gruppe[]>([]);

  const loadGruppen = useCallback(() => {
    axios
      .get<gruppe[]>("api/gruppe")
      .then((r) => setGruppen(r.data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    loadGruppen();
  }, [loadGruppen]);

  function deleteGruppe(id: string) {
    axios
      .delete<gruppe>(`api/gruppe/${id}`)
      .then(() => loadGruppen())
      .catch((e) => console.error(e));
  }

  return (
    <>
      <h1 className={titleStyle}>Gruppen</h1>
      <div className={"flex flex-col"}>
        {gruppen.map((g) => (
          <div className={cardStyle} key={g.id}>
            <div className={"card-body"}>
              <h2 className={"card-title"}>{g.name}</h2>
              <div className={"card-actions"}>
                <button
                  className={"btn btn-error"}
                  onClick={() => deleteGruppe(g.id)}
                >
                  Löschen
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
