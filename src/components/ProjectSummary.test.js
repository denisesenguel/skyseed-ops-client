import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectSummary from "./ProjectSummary";

test("on initial render in view mode, form fields should be disabled", () => {
  render(
    <ProjectSummary
      editMode={false}
      editedProject={{}}
      updateEditedProject={() => console.log("project updated")}
    />
  );
  expect(screen.getByLabelText(/Kurzbeschreibung/i)).toBeDisabled();
  expect(screen.getByLabelText(/größe/i)).toBeDisabled();
  expect(screen.queryByRole("button", { name: /Add more/i })).toBeNull();
});

test("on initial render in edit mode, form fields should be enabled", () => {
  render(
    <ProjectSummary
      editMode={true}
      editedProject={{}}
      updateEditedProject={() => console.log("project updated")}
    />
  );
  expect(screen.getByLabelText(/Kurzbeschreibung/i)).toBeEnabled();
  expect(screen.getByLabelText(/Größe/i)).toBeEnabled();
  expect(screen.getByRole("button", { name: /Add more/i })).toBeEnabled();
});

test("on changing input fields in edit mode, editedProject is updated", () => {
  render(
    <ProjectSummary
      editMode={true}
      editedProject={{}}
      updateEditedProject={() => console.log("project updated")}
    />
  );
  const descriptionField = screen.getByLabelText(/Kurzbeschreibung/i);
  const sizeField = screen.getByLabelText(/Größe/i);
  userEvent.type(descriptionField, "Some description");
  userEvent.type(sizeField, "54.2");
  expect(descriptionField).toHaveValue("Some description");
  expect(sizeField).toHaveValue(54.2);
});

test("on clicking Add More below Project Managers, input field appears", () => {
  render(
    <ProjectSummary
      editMode={true}
      editedProject={{}}
      updateEditedProject={() => console.log("project updated")}
    />
  );
  const addMoreButton = screen.getByRole("button", { name: /Add more/i });
  userEvent.click(addMoreButton);
  expect(screen.getByRole("combobox")).toBeEnabled();
});
