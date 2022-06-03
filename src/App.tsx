import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import {
  useColorScheme,
  useHotkeys,
  useLocalStorageValue,
} from "@mantine/hooks";
import { BrowserRouter as Router } from "react-router-dom";
import { createClient, Provider } from "urql";

import RoutesApp from "./routes";

const client = createClient({
  url: "http://localhost:3001/graphql",
  suspense: true,
  fetchOptions: { credentials: "include", mode: "cors" },
});

function App() {
  const preferedColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "keeper.theme",
    defaultValue: preferedColorScheme,
  });

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  function toggleColorScheme(scheme?: ColorScheme) {
    setColorScheme(scheme ?? ((prev) => (prev === "light" ? "dark" : "light")));
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ colorScheme, primaryColor: "yellow" }}
      >
        <Provider value={client}>
          <Router>
            <RoutesApp />
          </Router>
        </Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
