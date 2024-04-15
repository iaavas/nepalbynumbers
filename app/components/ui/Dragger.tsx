import Draggable from "react-draggable";
import { DraggerProps } from "../../interfaces/DraggerTypes";

function Dragger({ children }: DraggerProps) {
  return (
    <div className="cursor-move">
      <Draggable>{children}</Draggable>
    </div>
  );
}

export default Dragger;
