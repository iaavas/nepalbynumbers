"use client";
import React from "react";
import Draggable from "react-draggable";
import { DraggerProps } from "../../interfaces/DraggerTypes";
import { zIndex } from "material-ui/styles";

class Dragger extends React.Component<DraggerProps> {
  drgref: React.RefObject<HTMLDivElement>;

  constructor(props: DraggerProps) {
    super(props);
    this.drgref = React.createRef();
  }

  render() {
    return (
      <div
        className="cursor-move z-50 "
        ref={this.drgref}
        style={{ zIndex: 99 }}
      >
        <Draggable nodeRef={this.drgref}>{this.props.children}</Draggable>
      </div>
    );
  }
}

export default Dragger;
