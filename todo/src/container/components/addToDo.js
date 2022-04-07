import React, { useState, useEffect } from "react";
import { onSetItem, onDeleteItem, onGetItem } from "../../common/action";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function AddTodo(props) {
  const [localState, setLocalState] = useState(null);

  const changeData = (e) => {
    let newLocalState = {
      ...localState,
      [e.target.name]: e.target.value,
    };
    setLocalState(newLocalState);
  };

  useEffect(() => {
    setLocalState(props.data);
  }, [props.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localState.name === "" || localState.description === "") {
      alert("You must fill in all the information");
    } else if (localState.dueDate === null) {
      alert("You must fill in Due Date");
    } else {
      if (localState._id) {
        let allData = onGetItem("TodoList");
        allData = allData.map((item) =>
          item._id === localState._id ? localState : item
        );
        props.onGetData(allData);
        onSetItem("TodoList", JSON.stringify(allData));
      } else {
        const body = {
          ...localState,
          _id: `${Math.random()}`,
        };
        const allData = props.allData ? props.allData : [];
        allData.push(body);
        setLocalState({
          name: "",
          description: "",
          dueDate: null,
          piority: 2,
          checked: false,
          open: 0,
        });
        props.onGetData(allData);
        onSetItem("TodoList", JSON.stringify(allData));
      }
    }
  };

  const getDate = (date) => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  };

  return (
    <div>
      <Input
        name="name"
        onChange={changeData}
        value={localState && localState.name}
        placeholder="Add new task ..."
      />
      <br />
      <label style={style.text}>Description</label>
      <div style={{ marginRight: 15 }}>
        <textarea
          rows={5}
          name="description"
          style={{
            width: "100%",
            borderRadius: 5,
            border: "1px solid #BDBDBD",
            paddingRight: 15,
          }}
          onChange={changeData}
          value={localState && localState.description}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <label style={style.text}>Due Date</label>
          <div style={{ marginRight: 20 }}>
            <input
              type="date"
              name="dueDate"
              min={getDate(new Date())}
              style={{
                width: "100%",
                borderRadius: 5,
                border: "1px solid #BDBDBD",
                padding: 5,
              }}
              value={
                localState && localState.dueDate
                  ? localState.dueDate
                  : new Date()
              }
              onChange={changeData}
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <label style={style.text}>Piority</label>
          <div>
            <select
              onChange={changeData}
              style={{
                border: "#BDBDBD solid 1px",
                width: "100%",
                borderRadius: 5,
                padding: 7,
                paddingRight: 10,
              }}
              name="piority"
              value={localState && localState.piority}
            >
              <option value={1}>Low</option>
              <option value={2}>Normal</option>
              <option value={3}>High</option>
            </select>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div>
        <Button type="add" onClick={(e) => handleSubmit(e)}>
          {localState && localState._id ? "Update" : "Add"}
        </Button>
      </div>
    </div>
  );
}

const style = {
  text: {
    fontSize: 14,
    fontWeight: 800,
  },
};
