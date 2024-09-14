import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useValues } from "@/app/context/ValueContext";
import { useData } from "@/app/hooks/useData";
import { FileText } from "lucide-react";

const CSVPasteComponent = ({ content }: { content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [csvData, setCSVData] = useState("");
  const { setEntityValue, getEntityValue, setType, type } = useValues();
  const { data, fetchData } = useData(content);
  const [placeholderText, setPlaceholderText] = useState("");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data.length > 0) {
      const existingData = data
        .map((item) => {
          const name = item.properties.name;
          const value = getEntityValue(content, name) || "";
          return `${name},${value}`;
        })
        .join("\n");
      setPlaceholderText(
        `Enter data for ${content} (name,value):\n${existingData}`
      );
      setCSVData(existingData);
    }
  }, [data, content, getEntityValue]);

  const handleOpenDialog = () => setIsOpen(true);
  const handleCloseDialog = () => setIsOpen(false);

  const handleCSVChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCSVData(event.target.value);
  };

  const handleInputChange = useCallback(
    (name: string, value: string) => {
      if (value === "") {
        setEntityValue(content, name, null);
      } else if (Number(value) || Number(value) === 0) {
        setEntityValue(content, name, value);
      } else {
        if (type !== "class") {
          const confirmChange = window.confirm(
            "Do you want to change the type to category (e.g., Rivers, Lakes, etc.)?"
          );
          if (confirmChange) {
            setType("class");
          } else {
            return;
          }
        }
        setEntityValue(content, name, value);
      }
    },
    [content, setEntityValue, setType, type]
  );

  const handleSubmit = () => {
    const rows = csvData.trim().split("\n");
    rows.forEach((row) => {
      const [name, value] = row.split(",").map((item) => item.trim());
      if (name) {
        handleInputChange(name, value);
      }
    });
    handleCloseDialog();
  };

  return (
    <>
      <button
        onClick={handleOpenDialog}
        className="p-1.5 rounded-lg transition-all text-sm bg-gray-50/10 text-gray-700 flex gap-x-2 items-center border-gray-300 border hover:border-blue-500 hover:text-blue-500 ease-in-out max-w-full shadow-sm my-3"
      >
        <FileText size={16} />
        Paste CSV Data
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-normal">Enter your Data</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              value={csvData}
              onChange={handleCSVChange}
              className="resize-none"
              style={{ fontWeight: "normal" }}
              placeholder={placeholderText}
              rows={10}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleCloseDialog} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CSVPasteComponent;
