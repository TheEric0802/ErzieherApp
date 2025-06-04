import * as React from "react";
import type { appUser } from "../../types/appUser.ts";
import { titleStyle } from "../../App.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { gruppe } from "../../types/gruppe.ts";
import Card from "../ui/Card.tsx";

type GruppeErstellenProps = {
  appUser: appUser | null | undefined;
};

export default function GruppeErstellen({ appUser }: GruppeErstellenProps) {
  const nav = useNavigate();

  if (!appUser) {
    nav("/");
  }

  function createGruppe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const dto = Object.fromEntries(formData);
    if (!dto.name) return;
    axios
      .post<gruppe>("api/gruppe", Object.fromEntries(formData))
      .then(() => nav("/gruppen"))
      .catch((e) => {
        console.error(e);
        nav("/gruppen");
      });
  }

  return (
    <>
      <h1 className={titleStyle}>Gruppe erstellen</h1>
      <div className={"flex flex-col"}>
        <Card
          title={"Neue Gruppe"}
          isForm={true}
          onSubmit={createGruppe}
          actions={<button className="btn btn-primary">Senden</button>}
        >
          <label className="input w-full">
            <span className="label">Name</span>
            <input type="text" placeholder="Hier tippen ..." name={"name"} />
          </label>
        </Card>
      </div>
    </>
  );
}
