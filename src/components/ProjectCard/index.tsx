import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  Text,
  HStack,
  Button,
  Image,
  useToast,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { setTime } from "../../store/trackCardSlice";
interface PROJECTPROP {
  project: {
    id: number;
    title: string;
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
let formatime: string;
function formatTime(initialTime = "00:00:00") {
  console.log("initialTime::", initialTime);
  const [initilaHours, initialMinutes, initialSeconds] = initialTime
    .split(":")
    .map(Number);
  // if (initialTime) {
  //   [initilaHours, initialMinutes, initialSeconds] = initialTime
  //     .split(":")
  //     .map(Number);
  //   seconds += initialSeconds;
  //   minutes += initialMinutes;
  //   hours += initilaHours;
  //   console.log(
  //     initialMinutes,
  //     initialSeconds,
  //     initilaHours,
  //     "initialminutes,initialSeconds,intialHours"
  //   );
  // }
  seconds += initialSeconds;
  minutes += initialMinutes;
  hours += initilaHours;
  console.log(
    "seconds = initialSeconds + seconds;",
    seconds,
    (seconds += initialSeconds),
    initialSeconds,
    seconds
  );
  seconds++;
  // const totalSeconds = initialSeconds + seconds;
  // const totalMinutes = initialMinutes + minutes;
  // const totalHours = initilaHours + hours;
  if (seconds >= 59) {
    seconds = 0;
    minutes++;
    if (minutes >= 59) {
      minutes = 0;
      hours++;
    }
  }
  // hours = totalHours;
  // minutes = totalMinutes;
  // seconds = totalSeconds;
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
  const dispatch = useDispatch();
  const [timeTracked, setTimeTracked] = React.useState(formatime);
  const [intervalId, setIntervalId] = React.useState(null);
  const [timerIntervalId, setTimerIntervalId] = React.useState(null);
  console.log(
    "data for tracking from local storage",
    localStorage.getItem(`${projectClientrackId.clientProjectTrackId}`)
  );
  const trackUserActivity = async () => {
    const activity = await window.electronAPI.getUserActivity();
    console.log(activity, "activityactivityactivityactvityactivity");
    const newPath = activity?.screenshot.split("tracker-desktop")[1];
    console.log("screenshotscreenshot", activity?.screenshot);
    const userActivityWithScreenshot = {
      screenshot: activity?.screenshot || newPath,
      keyboardClickCount: activity.userActivity.keyboardClickCount,
      mouseClickCount: activity.userActivity.mouseClickCount,
    };
    console.log(userActivityWithScreenshot, "userActivitywithScreenshot");
    setUserActivity(userActivityWithScreenshot);
    await window.electronAPI.resetData();
  };
  const activateTimer = async (id: number, clientID: number) => {
    if (projectClientrackId.clientProjectTrackId === id) {
      console.log(timeTracked, "timeTrackedtimeTracked");
      const action = { id, clientID, timeTracked };
      dispatch(setTime(action));
      await window.electronAPI.resetData();
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
      await window.electronAPI.resetData();
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
        const updateTime = formatTime(project.time);
        console.log(
          project.id,
          "project.id from local storage",
          localStorage.getItem(`${project.id}`)
        );
        return (
          <Card
            style={{
              WebkitBoxShadow: "15px 10px 6px 0 rgba(227,223,227,1)",
              boxShadow: "15px 10px 6px 0 rgba(227,223,227,1)",
              borderRadius: "5px",
              border: "1px solid #DAE0E2",
              marginBottom: "1rem",
              maxWidth: "100%",
            }}
            key={project.id}
          >
            <CardHeader>
              <HStack justifyContent={"space-between"}>
                <Heading size="md">{project.title}</Heading>(
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
              <HStack width={"100%"} justifyContent={"space-between"}>
                <Text fontSize={".9rem"}>Time Tracked:</Text>
                {/* <Text>{updateTime ? updateTime : "00:00:00"}</Text> */}
                {/* <Text align={"center"}>{project.time}</Text> */}
                {project.id === projectClientrackId.clientProjectTrackId ? (
                  <Text align={"center"}>{updateTime}</Text>
                ) : (
                  <Text align={"center"}>{project.time}</Text>
                )}
              </HStack>
              <Divider />
              <HStack justifyContent="space-between">
                <Stack>
                  <Heading size="xs" textTransform="uppercase" mt="2">
                    Summary
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {project.summary}
                  </Text>
                </Stack>
              </HStack>
              <Text fontSize={".75rem"}>Last screen capture</Text>
              {project.id === projectClientrackId.clientProjectTrackId &&
                userActivity.screenshot && (
                  <Image
                    boxSize="auto"
                    objectFit="cover"
                    m={"auto"}
                    mb={"5"}
                    src={userActivity.screenshot}
                    alt="Dan Abramov"
                  />
                )}
              <Textarea
                // value={remarks}
                // onChange={handleInutChange}
                maxW={"100%"}
                maxH={"5%"}
                borderRadius={".5rem"}
                isDisabled={
                  projectClientrackId.clientProjectTrackId !== null &&
                  (projectClientrackId.clientProjectTrackId !== project.id ||
                    projectClientrackId.clientTrackId !== clientId)
                    ? true
                    : false
                }
                placeholder="Enter Remarks Here"
                size="xs"
                mt="2"
                resize={"none"}
              />
            </CardBody>
          </Card>
        );
      })}
    </>
  );
};
export default ProjectCard;
