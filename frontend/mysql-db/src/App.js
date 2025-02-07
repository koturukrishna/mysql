import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [createUser, setCreateUser] = useState({ name: "", place: "" });
  const [data, setData] = useState([]);
  const [editUserID, setEditUserID] = useState("");
  useEffect(() => {
    const mysqlDb = async () => {
      const res = await fetch("http://localhost:3005/");
      const data = await res.json();
      console.log("Data from mysql", data);
      setData(data);
    };
    mysqlDb();
  }, []);

  const handlePostUser = (e) => {
    e.preventDefault();
    console.log("You Have Entered", createUser);
    axios
      .post("http://localhost:3005/emp", createUser)
      .then((res) => {
        console.log("Response", res);
      })
      .catch((error) => console.log("Error", error));
  };

  const handleDeleteUser = (id) => {
    debugger;
    axios
      .delete("http://localhost:3005/delete/" + id)
      .then((res) => {
        console.log("Deleted");
      })
      .catch((error) => console.log("Error", error));
  };

  return (
    <div className="App">
      <div style={{ width: "600px" }}>
        <h1>data from mysql database</h1>
        {data.map((eachOne) => {
          return (
            <div
              key={eachOne.empId}
              style={{
                width: "500px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h2>{eachOne.empName}</h2>
              <h3>{eachOne.place}</h3>
              <button
                className="btn btn-primary"
                onClick={() => setEditUserID(eachOne.empId)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteUser(eachOne.empId)}
              >
                Delete
              </button>
            </div>
          );
        })}
        <div>
          <form onSubmit={handlePostUser}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Emp Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) =>
                  setCreateUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Place
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) =>
                  setCreateUser((prev) => ({ ...prev, place: e.target.value }))
                }
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <EditUser id={editUserID} />
      </div>
    </div>
  );
}

const EditUser = ({ id }) => {
  const [editUser, setEditUser] = useState({ empName: "", place: "" });

  useEffect(() => {
    axios
      .get("http://localhost:3005/emp/" + id)
      .then((res) => {
        console.log("details", res.data);
        setEditUser(res.data[0]);
      })
      .catch((error) => console.log("oneError", error));
  }, [id]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3005/update/" + id, editUser)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleUpdateUser}>
        <h2>Edit User Details</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail2" className="form-label">
            Emp Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            value={editUser?.empName}
            onChange={(e) =>
              setEditUser((prev) => ({ ...prev, empName: e.target.value }))
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Place
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword2"
            value={editUser?.place}
            onChange={(e) =>
              setEditUser((prev) => ({ ...prev, place: e.target.value }))
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
