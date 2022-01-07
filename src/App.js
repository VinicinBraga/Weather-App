import react from "react";
import "./App.css";

const api = {
  key: "f9e5839374520c232cada9540783f608",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
      </main>
    </div>
  );
}

export default App;
