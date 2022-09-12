import React, { useEffect, useState } from "react";
import "./App.css";

// to get the data from locale storage

const getLocalItems = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const App = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] =useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("please fill the data")
    }else if (inputData && !toggleSubmit){
        setItems(
          items.map((elem) => {
            if(elem.id === isEditItem){
              return {...elem, name: inputData}
            }
            return elem;
          })
        )
        setToggleSubmit(true);
        setInputData('')
        setIsEditItem(null);
    }
    else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return elem.id !== index;
    });
    setItems(updateditems);
  };

  const removeAll = () => {
    setItems([]);
  };

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name)
    setIsEditItem(id);
  };

  // Add data to local storage
  // local set value data always store in string format

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="image" />
            <figcaption>Add Your List Here ✌️</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items..."
              onChange={(e) => setInputData(e.target.value)}
              value={inputData}
            />

            {toggleSubmit ? (
              <i
                className="fas fa-plus add-btn fa"
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="fas fa-edit fa-edit-alt add-btn"
                title="Edit Item"
                onClick={addItem}
              ></i>
            )}
          </div>
          <div className="showItems">
            {items.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="fa fa-edit fa-edit-alt add-btn"
                      title="Edit Item"
                      onClick={() => editItem(elem.id)}
                    ></i>
                    <i
                      className="fas fa-trash fa-trash-alt add-btn"
                      title="Delete Item"
                      onClick={() => deleteItem(elem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
          <footer>
            <h3>Copyright ©️ Vikash Chaurasia</h3>
          </footer>
        </div>
      </div>
    </>
  );
};

export default App;
