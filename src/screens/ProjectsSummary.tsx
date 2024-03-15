import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { CLIENT_NAME, MOCK_PROJECTS_DATA } from "../mock-data/index";
import ProjectCard from "../components/ProjectCard";

const ProjectsSummary = () => {
  const [remarks, setRemarks] = React.useState("");
  const [isTracking, setIsTracking] = React.useState(false);
  const [isRemarks, setIsRemarks] = React.useState(false);
  const handleInutChange = (e: any) => {
    setRemarks(e.target.value);
  };
  return (
    <Flex
      width={"100vw"}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={"20px"}
    >
      {CLIENT_NAME.map((item: { clientId: number; client_name: string }) => {
        return (
          <Accordion defaultIndex={[0]} allowMultiple width={"100%"}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {item.client_name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {MOCK_PROJECTS_DATA.map((projectData: any) => {
                  if (projectData.id === item.clientId) {
                    return (
                      <>
                        <ProjectCard
                          setIsTracking={setIsTracking}
                          isTracking={isTracking}
                          project={projectData.project}
                          setIsRemarks={setIsRemarks}
                          isRemarks={isRemarks}
                        />
                      </>
                    );
                  }
                })}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      })}
      {!isTracking && (
        <Text as="h2" align={"center"} fontSize={"2rem"} mt="1rem">
          You have not started tracking yet
        </Text>
      )}
    </Flex>
  );
};

export default ProjectsSummary;
