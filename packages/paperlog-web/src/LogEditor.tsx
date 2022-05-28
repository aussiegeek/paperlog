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
        className="border p-2 w-full h-full"
        value={logText}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
