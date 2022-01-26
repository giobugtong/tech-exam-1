import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import ColorManager from '../Components/ColorManager';

export default function Task1() {
  const colors = ["red", "green", "blue", "yellow", "deeppink", "gold", "gray", "black", "white", "purple"];

  const [ colorManagers, setColorManagers ] = useState([]);
  const [ colorSelection, setColorSelection ] = useState();

  const handleCreateColorManager = (e) => {
    e.preventDefault();
    if (!colorSelection) return;
    const newElement = <ColorManager key={colorManagers.length + 1} defaultColor={colorSelection} colors={colors} />;
    const newArray = [...colorManagers];
    newArray.push(newElement);
    setColorManagers(newArray);
  }

  return <>
    <h1 className="text-center">Task 1 - Color Manager</h1>
    <div className="mt-4 mb-2 mx-auto px-2" style={{ maxWidth: "600px"}}>
      <Form onSubmit={e => handleCreateColorManager(e)}>
      <div className="d-flex justify-content-between justify-content-md-around align-items-center">
        <FloatingLabel
          controlId="floating-select"
          label="Select Color"
        >
          <Form.Select
            onChange={e => setColorSelection(e.target.value)}
            style={{ minWidth: "250px"}}
            required
          >
          <option value="" defaultValue disabled={colorSelection}>-</option>
          {
            colors.map((item, index) => {
              return <option key={index} value={item}>{item}</option>
            })
          }
          </Form.Select>
        </FloatingLabel>
        <Button
          type="submit"
          variant="dark"
          className="px-2 px-md-4"
          disabled={colorManagers.length === 20}
        >
          Create
        </Button>
      </div>
      </Form>
    </div>
      {
        colorManagers.length === 20 &&
        <div className="mb-2 mt-4 text-center text-danger">
          Max number of color managers reached!
        </div>
      }
      {
        colorManagers.length > 0 &&
        <div className="small d-flex justify-content-between justify-content-sm-center mt-4">
          <div className="me-sm-5">
            There {colorManagers.length > 1 ? "are" : "is"} currently <b>{colorManagers.length}</b> color manager{colorManagers.length > 1 ? "s" : ""}.
          </div>
          <Button
            variant="danger"
            size="sm"
            className="ms-sm-5 d-block"
            onClick={() => setColorManagers([])}
          >
            Clear
        </Button>
        </div>
      }
      {
        colorManagers.length === 0 &&
        <div className="my-5 text-center">
          Select a color then press Create!
        </div>
      }
      <div className="py-3 ps-2 d-flex flex-wrap justify-content-center align-items-center mx-auto" style={{ maxWidth: "1200px" }}>
        {colorManagers}
      </div>
  </>;
}
