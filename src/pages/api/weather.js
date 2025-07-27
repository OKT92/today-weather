import { getCurrentFormattedDate } from "../../lib/helper";

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

export default async function handler(req, res) {
  try {
    let { q, lat, lon } = req.query;

    const result = {
      dateTime: getCurrentFormattedDate(),
      lat: lat,
      lon: lon,
    };

    if (lat === undefined || lon === undefined) {
      if (q === undefined || q === "") {
        return res.status(400).json({ error: "Bad Request" });
      }

      const param = new URLSearchParams({ q }).toString();

      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?appid=${OPEN_WEATHER_API_KEY}&${param}`
      );
      const geoResults = await geoResponse.json();

      if (!geoResults.length) {
        console.log("no result");
        return res.status(404).json({ error: "Not Found" });
      }

      const geoResult = geoResults[0];

      result.name = geoResult.name;
      result.country = geoResult.country;
      result.lat = geoResult.lat;
      result.lon = geoResult.lon;
    }

    const param = new URLSearchParams({
      lat: result.lat,
      lon: result.lon,
    }).toString();

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?appid=${OPEN_WEATHER_API_KEY}&units=metric&${param}`
    );
    const weatherResult = await weatherResponse.json();

    result.humidity = weatherResult.current.humidity;
    result.temp = weatherResult.current.temp;
    result.weatherMain = weatherResult.current.weather[0].main;
    result.dailyTempMin = weatherResult.daily[0].temp.min;
    result.dailyTempMax = weatherResult.daily[0].temp.max;

    console.log(result);

    return res.status(200).json(result);
  } catch (ex) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
