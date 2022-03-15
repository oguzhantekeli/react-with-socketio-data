import axios from "axios";
import socketIOClient from "socket.io-client";

const baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = process.env.REACT_APP_API_KEY;
const ENDPOINT = "http://localhost:4001";

const getWeatherData = async (cityName) => {
  if (cityName === "") {
    cityName = "adana";
  }

  try {
    const wd = await axios.get(
      `${baseUrl}q=${cityName}&appid=${apiKey}&units=metric`
    );
    console.log("wd:", wd);
    return wd.data.main.temp;
  } catch (error) {
    throw new Error(error);
  }
};
const getFromSocket = () => {
  const socket = socketIOClient(ENDPOINT);
  return socket;
};

const weatherService = {
  getWeatherData,
  getFromSocket,
};

export default weatherService;
