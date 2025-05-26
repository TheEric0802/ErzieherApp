import type { appUser } from "../types/appUser.ts";
import { useCallback, useEffect, useState } from "react";
import type { mitteilung } from "../types/mitteilung.ts";
import axios from "axios";

type MitteilungenProps = {
  appUser: appUser | null | undefined;
};

export default function Mitteilungen({ appUser }: MitteilungenProps) {
  const [mitteilungen, setMitteilungen] = useState<mitteilung[]>([]);

  const loadMitteilungen = useCallback(() => {
    axios
      .get<mitteilung[]>("api/mitteilung")
      .then((r) => setMitteilungen(r.data));
  }, []);

  useEffect(() => {
    loadMitteilungen();
  }, [loadMitteilungen]);

  return (
    <div className={"container mx-auto px-4 flex flex-col-reverse"}>
      {mitteilungen.map((mitteilung) => (
        <div
          className={"card card-border bg-base-100 w-full shadow-sm my-2"}
          key={mitteilung.id}
        >
          <div className={"card-body"}>
            <div className={"card-title"}>
              <h2>{mitteilung.title}</h2>
            </div>
            <p className={"whitespace-pre-wrap"}>{mitteilung.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
