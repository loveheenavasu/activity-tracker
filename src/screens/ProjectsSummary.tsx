import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { CLIENT_NAME } from "../mock-data/index";
import { IoSettingsOutline } from "react-icons/io5";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/Searchbar";
import { useSelector } from "react-redux";
const ProjectsSummary = () => {
  const navigate = useNavigate();
  const userDataFromLocalStorage = useSelector((state: any) => state.user);
  const [remarks, setRemarks] = React.useState("");
  const [search, setSearch] = React.useState("");
  const toast = useToast();
  const userEmail = localStorage.getItem("userEmail") || "";
  const [isTracking, setIsTracking] = React.useState(false);
  const [projectTClientrackId, setProjectClientTrackId] = React.useState({
    clientTrackId: null,
    clientProjectTrackId: null,
  });
  const [isRemarks, setIsRemarks] = React.useState(false);
  const projectsBySearchingClient = userDataFromLocalStorage.filter(
    (client: any) => {
      return (
        client.clientName.toLowerCase().includes(search.toLowerCase()) ||
        client.clientName.toLowerCase().startsWith(search.toLowerCase()) ||
        client.clientName.toLowerCase().endsWith(search.toLowerCase())
      );
    }
  );
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
    <Box position={"relative"} minH={"100vh"}>
      <Stack
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
          CLIENT_NAME.map((item: { clientId: number; clientName: string }) => {
            return (
              <Accordion
                allowMultiple
                width={"100%"}
                mt="2"
                _last={{ marginBottom: "20" }}
                key={item.clientId}
              >
                <AccordionItem
                  borderWidth="0.063rem"
                  borderRadius={"8px"}
                  key={item.clientId}
                >
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {item.clientName}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {userDataFromLocalStorage.map((projectData: any) => {
                      if (projectData.clientID === item.clientId) {
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
            <AccordionItem borderWidth="0.063rem" borderRadius={"8px"}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {projectsBySearchingClient[0]?.clientName}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                {projectsBySearchingClient.map((project: any) => {
                  return (
                    <ProjectCard
                      clientId={project.clientID}
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
        {/* {!isTracking && projectsBySearchingClient.length > 0 && (
          <Text
            as="h4"
            align={"center"}
            fontSize={"1.25rem"}
            mt="1rem"
            mb="auto"
          >
            You have not started tracking yet
          </Text>
        )} */}
      </Stack>

      <Stack
        position={"absolute"}
        bottom={0}
        justifyContent={"space-between"}
        alignSelf={"end"}
        left={2}
      >
        <Divider width={"100vw"} />
        <HStack>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  px={5}
                  py={2}
                  transition="all 0.2s"
                  bg={"none"}
                  _hover={{ bg: "none" }}
                  _expanded={{ bg: "none" }}
                  _focus={{ boxShadow: "none" }}
                  cursor="pointer"
                >
                  <IconButton
                    icon={<IoSettingsOutline />}
                    aria-label={"back-button"}
                    bg="none"
                    _hover={{ background: "none" }}
                  />
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem>Advance settings</MenuItem>
                    <MenuItem onClick={() => backNavigationHandler()}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Portal>
              </>
            )}
          </Menu>
          <Text color={"#2F363F"}>{userEmail}</Text>
        </HStack>
      </Stack>
    </Box>
  );
};

export default ProjectsSummary;
