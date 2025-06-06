import "./App.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import type { appUser } from "./types/appUser.ts";
import Header from "./components/Header.tsx";
import Mitteilungen from "./components/pages/Mitteilungen.tsx";
import { Route, Routes } from "react-router-dom";
import Gruppen from "./components/pages/Gruppen.tsx";
import GruppeErstellen from "./components/pages/GruppeErstellen.tsx";
import Kinder from "./components/pages/Kinder.tsx";
import KindAnlegen from "./components/pages/KindAnlegen.tsx";

export const containerStyle = " container mx-auto px-4";
export const titleStyle = " text-3xl my-2 font-semibold";

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
      <div className={containerStyle}>
        <Routes>
          <Route path="/" element={<Mitteilungen appUser={appUser} />} />
          <Route path="/gruppen" element={<Gruppen appUser={appUser} />} />
          <Route
            path="/neueGruppe"
            element={<GruppeErstellen appUser={appUser} />}
          />
          <Route path="/kinder" element={<Kinder appUser={appUser} />} />
          <Route
            path="/neuesKind"
            element={<KindAnlegen appUser={appUser} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
