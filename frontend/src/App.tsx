import "./App.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import type { appUser } from "./types/appUser.ts";

function App() {
  const host: string =
    window.location.host === "localhost:5173"
      ? "http://localhost:8080"
      : window.location.origin;

  const [appUser, setAppUser] = useState<appUser | null | undefined>(undefined);

  const loadUser = useCallback(() => {
    axios
      .get<appUser>("api/auth")
      .then((r) => {
        if (r.data.username) {
          setAppUser(r.data);
        } else {
          setAppUser(null);
        }
      })
      .catch(() => setAppUser(null));
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <>
      {appUser ? (
        <>
          <p>Logged in as {appUser.username}</p>
          <button onClick={() => window.open(host + "/logout", "_self")}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>Not logged in</p>
          <button
            onClick={() =>
              window.open(host + "/oauth2/authorization/authentik", "_self")
            }
          >
            Login
          </button>
        </>
      )}
    </>
  );
}

export default App;
