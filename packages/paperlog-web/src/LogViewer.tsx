import * as React from "react";
import {
  collectGlobalErrors,
  ParseResult,
  validationMessagesForResult,
} from "paperlog";

const headerClassName = "text-left font-bold";

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className={headerClassName}>{children}</th>
);

function LogError({ result }: { result: ParseResult }) {
  if ("error" in result) {
    const messages = validationMessagesForResult(result);
    return (
      <tr>
        <td colSpan={10}>
          {messages.map((message) => (
            <div key={message}>{message}</div>
          ))}
        </td>
      </tr>
    );
  }
  return null;
}
export function LogViewer({ contacts }: { contacts: Array<ParseResult> }) {
  if (contacts.length === 0) {
    return (
      <div>
        No log entries found. Do you have at least one line with a `call`
        specified?
      </div>
    );
  }

  const globalMessages = collectGlobalErrors(contacts);
  if (globalMessages.length > 0) {
    return (
      <ul>
        {globalMessages.map((msg) => (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
    );
  }
  return (
    <div>
      <table className="table table-auto w-full">
        <thead>
          <tr>
            <TableHeader>Callsign</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Time</TableHeader>
            <TableHeader>Frequency (MHz)</TableHeader>
            <TableHeader>Mode</TableHeader>
            <TableHeader>Their SOTA</TableHeader>
            <TableHeader>Their WWFF</TableHeader>
            <TableHeader>Their POTA</TableHeader>
            <TableHeader>My SOTA</TableHeader>
            <TableHeader>My WWFF</TableHeader>
            <TableHeader>My POTA</TableHeader>
          </tr>
        </thead>

        <tbody>
          {contacts.map((result, i) => {
            if ("error" in result) {
              return <LogError key={i} result={result} />;
            }
            if ("contact" in result) {
              const contact = result.contact;
              return (
                <tr key={i}>
                  <td>{contact.call}</td>
                  <td>{contact.qsoDate}</td>
                  <td>{contact.timeOn}</td>
                  <td>{contact.freq}</td>
                  <td>{contact.mode}</td>
                  <td>{contact.sotaRef}</td>
                  <td>{contact.wwffRef}</td>
                  <td>{contact["appPaperlogPotaRef"]}</td>
                  <td>{contact.mySotaRef}</td>
                  <td>{contact.myWwffRef}</td>
                  <td>{contact["appPaperlogMyPotaRef"]}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
}
