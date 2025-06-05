import type { appUser } from "../types/appUser.ts";
import { useNavigate } from "react-router-dom";
import { containerStyle } from "../App.tsx";

type HeaderProps = {
  appUser: appUser | null | undefined;
};

export default function Header({ appUser }: HeaderProps) {
  const nav = useNavigate();

  const host: string =
    window.location.host === "localhost:5173"
      ? "http://localhost:8080"
      : window.location.origin;

  return (
    <>
      <div className={"navbar bg-base-100 shadow-sm"}>
        <div className={"flex" + containerStyle}>
          <div className={"navbar-start"}>
            <p className={"text-xl"}>ErzieherApp</p>
          </div>
          {appUser ? (
            <div className={"join navbar-center"}>
              <button
                className={"btn btn-primary join-item"}
                onClick={() => nav("/")}
              >
                Mitteilungen
              </button>
              <button
                className={"btn btn-primary join-item"}
                onClick={() => nav("/gruppen")}
              >
                Gruppen
              </button>
              <button
                className={"btn btn-primary join-item"}
                onClick={() => nav("/kinder")}
              >
                Kinder
              </button>
            </div>
          ) : null}
          <div className={"flex gap-2 navbar-end"}>
            {appUser ? (
              <>
                <div className={"dropdown dropdown-end"}>
                  <button className={"btn btn-primary"}>
                    {appUser.username}
                  </button>
                  <ul
                    className={
                      "menu dropdown-content bg-base-100 rounded-box shadow"
                    }
                  >
                    <li>
                      <button onClick={() => nav("/neueGruppe")}>
                        Gruppe erstellen
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => window.open(host + "/logout", "_self")}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <button
                  className={"btn"}
                  onClick={() =>
                    window.open(
                      host + "/oauth2/authorization/authentik",
                      "_self",
                    )
                  }
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
