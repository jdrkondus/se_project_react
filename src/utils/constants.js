const coordinates = { lat: "30.446104", long: "-87.301223" };
const apiKey = "0ed69e59a003e9889abe41d4b811eb9b";

const weatherConditionImages = {
  day: {
    clear: {
      name: "clear",
      image: new URL("../assets/day/clear-day.svg", import.meta.url).href,
    },
    clouds: {
      name: "cloudy",
      image: new URL("../assets/day/cloudy-day.svg", import.meta.url).href,
    },
    mist: {
      name: "foggy",
      image: new URL("../assets/day/foggy-day.svg", import.meta.url).href,
    },
    rain: {
      name: "rainy",
      image: new URL("../assets/day/rainy-day.svg", import.meta.url).href,
    },
    snow: {
      name: "snowy",
      image: new URL("../assets/day/snowy-day.svg", import.meta.url).href,
    },
    thunderstorm: {
      name: "stormy",
      image: new URL("../assets/day/stormy-day.svg", import.meta.url).href,
    },
    default: {
      name: "default",
      image: new URL("../assets/day/blank-day.svg", import.meta.url).href,
    },
  },
  night: {
    clear: {
      name: "clear",
      image: new URL("../assets/night/clear-night.svg", import.meta.url).href,
    },
    clouds: {
      name: "cloudy",
      image: new URL("../assets/night/cloudy-night.svg", import.meta.url).href,
    },
    mist: {
      name: "foggy",
      image: new URL("../assets/night/foggy-night.svg", import.meta.url).href,
    },
    rain: {
      name: "rainy",
      image: new URL("../assets/night/rainy-night.svg", import.meta.url).href,
    },
    snow: {
      name: "snowy",
      image: new URL("../assets/night/snowy-night.svg", import.meta.url).href,
    },
    thunderstorm: {
      name: "stormy",
      image: new URL("../assets/night/stormy-night.svg", import.meta.url).href,
    },
    default: {
      name: "default",
      image: new URL("../assets/day/blank-night.svg", import.meta.url).href,
    },
  },
};

export { coordinates, apiKey, weatherConditionImages };
