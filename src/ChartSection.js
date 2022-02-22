import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import Table from "./components/Table";
import BarChart from "./components/BarChart";
import getPlanetData from "./helpers/RetrieveData";
import { Dropdown } from "react-bootstrap";
import { API_URL, CATEGORIES } from "./constants/Constants";

function ChartSection() {
  const [planetData, setPlanetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [barChartCategory, setBarChartCategory] = useState("population");
  const [barChartTitle, setBarChartTitle] = useState("Population");

  const [isInitialSelection, setIsInitialSelection] = useState(true);
  const columns = React.useMemo(() => CATEGORIES, []);

  useEffect(() => {
    getPlanetData(API_URL)
      .then((resp) => {
        setIsLoading(false);
        setPlanetData(
          resp.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
        );
      })
      .catch(console.error);
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1>Chart Section Title</h1>
        <div>
          <Oval height="100" width="100" color="grey" ariaLabel="loading" />
        </div>
      </section>
    );
  }

  function handleChartCategorySelection(category) {
    setBarChartCategory(category.accessor);
    setBarChartTitle(category.Header);
    setIsInitialSelection(false);
  }

  return (
    <section>
      <h1>Planetary Data Overview</h1>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {isInitialSelection ? "Select Initial Category" : barChartTitle}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {[1, 2, 3, 4, 6].map((index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() =>
                    handleChartCategorySelection(CATEGORIES[index])
                  }
                >
                  {CATEGORIES[index].Header}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <BarChart data={planetData} category={barChartCategory} titleCategory ={barChartTitle} />
        <Table columns={columns} data={planetData} />
      </div>
    </section>
  );
}

export default ChartSection;
