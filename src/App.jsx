import { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoArr, setRedoArr] = useState([]);

  const handleReset = ()=>{
    setCounter(0);
    setHistory([]);
    setRedoArr([]);
  }

  const handleUndo = () => {
    console.log("undo clicked");
    if (history.length == 0) return;

    const copyHistory = [...history];
    const removed = copyHistory.shift();
    const copyRedoArr = [...redoArr];
    copyRedoArr.push(removed);

    setHistory(copyHistory);
    setRedoArr(copyRedoArr);
  };

  const handleRedo = () => {
    console.log("redo clicked");

    if (redoArr.length == 0) return;

    const copyRedoArr = [...redoArr];
    const copyHistory = [...history];
    const removed = copyRedoArr.pop();
    copyHistory.unshift(removed);

    setRedoArr(copyRedoArr);
    setHistory(copyHistory);
  };

  const maintainHistory = (action, prev, curr) => {
    console.log(action, prev, curr);

    const obj = {
      action,
      prev,
      curr,
    };

    const copyHistory = [...history];
    copyHistory.unshift(obj);
    setHistory(copyHistory);
  };

  const handleCounter = (key) => {
    // val = parseInt(val);
    console.log(key);
    console.log(typeof key);

    const newVal = counter + key;

    maintainHistory(key, counter, newVal);
    setCounter(newVal);
  };

  return (
    <div className="App flex flex-col">
      <h1 className="mx-auto w-fit text-6xl">
        {" "}
        Undoable Counter{" "}
      </h1>

      <div className="action-btn mx-auto my-6 w-fit flex space-x-20 border border-black">
        <button
          onClick={() => handleUndo()}
          className="bg-purple-800 text-4xl cursor-pointer border border-black"
        >
          Undo
        </button>

        <button
          onClick={() => handleReset()}
          className="bg-pink-400 text-4xl cursor-pointer border border-black"
        >
          Reset
        </button>
        <button
          onClick={() => handleRedo()}
          className="bg-purple-800 text-4xl cursor-pointer border border-black"
        >
          Redo
        </button>
      </div>

      <div className="user-action flex space-x-8 mx-auto w-fit border border-black">
        {[-100, -10, -1].map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleCounter(btn)}
            className="bg-red-600 text-4xl cursor-pointer p-2"
          >
            {btn}
          </button>
        ))}

        <div className="bg-orange-400 border border-black py-2 px-8 text-4xl">
          {counter}
        </div>

        {[100, 10, 1].map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleCounter(btn)}
            className="bg-red-600 text-4xl cursor-pointer p-2"
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="history h-[400px] mx-auto my-8 w-[300px] overflow-y-scroll border border-black">
        <h1 className="text-center font-bold">HISTORY</h1>
        {history.map((item, idx) => {
          return (
            <div
              key={idx}
              className="text-center border border-black my-2 bg-green-300"
            >
              {" "}
              {item.action} : {item.prev} : {item.curr}{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
