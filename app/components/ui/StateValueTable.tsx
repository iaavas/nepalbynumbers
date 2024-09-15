"use client";
import TextField from "@mui/material/TextField";
import { useValues } from "../../context/ValueContext";
import Table from "./Table";
import Postfix from "./Postfix";
import ImportData from "./ImportData";
import { useSearch } from "@/app/context/SearchContext";
import Collapsibles from "./Collapsibles";

const StateValueTable = ({ content }: { content: string }) => {
  const { title, setTitle } = useValues();
  const { query, setQuery } = useSearch();

  return (
    <div className="flex  flex-col w-96 py-4 gap-4">
      <textarea
        onChange={(e) => setTitle(e.target.value)}
        onResize={() => {}}
        wrap="hard"
        value={title}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder="Infographic Title"
        cols={100}
        rows={1}
      />
      <span className="font-sans  text-md">Add Perfix or Postfix</span>
      <Postfix />
      <ImportData content={content} />
      <span className="font-sans text-lg">Search Query</span>
      <input
        value={query}
        className="w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 "
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
