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
import { RelayEnvironmentProvider } from "react-relay/hooks";

import RoutesApp from "./routes";
import RelayEnvironment from "$lib/services/environment";

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
        <RelayEnvironmentProvider environment={RelayEnvironment}>
          <Router>
            <RoutesApp />
          </Router>
        </RelayEnvironmentProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
