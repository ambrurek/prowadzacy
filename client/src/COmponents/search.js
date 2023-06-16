import { useState, useEffect } from "react";
import "./SearchBar.css";
import config from "../cgf";
import { Link, useHistory } from "react-router-dom";

function SearchBar() {
  const [nauczycieleArray, setNauczycieleArray] = useState([]);
  const [prowadzacyActive, setProwadzacyActive] = useState(true);
  const [salaActive, setSalaActive] = useState(false);
  const [searchType, setSearchType] = useState("teacher");
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.API_URL}/teacher/all`);
        const data = await response.json();
        setNauczycieleArray(data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  const fetchDataByRoom = async () => {
    try {
      const response = await fetch(`${config.API_URL}/room/all`);
      const data = await response.json();
      const formattedData = data.map((room) => ({
        ...room,
        name: `${room.building_id}  ${room.room_number}`,
        id: room.room_id
      }));
      setSearchResults(formattedData);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  const fetchDataByTeacher = async () => {
    try {
      const response = await fetch(`${config.API_URL}/teacher/all`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  const handleSearchType = (type) => {
    if (type === "teacher") {
      setProwadzacyActive(true);
      setSalaActive(false);
      setSearchType("teacher");
      fetchDataByTeacher();
    } else if (type === "room") {
      setProwadzacyActive(false);
      setSalaActive(true);
      setSearchType("room");
      fetchDataByRoom();
    }
  };

  const handleRedirect = (id) => {
    if (searchType === "teacher") {
      history.push(`/Kalendarz/${id}`);
    } else if (searchType === "room") {
      history.push(`/Sale/${id}`); // Przekierowanie do odpowiedniego adresu dla wyszukiwania sal
    }
  };

  const wyszukiwanieFunkcja = (event) => {
    const wartoscWysz = event.target.value;
    const newFilter = searchResults.filter((result) =>
      searchType === "teacher"
        ? `${result.first_name} ${result.last_name}`
            .toLowerCase()
            .includes(wartoscWysz.toLowerCase())
        : result.name.toLowerCase().includes(wartoscWysz.toLowerCase())
    );

    setSearchResults(newFilter);
  };

  return (
    <div className="searchDiv">
      <div className="searchButtons">
        <button
          className={prowadzacyActive ? "active" : ""}
          onClick={() => handleSearchType("teacher")}
        >
          Prowadzący
        </button>
        <button
          className={salaActive ? "active" : ""}
          onClick={() => handleSearchType("room")}
        >
          Sala
        </button>
      </div>
      <div className="searchInput">
        <input
          className="searchBar"
          type="text"
          placeholder={
            searchType === "teacher" ? "Wyszukaj prowadzącego" : "Wyszukaj salę"
          }
          onChange={wyszukiwanieFunkcja}
        />
      </div>
      {searchResults.length !== 0 && (
        <div className="dataResults">
          {searchResults.map((result) => (
            <Link
              key={result.id}
              to={searchType === "teacher" ? `/Kalendarz/${result.id}` : `/Sale/${result.id}`}
              className="resultDiv"
              onClick={() => handleRedirect(result.id)}
            >
              <p>
                {searchType === "teacher"
                  ? `${result.first_name} ${result.last_name}`
                  : result.name}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
