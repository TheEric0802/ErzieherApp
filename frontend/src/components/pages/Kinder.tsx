import type { appUser } from "../../types/appUser.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import type { kind } from "../../types/kind.ts";
import { titleStyle } from "../../App.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../ui/Card.tsx";
import type { gruppe } from "../../types/gruppe.ts";
import Modal, { type ModalHandle } from "../ui/Modal.tsx";
import * as React from "react";
import KindFormInputs from "../ui/KindFormInputs.tsx";
import type { mitteilung } from "../../types/mitteilung.ts";

type kinderProps = {
  appUser: appUser | null | undefined;
};

export default function Kinder({ appUser }: kinderProps) {
  const nav = useNavigate();
  if (!appUser) {
    nav("/");
  }

  const [kinder, setKinder] = useState<kind[]>([]);
  const [gruppen, setGruppen] = useState<gruppe[]>([]);

  const editModalRefs = useRef<Record<string, ModalHandle | null>>({});

  const loadKinder = useCallback(() => {
    axios
      .get<kind[]>("api/kind")
      .then((r) => setKinder(r.data))
      .catch((e) => console.error(e));
  }, []);

  const loadGruppen = useCallback(() => {
    axios
      .get<gruppe[]>("api/gruppe")
      .then((r) => setGruppen(r.data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    loadKinder();
    loadGruppen();
  }, [loadKinder, loadGruppen]);

  function updateKind(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const dto = {
      id: formData.get("id"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      gruppe: gruppen.find((g) => g.id === formData.get("gruppenId")),
    };
    console.log(dto);
    if (!dto.firstName || !dto.lastName || !dto.gruppe) return;
    axios
      .put<mitteilung>(`api/kind/${dto.id}`, dto)
      .then(() => {
        loadKinder();
        editModalRefs.current[dto.id as string]?.close();
      })
      .catch((e) => {
        console.error(e);
        loadKinder();
      });
  }

  function deleteKind(id: string) {
    axios
      .delete<gruppe>(`api/kind/${id}`)
      .then(() => loadKinder())
      .catch((e) => {
        console.error(e);
        loadKinder();
      });
  }

  return (
    <>
      <h1 className={titleStyle}>Kinder</h1>
      <div className={"flex flex-row flex-wrap gap-4"}>
        {kinder.map((kind) => (
          <Card
            title={`${kind.firstName} ${kind.lastName}`}
            badges={[kind.gruppe.name]}
            key={kind.id}
            actions={
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    editModalRefs.current[kind.id]?.resetForm();
                    editModalRefs.current[kind.id]?.show();
                  }}
                >
                  Bearbeiten
                </button>
                <Modal
                  title={"Hello!"}
                  ref={(el) => {
                    editModalRefs.current[kind.id] = el;
                  }}
                  isForm={true}
                  onSubmit={updateKind}
                  actions={
                    <>
                      <button className="btn btn-primary">Senden</button>
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => editModalRefs.current[kind.id]?.close()}
                      >
                        Abbrechen
                      </button>
                    </>
                  }
                >
                  <KindFormInputs gruppen={gruppen} kind={kind} />
                </Modal>
                <button
                  className={"btn btn-error"}
                  onClick={() => deleteKind(kind.id)}
                >
                  Löschen
                </button>
              </>
            }
          />
        ))}
      </div>
    </>
  );
}
