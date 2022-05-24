import * as React from "react";

export function LogEditor({
  logText,
  onChange,
}: {
  logText: string;
  onChange: (logText: string) => void;
}) {
  return (
    <div>
      <textarea
        className="w-full border h-full p-2"
        value={logText}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
