import * as React from "react";
import type { ParserContact } from "./parse";

const headerClassName = "text-left font-bold";

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className={headerClassName}>{children}</th>
);
export function LogViewer({ contacts }: { contacts: ParserContact[] }) {
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
          {contacts.map((contact) => {
            return (
              <tr>
                <td>{contact.call}</td>
                <td>{contact.qsoDate}</td>
                <td>{contact.timeOn}</td>
                <td>{contact.freq}</td>
                <td>{contact.mode}</td>
                <td>{contact.sotaRef}</td>
                <td>{contact.wwffRef}</td>
                <td>{contact.potaRef}</td>
                <td>{contact.mySotaRef}</td>
                <td>{contact.myWwffRef}</td>
                <td>{contact.myPotaRef}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
