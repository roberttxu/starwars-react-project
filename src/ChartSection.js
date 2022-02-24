import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import Table from "./components/Table";
import BarChart from "./components/BarChart";
import getPlanetData from "./helpers/RetrieveData";
import { Dropdown } from "react-bootstrap";
import {
  API_URL,
  CATEGORIES,
  INITIAL_SELECT_MESSAGE,
  GRAPHABLE_INDICES,
} from "./constants/Constants";
import "./ChartSection.css";

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

  function handleChartCategorySelection(category) {
    setBarChartCategory(category.accessor);
    setBarChartTitle(category.Header);
    setIsInitialSelection(false);
  }

  function ChartBody() {
    if (isLoading) {
      return (
        <>
          <div className="centered">
            <Oval />
          </div>
        </>
      );
    } else {
      return (
        <div className="charts">
          <div>
            <nav className="header">
              <div>Select a category to display on the bar chart</div>
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-button-dark-example1"
                >
                  {isInitialSelection ? INITIAL_SELECT_MESSAGE : barChartTitle}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {GRAPHABLE_INDICES.map((index) => {
                    return (
                      <Dropdown.Item
                        key={index}
                        data-testid="select-option"
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
            </nav>
            <BarChart
              data={planetData}
              category={barChartCategory}
              titleCategory={barChartTitle}
            />
          </div>
          <h3>Planetary Information</h3>
          <Table columns={columns} data={planetData} />
        </div>
      );
    }
  }

  return (
    <>
      <h2>Planetary Data Overview</h2>
      <section>
        <ChartBody />
      </section>
    </>
  );
}

export default ChartSection;
