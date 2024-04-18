"use client";
import TextField from "@mui/material/TextField";
import { useValues } from "../../context/ValueContext";
import Table from "./Table";
import Postfix from "./Postfix";
import ImportData from "./ImportData";

const StateValueTable = ({ content }: { content: string }) => {
  const { title, setTitle } = useValues();

  return (
    <div className="flex  flex-col w-96 py-4 gap-4">
      <TextField
        id="outlined-basic"
        label="Infographic Title"
        variant="outlined"
        value={title}
        fullWidth
        size="medium"
        onChange={(e) => setTitle(e.target.value)}
      />
      <span className="font-sans font-semibold text-md">
        Add Perfix or Postfix
      </span>
      <Postfix />
      <ImportData content={content} />

      <div
        style={{
          overflow: "auto",
          height: "24rem",
          display: "inline-flex",
        }}
        className=""
      >
        <Table content={content} />
      </div>
    </div>
  );
};

export default StateValueTable;
