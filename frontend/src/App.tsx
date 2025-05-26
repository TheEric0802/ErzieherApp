import "./App.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import type { appUser } from "./types/appUser.ts";
import Header from "./components/Header.tsx";
import Mitteilungen from "./components/Mitteilungen.tsx";

function App() {
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
      <Header appUser={appUser} />
      <Mitteilungen appUser={appUser} />
    </>
  );
}

export default App;
