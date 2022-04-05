import logo from "./logo.svg";
import AddTodo from "./components/addToDo";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const all = [
    {
      _id: 1,
      name: "asd",
      description: "asdads",
      dueDate: null,
      piority: 2,
    },
    {
      _id: 2,
      name: "rrrr",
      description: "adadd",
      dueDate: null,
      piority: 2,
    },
    {
      _id: 3,
      name: "tttt",
      description: "tttt",
      dueDate: null,
      piority: 3,
    },
    {
      _id: 4,
      name: "ffff",
      description: "ffff",
      dueDate: null,
      piority: 1,
    },
  ];
  const [dataAdd, setDataAdd] = useState({
    name: "",
    description: "",
    dueDate: null,
    piority: 2,
  });
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    localStorage.setItem('TodoList', JSON.stringify(all));
    const data = JSON.parse(localStorage.getItem("TodoList")) || [];
    setAllData(data);
  }, []);
  const handleChange = (e) => {};
  const onGetData = (data) => {};

  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}>
      <div style={{ border: "1px solid black" }}>
        <AddTodo
          onChange={handleChange}
          data={dataAdd}
          onGetData={onGetData}
          allData={allData}
        />
      </div>
      {/* <div>
        <AddTodo />
      </div> */}
    </div>
  );
}

export default App;
