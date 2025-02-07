import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const mysqlDb = async () => {
      const res = await fetch("http://localhost:3005/course");
      const data = await res.json();
      console.log("Data from mysql", data);
      setData(data);
    };
    mysqlDb();
  }, []);

  return (
    <div className="App">
      <h1>Get The data from mysql database</h1>
      {data.map((eachOne) => {
        return (
          <div key={eachOne.id}>
            <h2>{eachOne.course_name}</h2>
            <h3>{eachOne.instructor}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default App;
