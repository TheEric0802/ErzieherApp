import type { appUser } from "../types/appUser.ts";
import { useNavigate } from "react-router-dom";
import { containerStyle } from "../App.tsx";
import { useRef } from "react";

type HeaderProps = {
  appUser: appUser | null | undefined;
};

export default function Header({ appUser }: HeaderProps) {
  const nav = useNavigate();

  const host: string =
    window.location.host === "localhost:5173"
      ? "http://localhost:8080"
      : window.location.origin;

  const sidebarCheckbox = useRef<HTMLInputElement>(null);

  function sidebarNav(dest: string) {
    nav(dest);
    if (sidebarCheckbox.current) sidebarCheckbox.current.checked = false;
  }

  return (
    <>
      <div className={"navbar bg-base-100 shadow-sm"}>
        <div className={"flex" + containerStyle}>
          <div className={"navbar-start"}>
            {appUser && (
              <>
                <input
                  id="sidebar"
                  type="checkbox"
                  className="drawer-toggle"
                  ref={sidebarCheckbox}
                />
                <div className="flex-none md:hidden">
                  <label
                    htmlFor="sidebar"
                    aria-label="open sidebar"
                    className="btn btn-square btn-primary mr-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-6 w-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="sidebar"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    <li>
                      <button onClick={() => sidebarNav("/")}>
                        Mitteilungen
                      </button>
                    </li>
                    <li>
                      <button onClick={() => sidebarNav("/gruppen")}>
                        Gruppen
                      </button>
                    </li>
                    <li>
                      <button onClick={() => sidebarNav("/kinder")}>
                        Kinder
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
            <p className={"text-xl"}>ErzieherApp</p>
          </div>
          {appUser ? (
            <div className={"join navbar-center hidden md:flex"}>
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
                      <button onClick={() => nav("/neuesKind")}>
                        Neues Kind anlegen
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
