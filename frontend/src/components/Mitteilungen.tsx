import type { appUser } from "../types/appUser.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import type { mitteilung } from "../types/mitteilung.ts";
import axios from "axios";
import * as React from "react";
import { titleStyle } from "../App.tsx";
import type { gruppe } from "../types/gruppe.ts";
import Card from "./ui/Card.tsx";
import Modal, { type ModalHandle } from "./ui/Modal.tsx";
import MitteilungFormInputs from "./ui/MitteilungFormInputs.tsx";

type MitteilungenProps = {
  appUser: appUser | null | undefined;
};

export default function Mitteilungen({ appUser }: MitteilungenProps) {
  const [mitteilungen, setMitteilungen] = useState<mitteilung[]>([]);
  const [gruppen, setGruppen] = useState<gruppe[]>([]);
  const [filterGruppe, setFilterGruppe] = useState<string>("alle");
  const filteredMitteilungen: mitteilung[] =
    filterGruppe === "alle"
      ? mitteilungen
      : mitteilungen.filter((m: mitteilung) =>
          m.gruppenIds ? m.gruppenIds.includes(filterGruppe) : false,
        );
  const [errorMitteilung, setErrorMitteilung] = useState<mitteilung | null>(
    null,
  );

  const editModalRefs = useRef<Record<string, ModalHandle | null>>({});
  const errorModalRef = useRef<ModalHandle | null>(null);

  const loadMitteilungen = useCallback(() => {
    axios
      .get<mitteilung[]>("api/mitteilung")
      .then((r) => {
        setMitteilungen(r.data);
      })
      .catch((e) => console.error(e));
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
      .then(() => {
        loadMitteilungen();
        errorModalRef.current?.close();
      })
      .catch((e) => {
        console.error(e);
        loadMitteilungen();
      })
      .finally(() => {
        setErrorMitteilung({ id: "", title: "", content: "", gruppenIds: [] });
      });
  }

  function updateMitteilung(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const dto = {
      id: formData.get("id"),
      title: formData.get("title"),
      content: formData.get("content"),
      gruppenIds: formData.getAll("gruppenIds"),
    };
    if (!dto.id || !dto.title || !dto.content) return;
    axios
      .put<mitteilung>(`api/mitteilung/${dto.id}`, dto)
      .then(() => {
        loadMitteilungen();
        editModalRefs.current[dto.id as string]?.close();
      })
      .catch((e) => {
        if (e.response.status === 404) {
          setErrorMitteilung(dto as mitteilung);
          editModalRefs.current[dto.id as string]?.close();
          errorModalRef.current?.show();
          loadMitteilungen();
        } else {
          loadMitteilungen();
          console.error(e);
        }
      });
  }

  function deleteMitteilung(id: string) {
    axios
      .delete("api/mitteilung/" + id)
      .then(() => loadMitteilungen())
      .catch((e) => {
        loadMitteilungen();
        console.error(e);
      });
  }

  return (
    <>
      <h1 className={titleStyle}>Mitteilungen</h1>
      <Modal
        title={"Hello!"}
        ref={errorModalRef}
        isForm={true}
        onSubmit={createMitteilung}
        actions={
          <>
            <button className="btn btn-primary">Ja</button>
            <button
              className="btn btn-secondary"
              type={"button"}
              onClick={() => {
                errorModalRef.current?.close();
                setErrorMitteilung({
                  id: "",
                  title: "",
                  content: "",
                  gruppenIds: [],
                });
              }}
            >
              Nein
            </button>
          </>
        }
      >
        <p className="py-4">
          Die zu ändernde Mitteilung konnte nicht gefunden werden. Möchten Sie
          die Mitteilung neu erstellen?
        </p>
        <input name={"id"} value={errorMitteilung?.id} type={"hidden"} />
        <input type="hidden" name={"title"} value={errorMitteilung?.title} />
        <input
          type="hidden"
          name={"content"}
          value={errorMitteilung?.content}
        />
        {gruppen.map((gruppe) => (
          <input
            key={gruppe.id}
            type={"checkbox"}
            name={"gruppenIds"}
            className={"hidden"}
            value={gruppe.id}
            checked={errorMitteilung?.gruppenIds?.includes(gruppe.id)}
          />
        ))}
      </Modal>
      <div className={"flex flex-col-reverse"}>
        {filteredMitteilungen.map((mitteilung) => (
          <Card
            key={mitteilung.id}
            title={mitteilung.title}
            badges={
              mitteilung.gruppenIds && gruppen.length > 0
                ? mitteilung.gruppenIds.map(
                    (id) => gruppen.find((g) => g.id === id)!.name,
                  )
                : []
            }
            actions={
              appUser ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      editModalRefs.current[mitteilung.id]?.resetForm();
                      editModalRefs.current[mitteilung.id]?.show();
                    }}
                  >
                    Bearbeiten
                  </button>
                  <Modal
                    title={"Hello!"}
                    ref={(el) => {
                      editModalRefs.current[mitteilung.id] = el;
                    }}
                    isForm={true}
                    onSubmit={updateMitteilung}
                    actions={
                      <>
                        <button className="btn btn-primary">Senden</button>
                        <button
                          type={"button"}
                          className="btn btn-secondary"
                          onClick={() =>
                            editModalRefs.current[mitteilung.id]?.close()
                          }
                        >
                          Abbrechen
                        </button>
                      </>
                    }
                  >
                    <MitteilungFormInputs
                      gruppen={gruppen}
                      mitteilung={mitteilung}
                    />
                  </Modal>

                  <button
                    className={"btn btn-error"}
                    type={"button"}
                    onClick={() => deleteMitteilung(mitteilung.id)}
                  >
                    Löschen
                  </button>
                </>
              ) : null
            }
          >
            <p className={"whitespace-pre-wrap"}>{mitteilung.content}</p>
          </Card>
        ))}
        <Card title={"Filter"}>
          <label className="select select-bordered w-full">
            <span className="label">Gruppe</span>
            <select
              onChange={(e) => setFilterGruppe(e.currentTarget.value)}
              defaultValue={"alle"}
            >
              <option value={"alle"}>Alle Gruppen</option>
              {gruppen.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>
        </Card>
        {appUser ? (
          <>
            <Card
              isForm={true}
              onSubmit={createMitteilung}
              title={"Neue Mitteilung"}
              actions={<button className="btn btn-primary">Senden</button>}
            >
              <MitteilungFormInputs gruppen={gruppen} />
            </Card>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
