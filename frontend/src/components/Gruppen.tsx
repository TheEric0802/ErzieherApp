import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import type { gruppe } from "../types/gruppe.ts";
import { useNavigate } from "react-router-dom";
import type { appUser } from "../types/appUser.ts";
import { cardStyle, containerStyle } from "../App.tsx";

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

  return (
    <div className={containerStyle}>
      <h1 className={"text-3xl"}>Gruppen</h1>
      <div className={"flex flex-col gap-2"}>
        {gruppen.map((g) => (
          <div className={cardStyle} key={g.id}>
            <p>{g.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
