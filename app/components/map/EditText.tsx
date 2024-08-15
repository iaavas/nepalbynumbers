import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextArea from "antd/es/input/TextArea";

interface EditTextProps {
  text: string;
  setText: (text: string) => void;
  css?: string;
  s?: string;
}

function EditText({ text, setText, css = "", s = "30" }: EditTextProps) {
  const [size, setSize] = useState<string>("30");

  useEffect(() => {
    setSize(s);
  }, [s, setSize]);

  return (
    <Popover>
      <PopoverTrigger>
        <pre
          className={` font-sans z-10   ${css}  cursor-move`}
          style={{
            fontSize: `${size}px`,
            maxWidth: "30rem",
          }}
        >
          {text}
        </pre>
      </PopoverTrigger>

      <PopoverContent className="w-80 z-50">
        <div className="grid gap-4">
          <div className="grid gap-2">
            {[
              { label: "Display Name", id: "name", value: text },
              { label: "Size", id: "textsize", value: size.toString() },
            ].map(({ label, id, value }) => (
              <div key={id} className="grid grid-cols-3  gap-4 font-sans">
                <Label htmlFor={id}>{label}</Label>
                <TextArea
                  id={id}
                  value={value}
                  rows={2}
                  className="col-span-2 h-8"
                  onChange={(e) =>
                    id === "name"
                      ? setText(e.target.value)
                      : setSize(e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default EditText;
