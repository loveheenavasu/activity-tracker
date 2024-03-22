import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import AppRoutes from "./routes";
import { useEffect } from "react";
import { setData } from "./store/trackCardSlice";
import { MOCK_PROJECTS_DATA } from "./mock-data";
import { useDispatch, useSelector } from "react-redux";
export default function App() {
  const dispatch = useDispatch();
  const isDataFromLocalStorage = useSelector((state: any) => state.user);
  console.log("isDataFromLocalStorage", isDataFromLocalStorage);
  useEffect(() => {
    const dataToset =
      isDataFromLocalStorage.length > 0
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
