import { ChakraProvider } from "@chakra-ui/react";
import Project from "./components/ProjectTrack";
import { theme } from "./theme";
import Login from "./screens/Login";
import AppRoutes from "./routes";
export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}
