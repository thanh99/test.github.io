import AddTodo from "./components/addToDo";
import AllTodo from "./components/allTodo";
import { onGetItem, onSetItem, onDeleteItem } from "../common/action";
import { useState } from "react";

function TodoList() {
  const [dataAdd, setDataAdd] = useState({
    name: "",
    description: "",
    dueDate: null,
    piority: 2,
    checked: false,
    open: 0,
  });

  const [allData, setAllData] = useState(
    JSON.parse(localStorage.getItem("TodoList")) || []
  );
  const handleChange = (e) => {};

  const handleOpen = (id) => {
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

  const handleDelete = (id) => {
    const newData = [...allData];
    console.log(id)
    const dataFilter = newData.filter((e) => !id.includes(e._id));
    console.log(dataFilter, "ppppppp")
    setAllData(dataFilter);
    onSetItem("TodoList", JSON.stringify(dataFilter));
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
          // handleCheck={handleCheck}
          onDelete={handleDelete}
          handleOpen={handleOpen}
        />
      </div>
    </div>
  );
}

export default TodoList;
