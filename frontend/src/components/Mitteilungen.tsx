import type { appUser } from "../types/appUser.ts";
import { useCallback, useEffect, useState } from "react";
import type { mitteilung } from "../types/mitteilung.ts";
import axios from "axios";
import * as React from "react";
import { cardStyle, titleStyle } from "../App.tsx";
import type { gruppe } from "../types/gruppe.ts";

type MitteilungenProps = {
  appUser: appUser | null | undefined;
};

export default function Mitteilungen({ appUser }: MitteilungenProps) {
  const [mitteilungen, setMitteilungen] = useState<mitteilung[]>([]);
  const [gruppen, setGruppen] = useState<gruppe[]>([]);

  const loadMitteilungen = useCallback(() => {
    axios
      .get<mitteilung[]>("api/mitteilung")
      .then((r) => setMitteilungen(r.data));
  }, []);

  const loadGruppen = useCallback(() => {
    axios
      .get<gruppe[]>("api/gruppe")
      .then((r) => setGruppen(r.data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    loadMitteilungen();
    loadGruppen();
  }, [loadMitteilungen, loadGruppen]);

  function createMitteilung(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const dto = {
      title: formData.get("title"),
      content: formData.get("content"),
      gruppenIds: formData.getAll("gruppenIds"),
    };
    if (!dto.title || !dto.content) return;
    axios
      .post<mitteilung>("api/mitteilung", dto)
      .then(() => loadMitteilungen())
      .catch((e) => console.error(e));
  }

  function updateMitteilung(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const dto = Object.fromEntries(formData);
    if (!dto.title || !dto.content) return;
    axios
      .put<mitteilung>(`api/mitteilung/${dto.id}`, Object.fromEntries(formData))
      .then(() => {
        loadMitteilungen();
        (
          document.getElementById(`edit_modal_${dto.id}`)! as HTMLDialogElement
        ).close();
      })
      .catch((e) => console.error(e));
  }

  function deleteMitteilung(id: string) {
    axios
      .delete("api/mitteilung/" + id)
      .then(() => loadMitteilungen())
      .catch((e) => console.error(e));
  }

  return (
    <>
      <h1 className={titleStyle}>Mitteilungen</h1>
      <div className={"flex flex-col-reverse"}>
        {mitteilungen.map((mitteilung) => (
          <div className={cardStyle} key={mitteilung.id}>
            <div className={"card-body"}>
              <div className={"card-title"}>
                <h2>{mitteilung.title}</h2>
              </div>
              {mitteilung.gruppenIds ? (
                <div className={"flex flex-row flex-wrap gap-2"}>
                  {mitteilung.gruppenIds.map((id) => (
                    <div
                      className={"badge badge-accent"}
                      key={mitteilung.id + id}
                    >
                      {gruppen.find((g) => g.id === id)?.name}
                    </div>
                  ))}
                </div>
              ) : null}
              <p className={"whitespace-pre-wrap"}>{mitteilung.content}</p>
              {appUser ? (
                <div className={"card-actions"}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      (
                        document.getElementById(
                          `edit_form_${mitteilung.id}`,
                        )! as HTMLFormElement
                      ).reset();
                      (
                        document.getElementById(
                          `edit_modal_${mitteilung.id}`,
                        )! as HTMLDialogElement
                      ).showModal();
                    }}
                  >
                    Bearbeiten
                  </button>
                  <dialog id={`edit_modal_${mitteilung.id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Hello!</h3>
                      <p className="py-4">
                        Press ESC key or click the button below to close
                        edit_modal_{mitteilung.id}
                      </p>
                      <form
                        onSubmit={updateMitteilung}
                        id={`edit_form_${mitteilung.id}`}
                      >
                        <input
                          name={"id"}
                          value={mitteilung.id}
                          type={"hidden"}
                        />
                        <label className="input w-full">
                          <span className="label">Titel</span>
                          <input
                            type="text"
                            placeholder="Hier tippen ..."
                            name={"title"}
                            defaultValue={mitteilung.title}
                          />
                        </label>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">Inhalt</legend>
                          <textarea
                            className="textarea h-24 w-full"
                            placeholder="Inhalt"
                            name={"content"}
                            defaultValue={mitteilung.content}
                          />
                        </fieldset>
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
                    type={"button"}
                    onClick={() => deleteMitteilung(mitteilung.id)}
                  >
                    Löschen
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
        {appUser ? (
          <div className={cardStyle}>
            <form onSubmit={createMitteilung} className={"card-body"}>
              <div className={"card-title"}>
                <h2>Neue Mitteilung</h2>
              </div>
              <label className="input w-full">
                <span className="label">Titel</span>
                <input
                  type="text"
                  placeholder="Hier tippen ..."
                  name={"title"}
                />
              </label>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Inhalt</legend>
                <textarea
                  className="textarea h-24 w-full"
                  placeholder="Inhalt"
                  name={"content"}
                ></textarea>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gruppen</legend>
                {gruppen.map((gruppe) => (
                  <label className={"label"} key={gruppe.id}>
                    <input
                      type={"checkbox"}
                      name={"gruppenIds"}
                      className={"checkbox"}
                      value={gruppe.id}
                    />
                    {gruppe.name}
                  </label>
                ))}
              </fieldset>
              <div className={"card-actions"}>
                <button className="btn btn-primary">Senden</button>
              </div>
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
