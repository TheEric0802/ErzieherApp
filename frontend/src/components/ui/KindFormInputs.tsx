import type { kind } from "../../types/kind.ts";
import type { gruppe } from "../../types/gruppe.ts";

type KindFormInputsProps = {
  kind?: kind | null;
  gruppen: gruppe[];
};

export default function KindFormInputs({ kind, gruppen }: KindFormInputsProps) {
  return (
    <>
      {kind && <input name={"id"} value={kind.id} type={"hidden"} />}
      <label className="input w-full">
        <span className="label">Vorname</span>
        <input
          type="text"
          placeholder="Hier tippen ..."
          name={"firstName"}
          defaultValue={kind ? kind.firstName : ""}
        />
      </label>
      <label className="input w-full">
        <span className="label">Nachname</span>
        <input
          type="text"
          placeholder="Hier tippen ..."
          name={"lastName"}
          defaultValue={kind ? kind.lastName : ""}
        />
      </label>
      <fieldset className="fieldset flex flex-row flex-wrap gap-4">
        <legend className="fieldset-legend">Gruppe</legend>
        {gruppen.map((gruppe) => (
          <label className={"label"} key={gruppe.id}>
            <input
              type={"radio"}
              name={"gruppenId"}
              className={"checkbox"}
              value={gruppe.id}
              defaultChecked={kind ? kind.gruppe.id === gruppe.id : false}
            />
            {gruppe.name}
          </label>
        ))}
      </fieldset>
    </>
  );
}
