import { useState } from "react";
import Home from "./components/home/home";
import Hero from "./components/hero/hero";

function App() {
  const [page, setPage] = useState("login");

  if (page === "dashboard") {
    return <Home />;
  }

  return <Hero onEnterDashboard={() => setPage("dashboard")} />;
}

export default App;
