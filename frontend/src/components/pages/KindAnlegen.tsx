import type { appUser } from "../../types/appUser.ts";
import { titleStyle } from "../../App.tsx";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card.tsx";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import type { gruppe } from "../../types/gruppe.ts";
import * as React from "react";
import type { mitteilung } from "../../types/mitteilung.ts";
import KindFormInputs from "../ui/KindFormInputs.tsx";

type kindAnlegenProps = {
  appUser: appUser | null | undefined;
};

export default function KindAnlegen({ appUser }: kindAnlegenProps) {
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

  function createKind(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const dto = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      gruppe: gruppen.find((g) => g.id === formData.get("gruppenId")),
    };
    console.log(dto);
    if (!dto.firstName || !dto.lastName || !dto.gruppe) return;
    axios
      .post<mitteilung>("api/kind", dto)
      .then(() => nav("/kinder"))
      .catch((e) => {
        console.error(e);
        nav("/kinder");
      });
  }

  return (
    <>
      <h1 className={titleStyle}>Kind anlegen</h1>
      <div className={"flex flex-col"}>
        <Card
          title={"Neues Kind"}
          isForm={true}
          onSubmit={createKind}
          actions={<button className="btn btn-primary">Senden</button>}
        >
          <KindFormInputs gruppen={gruppen} />
        </Card>
      </div>
    </>
  );
}
