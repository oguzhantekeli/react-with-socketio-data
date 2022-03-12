import React, { useEffect, useState } from "react";
import weatherService from "../services/weatherService";

const socket = weatherService.getFromSocket();
const ClientComponent = () => {
  const [response, setResponse] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");

  useEffect(() => {
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    weatherService.getWeatherData(response).then((a) => {
      console.log("response:", a);
      setWeatherInfo(a);
    });
  }, [response]);

  return (
    <p>
      {response} şehrinde hava {weatherInfo} derece.
    </p>
  );
};
export default ClientComponent;
