import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ChartSection from "./ChartSection";
function App() {
  return (
    <div className="App">
      <h1 className="header">Starwars Dashboard</h1>
      <section>
        <ChartSection />
      </section>
    </div>
  );
}

export default App;
