import * as React from "react";
import { useState } from "react";
import { LogEditor } from "./LogEditor";
import { LogViewer } from "./LogViewer";
import { parse, ParserContact, ParserFailure } from "./parse";
export function App() {
  const [logText, setLogText] = useState(localStorage.getItem("logText") || "");
  let contacts: Array<ParserContact | ParserFailure> = [];
  let parseError = "";

  const onChange = (newLogText: string) => {
    localStorage.setItem("logText", newLogText);
    setLogText(newLogText);
  };

  try {
    contacts = parse(logText);
  } catch (e: any) {
    console.warn(e);
    parseError = e.message;
  }

  return (
    <div className="h-full">
      <div className="bg-red-50">Errors: {parseError}</div>
      <div className="h-full grid grid-cols-2">
        <LogEditor logText={logText} onChange={onChange} />
        {contacts && <LogViewer contacts={contacts} />}
      </div>
    </div>
  );
}
