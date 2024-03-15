import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  Divider,
  Text,
  HStack,
  Button,
  Image,
  useToast,
} from "@chakra-ui/react";
import React from "react";
interface PROJECTPROP {
  project: {
    id: number;
    name: string;
  }[];
  isRemarks: boolean;
  isTracking: boolean;
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRemarks: React.Dispatch<React.SetStateAction<boolean>>;
  projectClientrackId: any;
  setProjectClientTrackId: any;
  clientId: number;
}
let seconds = 0;
let hours = 0;
let minutes = 0;
let formatime: any;
function formatTime() {
  seconds++;
  if (seconds >= 59) {
    seconds = 0;
    minutes++;
    if (minutes >= 59) {
      minutes = 0;
      hours++;
    }
  }
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
const ProjectCard = ({
  project,
  setIsRemarks,
  isRemarks,
  setProjectClientTrackId,
  projectClientrackId,
  isTracking,
  clientId,
  setIsTracking,
}: PROJECTPROP) => {
  const [userActivity, setUserActivity] = React.useState({
    screenshot: "",
    keyboardClickCount: 0,
    mouseClickCount: 0,
  });
  const toast = useToast();
  const [timeTracked, setTimeTracked] = React.useState(formatime);
  const [intervalId, setIntervalId] = React.useState(null);
  const [timerIntervalId, setTimerIntervalId] = React.useState(null);

  const trackUserActivity = async () => {
    const activity = await window.electronAPI.getUserActivity();
    console.log(activity, "activityactivityactivityactvityactivity");
    const newPath = activity?.screenshot.split("tracker-desktop")[1];
    const userActivityWithScreenshot = {
      screenshot: newPath,
      keyboardClickCount: activity.keyboardClickCount,
      mouseClickCount: activity.mouseClickCount,
    };
    setUserActivity(userActivityWithScreenshot);
  };
  const activateTimer = (id: number, clientID: number) => {
    if (projectClientrackId.clientProjectTrackId === id) {
      clearInterval(intervalId);
      clearInterval(timerIntervalId);
      setProjectClientTrackId({
        clientTrackId: null,
        clientProjectTrackId: null,
      });
      setTimeTracked("00:00:00");
      setIsTracking(false);
      setUserActivity({
        screenshot: "",
        keyboardClickCount: 0,
        mouseClickCount: 0,
      });
    } else {
      seconds = 0;
      minutes = 0;
      hours = 0;
      setProjectClientTrackId({
        clientTrackId: clientID,
        clientProjectTrackId: id,
      });
      toast({
        position: "top-right",
        description: "Tracker started successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setIsTracking(true);
      const newIntervalId = setInterval(() => {
        trackUserActivity();
      }, 10000 * 2);
      setIntervalId(newIntervalId);

      const newTimerIntervalId = setInterval(() => {
        const newFormatime = formatTime();
        setTimeTracked(newFormatime);
      }, 1000);
      setTimerIntervalId(newTimerIntervalId);
    }
    setIsRemarks(!isRemarks);
  };

  return (
    <>
      {project?.map((project: any) => {
        return (
          <Card
            style={{
              WebkitBoxShadow: "15px 17px 5px 0px rgba(227,223,227,1)",
              boxShadow: "15px 17px 5px 0px rgba(227,223,227,1)",
              borderRadius: "5px",
              border: "1px solid #DAE0E2",
              marginBottom: "1rem",
              maxWidth: "100%",
            }}
          >
            <CardHeader>
              <HStack justifyContent={"space-between"}>
                <Heading size="md">{project.name}</Heading>
                {project.id === projectClientrackId.clientProjectTrackId && (
                  <Text align={"center"}>{timeTracked}</Text>
                )}
                (
                <Button
                  bg={"#319795"}
                  color={"#FFFFFF"}
                  _hover={{ color: "none" }}
                  size="md"
                  onClick={() => activateTimer(project.id, clientId)}
                  isDisabled={
                    projectClientrackId.clientProjectTrackId !== null &&
                    (projectClientrackId.clientProjectTrackId !== project.id ||
                      projectClientrackId.clientTrackId !== clientId)
                      ? true
                      : false
                  }
                >
                  {project.id === projectClientrackId.clientProjectTrackId
                    ? "Stop"
                    : "Track"}
                </Button>
                )
              </HStack>
            </CardHeader>
            <CardBody>
              <HStack justifyContent="space-between" width={"100%"}>
                <Stack>
                  <Heading size="xs" textTransform="uppercase">
                    Summary
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {project.summary}
                  </Text>
                </Stack>
                {project.id === projectClientrackId.clientProjectTrackId &&
                  userActivity.screenshot && (
                    <Image
                      boxSize="80px"
                      objectFit="cover"
                      m={"auto"}
                      mb={"5"}
                      src={userActivity.screenshot}
                      alt="Dan Abramov"
                    />
                  )}
              </HStack>
            </CardBody>
            <Divider />
          </Card>
        );
      })}
    </>
  );
};
export default ProjectCard;
