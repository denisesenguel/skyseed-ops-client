import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { statusColorMapping } from "../config/dataConfigs";

export default function StatusTag(props) {
    
  const { status, editMode, editedProject, updateEditedProject } = props;

  return (
    <div>
      {editMode ? (
        <ButtonGroup className="rounded-pill mx-3 bg-primary-cstm">
          {Object.keys(statusColorMapping).map((item, index) => (
            <Button
              key={index}
              size="sm"
              variant="custom"
              className={`rounded-pill text-neutral-grey ${
                item === editedProject.status && "bg-secondary-cstm"
              }`}
              onClick={ () => updateEditedProject("status", item) }
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
      ) : (
        status && (
            <Button
              size="sm"
              variant="custom"
              disabled={ true }
              className={`rounded-pill text-neutral-grey bg-${statusColorMapping[status]} mx-3`}
            >
              { status }
            </Button>
        )
      )}
    </div>
  );
}
