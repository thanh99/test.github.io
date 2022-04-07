import AddTodo from "./components/addToDo";
import AllTodo from "./components/allTodo";
import { onGetItem, onSetItem } from "../common/action";
import { useState } from "react";

function TodoList() {
  
  const [dataAdd, setDataAdd] = useState({
    name: "",
    description: "",
    dueDate: null,
    piority: 2,
    open: 0,
  });
  console.log(dataAdd)

  const [allData, setAllData] = useState(
    JSON.parse(localStorage.getItem("TodoList")) || []
  );
  const handleChange = (e) => {};

  // check
  const handleCheck = (e, index, id) => {
    localStorage.removeItem("TodoList");
    const newData = [...allData];
    newData.forEach((item) => {
      if (item._id === id) {
        item.checked = e.target.checked;
      }
    });
    setAllData(newData);
    onSetItem("TodoList", JSON.stringify(newData));
  };

  const handleOpen = (e, index, id) => {
    const data = onGetItem("TodoList");
    const newData = [...data];
    newData.forEach((item) => {
      if (item._id === id) {
        item.open += 1;
      }
    });
    setAllData(newData);
    onSetItem("TodoList", JSON.stringify(newData));
  };

  const handleDelete = (e, index, id) => {
    localStorage.removeItem("TodoList");
    const newData = [...allData];
    newData.splice(index, 1);
    setAllData(newData);
    localStorage.setItem("TodoList", JSON.stringify(newData));
  };

  const onGetData = (data) => {
    const newData = [...data];
    setAllData(newData);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ border: "1px solid black", flex: 1 }}>
        <div style={{ padding: 20 }}>
          <p style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
            New Task
          </p>
          <AddTodo
            onChange={handleChange}
            data={dataAdd}
            onGetData={onGetData}
            allData={allData}
          />
        </div>
      </div>
      <div style={{ border: "1px solid black", flex: 2 }}>
        <AllTodo
          allData={allData}
          handleCheck={handleCheck}
          onDelete={handleDelete}
          handleOpen={handleOpen}
        />
      </div>
    </div>
  );
}

export default TodoList;
