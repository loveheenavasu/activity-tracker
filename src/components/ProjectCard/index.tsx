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
} from "@chakra-ui/react";
import React from "react";
interface PROJECTPROP {
  project: {
    id: number;
    name: string;
  }[];
  isRemarks: boolean;
  setIsRemarks: React.Dispatch<React.SetStateAction<boolean>>;
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
const ProjectCard = ({ project, setIsRemarks, isRemarks }: PROJECTPROP) => {
  console.log(project, "projectprojectproject");
  const [userActivity, setUserActivity] = React.useState({
    screenshot: "",
    keyboardClickCount: 0,
    mouseClickCount: 0,
  });
  const [idForTracking, setIdForTracking] = React.useState(null);
  const [timeTracked, setTimeTracked] = React.useState(formatime);
  const [intervalId, setIntervalId] = React.useState(null);
  const [timerIntervalId, setTimerIntervalId] = React.useState(null);
  //   console.log("idForTracking === project.id", idForTracking, project);

  const trackUserActivity = async () => {
    const activity = await window.electronAPI.getUserActivity();
    console.log(activity, "activityactivityactivityactvityactivity");
    const newPath = activity?.screenshot.split("tracker-desktop")[1];
    console.log(newPath, "newPathnewPAth");
    const userActivityWithScreenshot = {
      screenshot: newPath,
      keyboardClickCount: activity.keyboardClickCount,
      mouseClickCount: activity.mouseClickCount,
    };
    setUserActivity(userActivityWithScreenshot);
    console.log(userActivity, "trackUserActivityActivity");
  };
  const activateTimer = (id: number) => {
    if (idForTracking === id) {
      clearInterval(intervalId);
      clearInterval(timerIntervalId);
      setIdForTracking(null);
      setTimeTracked("00:00:00");
    } else {
      seconds = 0;
      minutes = 0;
      hours = 0;
      setIdForTracking(id);
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
          <Card>
            <CardHeader>
              <HStack justifyContent={"space-between"}>
                <Heading size="md">{project.name}</Heading>
                {project.id === idForTracking && (
                  <Text align={"center"}>{timeTracked}</Text>
                )}
                (
                <Button
                  bg={"#319795"}
                  _hover={{ color: "none" }}
                  size="md"
                  onClick={() => activateTimer(project.id)}
                  isDisabled={
                    idForTracking !== null && idForTracking !== project.id
                      ? true
                      : false
                  }
                >
                  {project.id === idForTracking ? "Stop" : "Track"}
                </Button>
                )
              </HStack>
            </CardHeader>
            <CardBody>
              <Stack>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Text pt="2" fontSize="sm">
                  {project.summary}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
          </Card>
        );
      })}
    </>
  );
};
export default ProjectCard;
