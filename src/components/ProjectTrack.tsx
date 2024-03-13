import { Text, Stack, Button, HStack, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { MOCK_PROJECTS_DATA } from "../mock-data";
import { PROJECT } from "../types/project";
export let value: string;
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

const Project = () => {
  const [userActivity, setUserActivity] = useState({
    screenshot: "",
    keyboardClickCount: 0,
    mouseClickCount: 0,
  });
  const [idForTracking, setIdForTracking] = useState(null);
  const [timeTracked, setTimeTracked] = useState(formatime);
  const [intervalId, setIntervalId] = useState(null);
  const [timerIntervalId, setTimerIntervalId] = useState(null);

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
  };
  return (
    <>
      <Text as={"h1"} textAlign={"center"} mt="3">
        Track User Activity Status
      </Text>
      <Stack>
        <HStack justifyContent={"space-between"}>
          <Text as="h2" ml="6">
            Projects
          </Text>
          <Text as="h2" ml="6">
            Timer
          </Text>
          <Text as="h2" mr="4">
            Actions
          </Text>
        </HStack>
        {MOCK_PROJECTS_DATA.map((item: PROJECT) => {
          return (
            <>
              <HStack
                style={{
                  justifyContent: "space-between",
                  gap: "20px",
                  margin: "1rem",
                }}
                key={item.id}
              >
                <Text>{item.projectName}</Text>
                {item.id === idForTracking && (
                  <Text align={"center"}>{timeTracked}</Text>
                )}
                <Button
                  colorScheme="teal"
                  size="md"
                  onClick={() => activateTimer(item.id)}
                >
                  {item.id === idForTracking ? "Stop" : "Track"}
                </Button>
              </HStack>
            </>
          );
        })}
        {userActivity.screenshot && (
          <Image
            boxSize="150px"
            objectFit="cover"
            m={"auto"}
            mb={"5"}
            src={userActivity.screenshot}
            alt="Dan Abramov"
          />
        )}
      </Stack>
    </>
  );
};

export default Project;
