import type { appUser } from "../../types/appUser.ts";
import { useCallback, useEffect, useState } from "react";
import type { kind } from "../../types/kind.ts";
import { titleStyle } from "../../App.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../ui/Card.tsx";

type kinderProps = {
  appUser: appUser | null | undefined;
};

export default function Kinder({ appUser }: kinderProps) {
  const nav = useNavigate();
  if (!appUser) {
    nav("/");
  }

  const loadKinder = useCallback(() => {
    axios
      .get<kind[]>("api/kind")
      .then((r) => setKinder(r.data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    loadKinder();
  }, [loadKinder]);

  const [kinder, setKinder] = useState<kind[]>([]);

  return (
    <>
      <h1 className={titleStyle}>Kinder</h1>
      <div className={"flex flex-row flex-wrap gap-4"}>
        {kinder.map((kind) => (
          <Card
            title={`${kind.firstName} ${kind.lastName}`}
            badges={[kind.gruppe.name]}
            key={kind.id}
          />
        ))}
      </div>
    </>
  );
}
