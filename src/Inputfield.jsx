import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import dateFormat from "dateformat";
import getWeathers from "./api";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Image,
} from "react-bootstrap";

function Inputfield() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const getWeatherbyCity = async () => {
    if (!city.trim()) {
      setError("Please enter a valid city name.");
      return;
    }
    setError("");

    try {
      const weatherData = await getWeathers(city);
      if (weatherData.cod !== 200) {
        setError("City not found. Please try again.");
        setWeather({});
      } else {
        setWeather(weatherData);
      }
      setCity("");
    } catch (err) {
      setError("Failed to fetch weather. Please try again.");
    }
  };

  const renderDate = (timezone) => {
    let now = new Date();
    let deviceTime = now.getTime() + now.getTimezoneOffset() * 60000;
    let localTime = new Date(deviceTime + timezone * 1000);
    return dateFormat(localTime, "dddd, mmmm dS, h:MM TT");
  };

  return (
    <Container className="app text-center mt-5 bg-light">
      <h1 className="mb-4">🌦️ Weather App</h1>

      {/* Input Field & Search Button */}
      <Row className="justify-content-center g-2">
        <Col xs={12} md={6} lg={4}>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name"
            className="text-center"
          />
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={getWeatherbyCity}>
            🔍 Search
          </Button>
        </Col>
      </Row>

      {/* Error Message */}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {/* Weather Display */}
      {weather && weather.weather ? (
        <Card
          className="shadow-lg p-4 mt-4 mx-auto"
          style={{ maxWidth: "500px",backgroundColor:'bisque' }}
        >
          <Card.Body>
            <Card.Title className="fw-bold">
              📍 {weather.name}, {weather.sys.country}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {weather.timezone ? renderDate(weather.timezone) : "Updating..."}
            </Card.Subtitle>

            {/* Weather Icon & Description */}
            <div className="d-flex flex-column align-items-center my-3">
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                fluid
              />
              <h3>{weather.weather[0].description}</h3>
            </div>

            {/* Temperature Details */}
            <h1 className="display-4 fw-bold">{weather.main.temp}°C</h1>
            <h5 className="text-muted">
              Feels Like {weather.main.feels_like}°C
            </h5>

            {/* Wind Stats */}
            <Row className="mt-4 g-3">
              <Col xs={12} sm={6} className="text-center">
                <p className="fw-medium">
                  🌬️ Wind Speed: {weather.wind.speed} m/s
                </p>
              </Col>
              <Col xs={12} sm={6} className="text-center">
                <p className="fw-medium">
                  🧭 Wind Direction: {weather.wind.deg}°
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info">No weather data available.</Alert>
      )}
    </Container>
  );
}

export default Inputfield;
