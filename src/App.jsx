import { useState} from 'react'
import {useEffect} from 'react'
import {useRef} from 'react'
import { useReducer } from 'react'

import './App.css'
const initialState = [{
  name: "",
  visible: true
}];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { name: action.data, visible: true }];
    case "CHANGE":
      return state.map((item, index) => {
        if (action.index === index) {
          return { ...item, visible: !item.visible };
        }
        return item;
      });
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState('');
  const inputRef = useRef();

  const editext = (e) => {
    setName(e.target.value);
  };

  const addtask = () => {
    dispatch({ type: "ADD", data: name });
    setName('');
  };

  const hidecontent = (index) => {
    dispatch({ type: "CHANGE", index });
  };

  const enterkey = (e) => {
    if (e.key === 'Enter') {
      addtask();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <input ref={inputRef} type="text" placeholder='Type somthing here' value={name} onChange={editext} onKeyDown={enterkey} />
      {state.map((item, index) => (
        <div key={index} className='content'>
          <b>
            <p className='heading'>{item.visible ? item.name : "The Content is Hidden "}</p>
          </b>
          <button onClick={() => hidecontent(index)}>Toggle</button>
        </div>
      ))}
      <button onClick={() => inputRef.current.focus()}>Get back writing</button>
    </>
  );
}

export default App;