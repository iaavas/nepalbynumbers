"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Dragger from "./Dragger";

function EditText({ text, setText }) {
  const [size, setSize] = useState("30");
  return (
    <Popover>
      <Dragger>
        <PopoverTrigger>
          <p
            className="font-bold bg-red-100 z-10 break-all max-w-20 "
            style={{ fontSize: `${size}px` }}
          >
            {text}
          </p>
        </PopoverTrigger>
      </Dragger>
      <PopoverContent className="w-80 z-10">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                defaultValue={"text"}
                className="col-span-2 h-8"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Size</Label>
              <Input
                id="textsize"
                defaultValue="12"
                className="col-span-2 h-8"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default EditText;
