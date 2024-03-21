import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import AppRoutes from "./routes";
import { useEffect } from "react";
// import Data from 'json'
import { setData } from "./store/trackCardSlice";
import { MOCK_PROJECTS_DATA } from "./mock-data";
import { useDispatch } from "react-redux";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const isDataFromLocalStorage = localStorage?.getItem("trackerData");
    const dataToset = isDataFromLocalStorage
      ? isDataFromLocalStorage
      : MOCK_PROJECTS_DATA;
    dispatch(setData(dataToset));
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}
