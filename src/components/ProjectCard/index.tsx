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
import { setScreenShot, setTime, setRemarks } from "../../store/trackCardSlice";
import { debounce } from "lodash";
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
  console.log(project, "projectproject");
  const toast = useToast();
  const dispatch = useDispatch();
  const [timeTracked, setTimeTracked] = React.useState("00:00:00");
  const [intervalId, setIntervalId] = React.useState(null);
  const [timerIntervalId, setTimerIntervalId] = React.useState(null);
  const handleInputChangeDebounced = debounce((value) => {
    console.log("value", value);
    if (value && projectClientrackId.clientProjectTrackId) {
      const action = {
        ID: projectClientrackId.clientProjectTrackId,
        clientID: projectClientrackId.clientTrackId,
        remarks: value,
      };
      dispatch(setRemarks(action));
    }
  }, 500);
  const trackUserActivity = async (ID: number, clientID: number) => {
    const activity = await window.electronAPI.getUserActivity();
    console.log(activity, "activityactivityactivityactvityactivity");
    console.log("screenshotscreenshot", activity?.screenshot);
    const userActivityWithScreenshot = {
      screenshot: activity?.screenshot,
      keyboardClickCount: activity.userActivity.keyboardClickCount,
      mouseClickCount: activity.userActivity.mouseClickCount,
    };
    const action = { ID, clientID, screenshot: activity.screenshot };
    dispatch(setScreenShot(action));
    console.log(userActivityWithScreenshot, "userActivitywithScreenshot");
    setUserActivity(userActivityWithScreenshot);
    await window.electronAPI.resetData();
  };
  const updateTimer = () => {
    setTimeTracked((prevTime) => {
      const [hours, minutes, seconds] = prevTime.split(":").map(Number);
      let newSeconds = seconds + 1;
      let newMinutes = minutes;
      let newHours = hours;
      if (newSeconds === 60) {
        newSeconds = 0;
        newMinutes++;
        if (newMinutes === 60) {
          newMinutes = 0;
          newHours++;
        }
      }
      return `${String(newHours).padStart(2, "0")}:${String(
        newMinutes
      ).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
    });
  };
  const activateTimer = async (
    id: number,
    clientID: number,
    projectTme: string
  ) => {
    if (projectClientrackId.clientProjectTrackId === id) {
      const action = { id, clientID, timeTracked };
      dispatch(setTime(action));
      await window.electronAPI.resetData();
      clearInterval(intervalId);
      clearInterval(timerIntervalId);
      setProjectClientTrackId({
        clientTrackId: null,
        clientProjectTrackId: null,
      });
      setTimeTracked(null);
      setIsTracking(false);
      setUserActivity({
        screenshot: "",
        keyboardClickCount: 0,
        mouseClickCount: 0,
      });
    } else {
      setTimeTracked(projectTme);
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
        trackUserActivity(id, clientID);
      }, 10000 * 2);
      setIntervalId(newIntervalId);
      const newTimerIntervalId = setInterval(() => {
        updateTimer();
      }, 1000);
      setTimerIntervalId(newTimerIntervalId);
    }
    setIsRemarks(!isRemarks);
  };

  return (
    <>
      {project?.map((project: any) => {
        const pathAfterSaving = project.screenshot.split("tracker-desktop")[1];
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
                  onClick={() =>
                    activateTimer(project.id, clientId, project.time)
                  }
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
                {project.id === projectClientrackId.clientProjectTrackId ? (
                  <Text align={"center"}>{timeTracked}</Text>
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
              {project.screenshot && (
                <Image
                  boxSize="auto"
                  objectFit="cover"
                  m={"auto"}
                  mb={"5"}
                  src={pathAfterSaving}
                  alt="projects image"
                />
              )}
              <Textarea
                // value={remarks}
                onChange={(e) => handleInputChangeDebounced(e.target.value)}
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
