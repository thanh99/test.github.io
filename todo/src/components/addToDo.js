import React, { useState, useEffect } from "react";

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
  }, []);
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(localState.name === '' || localState.description === '' ){
        alert('You must fill in all the information')
    }else{
        if(localState._id){
            const {allData} = props

        }else{
            localStorage.removeItem('TodoList')
            const body = {
                ...localState,
                _id: Math.random()
            }
            console.log(body, 'sss')
            const {allData} = props
            allData.push(body)
            console.log(allData, 'jjj')
            localStorage.setItem('TodoList', JSON.stringify(allData))
        }
    }
    console.log(localState, 'lll')
  }
  return (
    <div className="container">
      <div>
        <h4>New Task</h4>
      </div>
      <input
        type="text"
        name="name"
        onChange={changeData}
        value={localState && localState.name}
        placeholder="Add new task ..."
      />
      <div>
        <label>Description</label>
        <textarea
          rows={5}
          name="description"
          onChange={changeData}
          value={localState && localState.description}
        />
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <label>Due Date</label>
          <div>
            <input
              type="date"
              name="dueDate"
              value={localState && localState.dueDate}
              onChange={changeData}
            />
          </div>
        </div>
        <div>
          <label>Piority</label>
          <div>
            <select
              onChange={changeData}
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
      <div>
          <button style={{backgroundColor: '#007bff', color: '#FFF'}} onClick={e =>handleSubmit(e)}>Add</button>
      </div>
    </div>
  );
}
