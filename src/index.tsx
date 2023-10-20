import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import Header from "./components/Header.js";
import Home from "./pages/Home/index.jsx";
import NotFound from "./pages/notFound/index.js";

export function App() {
  return (
    <LocationProvider>
      <Header />
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
