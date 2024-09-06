import Dragger from "../ui/Dragger";
import EditText from "./EditText";
import { useReference } from "@/app/context/ReferenceContext";

function DataSource() {
  const { source, setSource } = useReference();
  return (
    <Dragger>
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          left: "100px",
          padding: "10px",
          fontStyle: "italic",
          cursor: "move",
        }}
        className="font-sans text-lg hover:cursor-move hover:border hover:border-black hover:p-1 rounded-lg  "
      >
        <p>Source</p>
        <EditText text={source} setText={setSource} s={"15"} css="text-left" />
      </div>
    </Dragger>
  );
}

export default DataSource;
