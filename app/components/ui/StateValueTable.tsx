"use client";
import TextField from "@mui/material/TextField";
import { useValues } from "../../context/ValueContext";
import Table from "./Table";
import Postfix from "./Postfix";
import ImportData from "./ImportData";
import { useSearch } from "@/app/context/SearchContext";
import Collapsibles from "./Collapsibles";
import CSVPasteComponent from "./CSVPasteComponent";

const StateValueTable = ({ content }: { content: string }) => {
  const { title, setTitle } = useValues();
  const { query, setQuery } = useSearch();

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
      <span className="font-sans  text-md">Add Perfix or Postfix</span>
      <Postfix />
      <ImportData content={content} />
      <span className="font-sans text-lg">Search Query</span>
      <TextField
        id="outlined-basic"
        label="Search"
        value={query}
        fullWidth
        size="small"
        className="w-48"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div
        style={{
          overflow: "auto",
          height: "24rem",
          display: "",
          marginTop: "12px",
        }}
        className=""
      >
        <Table content={content} />
      </div>
      <Collapsibles map={content as string} />
    </div>
  );
};

export default StateValueTable;
