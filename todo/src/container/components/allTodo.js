import React, { useState, useEffect, useRef } from "react";
import Input from "../../components/Input";
import AddTodo from "./addToDo";
import Button from "../../components/Button";

export default function AllTodo(props) {
  const { allData = [] } = props;
  const [localState, setLocalState] = useState([]);
  const search = useRef();
  useEffect(() => {
    onGetDataVal()
  }, [allData]);

  const onGetDataVal = () => {
    let result = allData;
    if (search.current)
      result = result.filter((e) => e.name.includes(search.current));
    result.sort(
      (rl1, rl2) =>
        toDate(rl1.dueDate).valueOf() - toDate(rl2.dueDate).valueOf()
    );
    setLocalState(result);
  };

  function toDate(dateStr) {
    console.log(dateStr)
    let parts = dateStr && dateStr.split("-");
    if(parts)
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  const onGetData = (data) => {
    const newData = [...data];
    setLocalState(newData);
  };
  const onSearch = (e) => {
    const value = e.target.value;
    search.current = value;
    onGetDataVal()
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <div style={{ flex: 1, padding: 20, overflowY: "scroll" }}>
        <p style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
          To Do List
        </p>
        <Input
          name="search"
          onChange={(e) => onSearch(e)}
          placeholder="Search ..."
        />
        <br />
        {Array.isArray(localState) &&
          localState.map((item, index) => {
            return (
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    border: "1px solid black",
                    padding: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <input
                      type="checkbox"
                      style={{ height: "100%" }}
                      checked={item.checked}
                      onClick={(e) => props.handleCheck(e, index, item._id)}
                    />
                  </div>
                  <div style={{ flex: 1, margin: "auto" }}>
                    <p style={{ margin: "0 20px" }}>{item.name}</p>
                  </div>
                  <div style={{ margin: "0 10px" }}>
                    <Button
                      type="detail"
                      onClick={(e) => props.handleOpen(e, index, item._id)}
                    >
                      {item.open % 2 !== 0 ? "Collapse" : "Detail"}
                    </Button>
                  </div>
                  <div style={{ margin: "0 10px" }}>
                    <Button
                      type="delete"
                      onClick={(e) => props.onDelete(e, index, item._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                {item.open % 2 !== 0 ? (
                  <div
                    style={{
                      border: "1px solid black",
                      borderTop: 0,
                      padding: 20,
                    }}
                  >
                    <AddTodo data={item} text="Update" onGetData={onGetData} />
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
      <div
        style={{
          backgroundColor: "#E0E0E0",
          display: "flex",
          justifyContent: "center",
          padding: "10px 20px",
        }}
      >
        <div style={{ flex: 1, margin: "auto" }}>
          <p>Bulk Action:</p>
        </div>
        <div style={{ paddingTop: 10 }}>
          <Button type="done">Done</Button>
        </div>
        <div style={{ paddingTop: 10 }}>
          <Button type="delete" onClick={""}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
