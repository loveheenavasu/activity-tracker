import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { CLIENT_NAME, MOCK_PROJECTS_DATA } from "../mock-data/index";
import { PROJECT } from "../types/project";
import ProjectCard from "../components/ProjectCard";

const ProjectsSummary = () => {
  const [remarks, setRemarks] = React.useState("");
  const [clientName, setClientName] = React.useState("");
  const [isRemarks, setIsRemarks] = React.useState(false);
  const CLIENT_PROJECTS = MOCK_PROJECTS_DATA.filter((client: any) =>
    client.clientName === clientName ? client.project : ""
  );
  const handleInutChange = (e: any) => {
    setRemarks(e.target.value);
  };
  const selectClientHandler = (e: any) => {
    setClientName(e.target.value);
  };
  return (
    <Flex
      width={"100vw"}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={"20px"}
    >
      <Accordion defaultIndex={[0]} allowMultiple width={"100%"}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Client Name
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Select placeholder="Select Client" onChange={selectClientHandler}>
              {CLIENT_NAME.map((item: string) => {
                return <option value={item}>{item}</option>;
              })}
            </Select>
          </AccordionPanel>
          {clientName ? (
            <Stack padding="20px">
              <ProjectCard
                project={CLIENT_PROJECTS[0]?.project}
                setIsRemarks={setIsRemarks}
                isRemarks={isRemarks}
              />
            </Stack>
          ) : (
            <Text as="h2" align={"center"} fontSize={"2rem"}>
              {" "}
              No client selected to show projects
            </Text>
          )}
          {isRemarks && (
            <Textarea
              value={remarks}
              onChange={handleInutChange}
              placeholder="Enter Remarks Here"
              size="sm"
              mt="5"
              resize={"none"}
            />
          )}
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default ProjectsSummary;
