import { ChakraProvider } from "@chakra-ui/react";
import Project from "./components/ProjectTrack";
import { theme } from "./theme";
export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Project />
    </ChakraProvider>
  );
}
