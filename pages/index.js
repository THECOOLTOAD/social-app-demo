import { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useSetUser } from "../context/UserContext";
import { AppShell, LoadingOverlay } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import Honeys from "../components/Honeys/Honeys";
import CreateHoney from "../components/Honeys/CreateHoney";
import HeaderSearch from "../components/Header/HeaderSearch";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [flutters, setHoneys] = useState([]);
  const [page, setPage] = useState("Home");
  const setUser = useSetUser();

  useEffect(() => {
    (async () => {
      const getUser = await fetch("/api/user");
      const getUserJson = await getUser.json();
      setUser(getUserJson);

      const getHoneys = await fetch("/api/flutter");
      const getHoneysJson = await getHoneys.json();
      setHoneys(getHoneysJson);

      setIsLoading(false);
    })();
  }, []);

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
      <Honeys flutters={flutters} setHoneys={setHoneys} />
    </AppShell>
  );
}

export const getServerSideProps = withPageAuthRequired();
