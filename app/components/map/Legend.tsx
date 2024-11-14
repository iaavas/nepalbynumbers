import Dragger from "../ui/Dragger";
import EditText from "./EditText";
import ColorBar from "./ColorBar";
import { useValues } from "@/app/context/ValueContext";
import { useSettings } from "@/app/context/SettingsContext";

function Legend({ scale, content }: { scale: any; content: string }) {
  const { title, setTitle } = useValues();
  const { displayLegend } = useSettings();
  return (
    <Dragger>
      <div className="flex flex-col justify-end items-center font-sans p-2.5 gap-y-2 text-center">
        <EditText text={title} setText={setTitle} css="text-center" s="20" />
        {displayLegend && scale && (
          <ColorBar colorScale={scale} content={content} />
        )}
      </div>
    </Dragger>
  );
}

export default Legend;
