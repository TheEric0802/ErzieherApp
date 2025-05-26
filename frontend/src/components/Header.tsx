import type { appUser } from "../types/appUser.ts";

type HeaderProps = {
  appUser: appUser | null | undefined;
};

export default function Header({ appUser }: HeaderProps) {
  const host: string =
    window.location.host === "localhost:5173"
      ? "http://localhost:8080"
      : window.location.origin;

  return (
    <>
      <div className={"navbar bg-base-100 shadow-sm"}>
        <div className={"container mx-auto px-4 flex"}>
          <div className={"flex-1"}>
            <p className={"text-xl"}>ErzieherApp</p>
          </div>
          <div className={"flex gap-2"}>
            {appUser ? (
              <>
                <div className={"dropdown dropdown-end"}>
                  <button className={"btn"}>{appUser.username}</button>
                  <ul
                    className={
                      "menu dropdown-content bg-base-100 rounded-box shadow"
                    }
                  >
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
