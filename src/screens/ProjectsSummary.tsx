import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { CLIENT_NAME, MOCK_PROJECTS_DATA } from "../mock-data/index";
import ProjectCard from "../components/ProjectCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const ProjectsSummary = () => {
  const [remarks, setRemarks] = React.useState("");
  const toast = useToast();
  const [isTracking, setIsTracking] = React.useState(false);
  const [projectTClientrackId, setProjectClientTrackId] = React.useState({
    clientTrackId: null,
    clientProjectTrackId: null,
  });
  const [isRemarks, setIsRemarks] = React.useState(false);
  const navigate = useNavigate();
  const handleInutChange = (e: any) => {
    setRemarks(e.target.value);
  };
  const backNavigationHandler = () => {
    if (projectTClientrackId.clientProjectTrackId === null) {
      navigate("/");
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
    <Flex
      width={"100vw"}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={"20px"}
    >
      <Icon
        as={IoMdArrowRoundBack}
        position={"absolute"}
        left={5}
        top={6}
        onClick={() => backNavigationHandler()}
      />
      {CLIENT_NAME.map((item: { clientId: number; client_name: string }) => {
        return (
          <Accordion defaultIndex={[0]} allowMultiple width={"100%"} mt="10">
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
