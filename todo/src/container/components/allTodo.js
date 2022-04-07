import React, { useState, useEffect, useRef } from "react";
import Input from "../../components/Input";
import AddTodo from "./addToDo";
import { onSetItem } from "../../common/action";
import Button from "../../components/Button";

export default function AllTodo(props) {
  const { allData = [] } = props;
  const [localState, setLocalState] = useState([]);
  const [dataChecked, setDataChecked] = useState();
  const [checkBulk, setCheckBulk] = useState([]);
  const search = useRef();
  useEffect(() => {
    onGetDataVal(allData);
  }, [allData]);

  const onGetDataVal = (newData) => {
    let result = [...newData];
    if (search.current) {
      result = result.filter((e) => e.name.includes(search.current));
    }
    result.sort(
      (rl1, rl2) =>
        fomatDate(rl1.dueDate).valueOf() - fomatDate(rl2.dueDate).valueOf()
    );
    result.forEach(item =>{
        setDataChecked((event) => ({ ...event, [item._id]: item.checked }));
    })
    
    // result.open += 1
    setLocalState(result);
  };

  useEffect(() => {
    if (dataChecked) {
      const data = localState.filter((item) => dataChecked[item._id]);
      setCheckBulk(data);
    }
  }, [dataChecked, localState]);

  function fomatDate(date) {
    // console.log(date);
    let data = date && date.split("-");
    if (data) return new Date(data[0], data[1] - 1, data[2]);
  }

  // check
  const handleCheck = (e, index, id) => {
    const newData = [...localState];
    newData.forEach((item) => {
      if (item._id === id) {
        item.checked = e.target.checked;
      }
    });
    setLocalState(newData);
    setDataChecked((event) => ({ ...event, [id]: e.target.checked }));
    onSetItem("TodoList", JSON.stringify(newData));
  };

  const onGetData = (data) => {
    const newData = [...data];
    onGetDataVal(newData);
  };

  const hadleDeleteBulk = () => {
    let allId = Object.keys(dataChecked);
    allId = allId.filter(id => dataChecked[id])
    props.onDelete(allId);
    setDataChecked({})
  };

  const onSearch = (e) => {
    const value = e.target.value;
    search.current = value;
    onGetDataVal(allData);
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
                      onClick={(e) => handleCheck(e, index, item._id)}
                    />
                  </div>
                  <div style={{ flex: 1, margin: "auto" }}>
                    <p style={{ margin: "0 20px" }}>{item.name}</p>
                  </div>
                  <div style={{ margin: "0 10px" }}>
                    <Button
                      type="detail"
                      onClick={(e) => props.handleOpen(item._id)}
                    >
                      {item.open % 2 !== 0 ? "Collapse" : "Detail"}
                    </Button>
                  </div>
                  <div style={{ margin: "0 10px" }}>
                    <Button
                      type="delete"
                      onClick={(e) => props.onDelete([item._id])}
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
      {Array.isArray(checkBulk) && checkBulk.length > 0 && (
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
          <div style={{ padding: 10 }}>
            <Button type="done">Done</Button>
          </div>
          <div style={{ padding: 10 }}>
            <Button type="delete" onClick={hadleDeleteBulk}>
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
