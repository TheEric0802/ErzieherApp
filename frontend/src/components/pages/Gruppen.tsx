import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import type { gruppe } from "../../types/gruppe.ts";
import { useNavigate } from "react-router-dom";
import type { appUser } from "../../types/appUser.ts";
import { titleStyle } from "../../App.tsx";
import * as React from "react";
import Card from "../ui/Card.tsx";
import Modal, { type ModalHandle } from "../ui/Modal.tsx";

type GruppenProps = {
  appUser: appUser | null | undefined;
};

export default function Gruppen({ appUser }: GruppenProps) {
  const nav = useNavigate();
  if (!appUser) {
    nav("/");
  }
  const [gruppen, setGruppen] = useState<gruppe[]>([]);

  const editModalRefs = useRef<Record<string, ModalHandle | null>>({});

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
        editModalRefs.current[dto.id as string]?.close();
      })
      .catch((e) => {
        console.error(e);
        loadGruppen();
      });
  }

  function deleteGruppe(id: string) {
    axios
      .delete<gruppe>(`api/gruppe/${id}`)
      .then(() => loadGruppen())
      .catch((e) => {
        console.error(e);
        loadGruppen();
      });
  }

  const getDatum: () => string = () =>
    new Date(Date.now() - new Date(Date.now()).getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .split("T")[0];

  return (
    <>
      <h1 className={titleStyle}>Gruppen</h1>
      <div className={"flex flex-row flex-wrap gap-4"}>
        {gruppen.map((g) => (
          <Card
            title={g.name}
            key={g.id}
            actions={
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    editModalRefs.current[g.id]?.resetForm();
                    editModalRefs.current[g.id]?.show();
                  }}
                >
                  Bearbeiten
                </button>
                <Modal
                  title={"Hello!"}
                  ref={(el) => {
                    editModalRefs.current[g.id] = el;
                  }}
                  isForm={true}
                  onSubmit={updateGruppe}
                  actions={
                    <>
                      <button className="btn btn-primary">Senden</button>
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => editModalRefs.current[g.id]?.close()}
                      >
                        Abbrechen
                      </button>
                    </>
                  }
                >
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
                </Modal>
                <button
                  className={"btn btn-error"}
                  onClick={() => deleteGruppe(g.id)}
                >
                  Löschen
                </button>
                <button
                  className={"btn btn-info"}
                  onClick={() => nav(`/gruppentagebuch/${g.id}/${getDatum()}`)}
                >
                  Gruppentagebuch Heute
                </button>
                <button
                  className={"btn btn-accent"}
                  onClick={() => nav(`/gruppentagebuchUebersicht/${g.id}`)}
                >
                  Gruppentagebuch Übersicht
                </button>
              </>
            }
          />
        ))}
      </div>
    </>
  );
}
