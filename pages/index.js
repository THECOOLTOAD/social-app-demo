import { useState, useEffect } from "react";
import { AppShell, LoadingOverlay } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import Honeys from "../components/Honeys/Honeys";
import CreateHoney from "../components/Honeys/CreateHoney";
import HeaderSearch from "../components/Header/HeaderSearch";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [honeys, setHoneys] = useState([]);
  const [page, setPage] = useState("Home");

  useEffect(() => {
    (async () => {
      const getHoneys = await fetch("/api/honey");
      const getHoneysJson = await getHoneys.json();
      setHoneys(getHoneysJson);

      setIsLoading(false);
    })();
  }, []);
  console.log(honeys)
  return (
    <AppShell
      header={<HeaderSearch />}
      navbar={<Navbar page={page} setPage={setPage} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <LoadingOverlay visible={isLoading} />
      <CreateHoney setHoneys={setHoneys} />
      <Honeys honeys={honeys} sethoneys={setHoneys} />
    </AppShell>
  );
}
