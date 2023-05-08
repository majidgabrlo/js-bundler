import { useState, useEffect, useLayoutEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";


const defaultCode=`import React, { useEffect, useState } from 'react'\nimport ReactDOM from 'react-dom'\n// You can import libraries and the App automaticaly fetches that from unpkg.com\n// For example you can import axios\nimport axios from 'axios'\n// Or\nimport 'tailwindcss@2.0.1/dist/tailwind.min.css'\n\n\nconst App = () => {\n  const [data, setData] = useState()\n  \n  useEffect(() => {\n    axios.get('https://jsonplaceholder.typicode.com/todos/1').then(res => setData(res.data))\n  }, [])\n\n  return <pre className="bg-blue-800 text-white">{JSON.stringify(data)}</pre>\n}\n\nReactDOM.render(<App />, document.querySelector('#root'));\n`

const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  useLayoutEffect(()=>{
    setInput(defaultCode)
  },[])

  useEffect(() => {  
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (

    <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
      <Resizable direction="horizontal">
        <CodeEditor
          initialValue={defaultCode}
          onChange={(value) => setInput(value)}
        />
      </Resizable>
      <Preview code={code} />
    </div>

  );
};

export default CodeCell;
