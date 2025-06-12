import type { gruppe } from "./gruppe.ts";
import type { kind } from "./kind.ts";

export type tagebuchEintrag = {
  id: string;
  gruppe: gruppe;
  datum: Date;
  eintrag: string;
  anwesenheitUnbekannt: kind[];
  anwesend: kind[];
  krank: kind[];
  urlaub: kind[];
  unentschuldigt: kind[];
};
