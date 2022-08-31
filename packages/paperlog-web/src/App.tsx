import * as React from "react";
import { useState } from "react";
import { LogEditor } from "./LogEditor";
import { LogViewer } from "./LogViewer";
import { parse, ParseResult } from "paperlog";
import "./App.css";
export function App() {
  const [logText, setLogText] = useState(localStorage.getItem("logText") || "");
  let contacts: Array<ParseResult> = [];

  const onChange = (newLogText: string) => {
    localStorage.setItem("logText", newLogText);
    setLogText(newLogText);
  };

  try {
    contacts = parse(logText);
  } catch (e: unknown) {
    console.warn(e);
  }

  return (
    <div className="Layout">
      <div className="Header text-xl">Paperlog</div>
      <LogEditor logText={logText} onChange={onChange} />
      {contacts && <LogViewer contacts={contacts} />}
    </div>
  );
}
