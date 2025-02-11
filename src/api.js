const apiKey = "1fa297733ac3687df3b1444c858dacec";

const getWeathers = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(`City not found (${response.status})`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null; // Return null in case of an error
  }
};

export default getWeathers;
