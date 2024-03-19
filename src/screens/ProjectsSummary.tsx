import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { CLIENT_NAME, MOCK_PROJECTS_DATA } from "../mock-data/index";
import { IoSettingsOutline } from "react-icons/io5";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/Searchbar";
const ProjectsSummary = () => {
  const [remarks, setRemarks] = React.useState("");
  const [search, setSearch] = React.useState("");
  const toast = useToast();
  const userEmail = localStorage.getItem("userEmail") || "";
  console.log("search value:", search);
  const [isTracking, setIsTracking] = React.useState(false);
  const [projectTClientrackId, setProjectClientTrackId] = React.useState({
    clientTrackId: null,
    clientProjectTrackId: null,
  });
  const [isRemarks, setIsRemarks] = React.useState(false);
  const navigate = useNavigate();
  const projectsBySearchingClient = MOCK_PROJECTS_DATA.filter((client) => {
    return (
      client.clientName.toLowerCase().includes(search.toLowerCase()) ||
      client.clientName.toLowerCase().startsWith(search.toLowerCase()) ||
      client.clientName.toLowerCase().endsWith(search.toLowerCase())
    );
  });
  console.log("projectBySearching", projectsBySearchingClient);
  const handleInutChange = (e: any) => {
    setRemarks(e.target.value);
  };
  const backNavigationHandler = () => {
    if (projectTClientrackId.clientProjectTrackId === null) {
      navigate("/");
      localStorage.removeItem("userEmail");
      return;
    } else {
      toast({
        position: "top-right",
        description: "You need to stop tracker first to go back.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Box h={"100vh"}>
      <Flex
        width={"100vw"}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={"20px"}
      >
        <HStack width={"100%"} justifyContent={"space-between"}>
          <SearchBar setSearch={setSearch} />
        </HStack>
        {search.length === 0 ? (
          CLIENT_NAME.map((item: { clientId: number; client_name: string }) => {
            return (
              <Accordion allowMultiple width={"100%"} mt="5">
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
                              clientId={item.clientId}
                              projectClientrackId={projectTClientrackId}
                              setProjectClientTrackId={setProjectClientTrackId}
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
          })
        ) : projectsBySearchingClient.length > 0 ? (
          <Accordion allowMultiple width={"100%"} mt="10">
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {projectsBySearchingClient[0]?.clientName}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {projectsBySearchingClient.map((project) => {
                  return (
                    <ProjectCard
                      clientId={project.id}
                      projectClientrackId={projectTClientrackId}
                      setProjectClientTrackId={setProjectClientTrackId}
                      setIsTracking={setIsTracking}
                      isTracking={isTracking}
                      project={project.project}
                      setIsRemarks={setIsRemarks}
                      isRemarks={isRemarks}
                    />
                  );
                })}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ) : (
          <Text as="h3" align={"center"} fontSize={"2rem"} mt="1rem">
            No Client Found
          </Text>
        )}
        {!isTracking && projectsBySearchingClient.length > 0 && (
          <Text as="h4" align={"center"} fontSize={"1.25rem"} mt="1rem">
            You have not started tracking yet
          </Text>
        )}
      </Flex>
      <HStack position={"absolute"} bottom={0} justifyContent={"space-between"}>
        <IconButton
          icon={<IoSettingsOutline />}
          aria-label={"back-button"}
          bg="none"
          _hover={{ background: "none" }}
          onClick={() => backNavigationHandler()}
        />
        <Text>{userEmail}</Text>
      </HStack>
    </Box>
  );
};

export default ProjectsSummary;
