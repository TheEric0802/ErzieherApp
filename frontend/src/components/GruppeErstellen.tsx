import * as React from "react";
import type { appUser } from "../types/appUser.ts";
import { cardStyle, containerStyle } from "../App.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { gruppe } from "../types/gruppe.ts";

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
      .catch((e) => console.error(e));
  }

  return (
    <div className={containerStyle}>
      <div className={cardStyle}>
        <div className={"card-body"}>
          <div className={"card-title"}>
            <h2>Neue Gruppe</h2>
          </div>
          <form onSubmit={createGruppe}>
            <label className="input w-full">
              <span className="label">Name</span>
              <input type="text" placeholder="Hier tippen ..." name={"name"} />
            </label>
            <button className="btn btn-primary">Senden</button>
          </form>
        </div>
      </div>
    </div>
  );
}
