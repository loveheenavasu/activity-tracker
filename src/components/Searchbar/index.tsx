import React from "react";
import { Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { debounce } from "lodash";
import { IoSearch } from "react-icons/io5";

export const SearchBar = ({ setSearch }: any) => {
  const handleInputChangeDebounced = debounce((value) => {
    console.log("value", value);
    setSearch(value);
  }, 500);
  React.useEffect(() => {
    return () => {
      handleInputChangeDebounced.cancel();
    };
  }, []);
  return (
    <>
      <Stack width={"100%"} position={"relative"}>
        <InputGroup borderRadius={5} size="sm">
          <InputLeftElement
            pointerEvents="none"
            children={<IoSearch color="gray.600" />}
          />
          <Input
            type="text"
            placeholder="Search projects"
            border="1px solid #949494"
            focusBorderColor="#949494"
            borderRadius={"8px"}
            onChange={(e) => handleInputChangeDebounced(e.target.value)}
          />
        </InputGroup>
      </Stack>
    </>
  );
};
