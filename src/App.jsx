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
    let newVal =  0;
    if(copyHistory.length >0 ){
      newVal = copyHistory[0].curr
    } 
    const copyRedoArr = [...redoArr];
    copyRedoArr.push(removed);

    setHistory(copyHistory);
    setRedoArr(copyRedoArr);
    setCounter(newVal)
  };

  const handleRedo = () => {
    console.log("redo clicked");

    if (redoArr.length == 0) return;

    const copyRedoArr = [...redoArr];
    const copyHistory = [...history];
    const removed = copyRedoArr.pop();
    copyHistory.unshift(removed);

    const newVal = removed.curr;

    setRedoArr(copyRedoArr);
    setHistory(copyHistory);
    setCounter(newVal);
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
    <div className="App flex flex-col min-h-screen bg-gray-100 p-6 ">
      <h1 className="mx-auto w-fit text-4xl font-bold text-gray-900 mb-6">
        {" "}
        Undoable Counter{" "}
      </h1>

      <div className="action-btn mx-auto my-6 w-fit flex space-x-20">
        <button
          onClick={() => handleUndo()}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Undo
        </button>

        <button
          onClick={() => handleReset()}
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={() => handleRedo()}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Redo
        </button>
      </div>

      <div className="user-action flex space-x-8 mx-auto w-fit">
        {[-100, -10, -1].map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleCounter(btn)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            {btn}
          </button>
        ))}

        <div className="text-3xl font-bold bg-amber-400 text-black px-6 py-3 rounded">
          {counter}
        </div>

        {[100, 10, 1].map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleCounter(btn)}
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 cursor-pointer"
          >
            {btn}
          </button>
        ))}
      </div>

      <div className=" mx-auto bg-white p-4 rounded shadow max-h-96 overflow-y-auto w-64 mt-6">
        <h1 className="text-center font-semibold text-gray-700 mb-2">HISTORY</h1>
        <div className="text-center"> {"Action "} : {"Prev"} : {"Curr"} </div>
        {history.map((item, idx) => {
          return (
            <div
              key={idx}
              className="bg-green-200 p-2 mb-1 rounded text-sm text-center"
            >
              
              {item.action } : {item.prev } : {item.curr }{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
