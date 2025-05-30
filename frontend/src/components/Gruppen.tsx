import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import type { gruppe } from "../types/gruppe.ts";
import { useNavigate } from "react-router-dom";
import type { appUser } from "../types/appUser.ts";
import { cardStyle, titleStyle } from "../App.tsx";
import * as React from "react";

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

  function updateGruppe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const dto = Object.fromEntries(formData);
    if (!dto.name) return;
    axios
      .put<gruppe>(`api/gruppe/${dto.id}`, Object.fromEntries(formData))
      .then(() => {
        loadGruppen();
        (
          document.getElementById(`edit_modal_${dto.id}`)! as HTMLDialogElement
        ).close();
      })
      .catch((e) => console.error(e));
  }

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
                  className="btn btn-primary"
                  onClick={() => {
                    (
                      document.getElementById(
                        `edit_form_${g.id}`,
                      )! as HTMLFormElement
                    ).reset();
                    (
                      document.getElementById(
                        `edit_modal_${g.id}`,
                      )! as HTMLDialogElement
                    ).showModal();
                  }}
                >
                  Bearbeiten
                </button>
                <dialog id={`edit_modal_${g.id}`} className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                      Press ESC key or click the button below to close
                      edit_modal_{g.id}
                    </p>
                    <form onSubmit={updateGruppe} id={`edit_form_${g.id}`}>
                      <input name={"id"} value={g.id} type={"hidden"} />
                      <label className="input w-full">
                        <span className="label">Name</span>
                        <input
                          type="text"
                          placeholder="Hier tippen ..."
                          name={"name"}
                          defaultValue={g.name}
                        />
                      </label>
                      <div className="modal-action">
                        <button className="btn btn-primary">Senden</button>
                        <form method="dialog">
                          <button className="btn btn-secondary">
                            Abbrechen
                          </button>
                        </form>
                      </div>
                    </form>
                  </div>
                </dialog>
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
