import EditText from "./EditText";
import Dragger from "../ui/Dragger";
import { useReference } from "@/app/context/ReferenceContext";

function CreatedBy() {
  const { createdBy, setCreatedBy } = useReference();
  return (
    <Dragger>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: "20px",
          padding: "0px 2px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="font-sans "
      >
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "",
            padding: "",
            fontStyle: "italic",
            cursor: "move",
            textAlign: "center",
            width: "200px",
          }}
          className="font-sans text-lg w-full "
        >
          Created By
        </div>

        <EditText text={createdBy} setText={setCreatedBy} css="font-bold" />
      </div>
    </Dragger>
  );
}

export default CreatedBy;
