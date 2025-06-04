import type { mitteilung } from "../../types/mitteilung.ts";
import type { gruppe } from "../../types/gruppe.ts";

type MitteilungFormInputsProps = {
  mitteilung?: mitteilung | null;
  gruppen: gruppe[];
};

export default function MitteilungFormInputs({
  mitteilung = null,
  gruppen,
}: MitteilungFormInputsProps) {
  return (
    <>
      {mitteilung && (
        <input name={"id"} value={mitteilung.id} type={"hidden"} />
      )}
      <label className="input w-full">
        <span className="label">Titel</span>
        <input
          type="text"
          placeholder="Hier tippen ..."
          name={"title"}
          defaultValue={mitteilung ? mitteilung.title : ""}
        />
      </label>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Inhalt</legend>
        <textarea
          className="textarea h-24 w-full"
          placeholder="Inhalt"
          name={"content"}
          defaultValue={mitteilung ? mitteilung.content : ""}
        />
      </fieldset>
      <fieldset className="fieldset flex flex-row flex-wrap gap-4">
        <legend className="fieldset-legend">Gruppen</legend>
        {gruppen.map((gruppe) => (
          <label className={"label"} key={gruppe.id}>
            <input
              type={"checkbox"}
              name={"gruppenIds"}
              className={"checkbox"}
              value={gruppe.id}
              defaultChecked={
                mitteilung ? mitteilung.gruppenIds?.includes(gruppe.id) : false
              }
            />
            {gruppe.name}
          </label>
        ))}
      </fieldset>
    </>
  );
}
