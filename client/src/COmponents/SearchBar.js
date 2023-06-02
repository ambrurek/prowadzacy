import { useState, useEffect } from "react";
import "./SearchBar.css";
import config from"../cgf"
import { Link } from "react-router-dom"; // Dodaj ten import

function SearchBar() {
  const [nauczycieleArray, setNauczycieleArray] = useState([]);

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

  const imieNazwisko = nauczycieleArray.map(
    (nauczyciel) => nauczyciel.first_name + " " + nauczyciel.last_name
  );

  const [nauczycieleFiltered, setNauczyciele] = useState([]);

  const wyszukiwanieFunkcja = (event) => {
    const wartoscWysz = event.target.value;
    const newFilter = nauczycieleArray.filter((nauczyciel) =>
      (nauczyciel.first_name + " " + nauczyciel.last_name)
        .toLowerCase()
        .includes(wartoscWysz.toLowerCase())
    );

    if (wartoscWysz === "") {
      setNauczyciele([]);
    } else {
      setNauczyciele(newFilter);
    }
  };

  return (
    <div className="searchDiv">
      <div className="searchInput">
        <input
          className="searchBar"
          type="text"
          placeholder="Wyszukaj prowadzącego"
          onChange={wyszukiwanieFunkcja}
        />
      </div>
      {nauczycieleFiltered.length !== 0 && (
        <div className="dataResults">
          {nauczycieleFiltered.map((nauczyciel) => (
            <Link key={nauczyciel.id} to={`/Kalendarz/${nauczyciel.id}`} className="nauczycielDiv">
              <p>{nauczyciel.first_name} {nauczyciel.last_name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
