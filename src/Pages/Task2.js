import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

export default function Task2() {

  // Input values
  const [ inputA, setInputA ] = useState("");
  const [ inputB, setInputB ] = useState("");
  const [ inputC, setInputC ] = useState("");
  const [ result, setResult ] = useState("");

  const handleComputeSum = (e) => {
    e.preventDefault();
    if (inputA && inputB && inputC) {
      let sum = parseFloat(inputA) + parseFloat(inputB) + parseFloat(inputC)
      return setResult(<>
        <div className="fs-2 text-center my-3">Result: {sum.toLocaleString()}</div>
      </>)
    }
    if (!inputA || !inputB || !inputC) {
      
    }
  }

  const handleReset = () => {
    setInputA("");
    setInputB("");
    setInputC("");
    setResult("");
  }
  

  return <div>
    <h1 className="text-center">Task 2 - Sum</h1>

    <div className="pt-5 mx-auto bg-light p-3 rounded mt-3" style={{ maxWidth: "750px" }}>
      <Form onSubmit={e => handleComputeSum(e)} onReset={handleReset}>
        <div className="d-block d-md-flex justify-content-between align-items-center sum-input-container">
          <FloatingLabel
            controlId="floating-input-a"
            className="my-2 my-md-0 shadow-sm"
            label="Input A"
          >
            <Form.Control
              type="number"
              placeholder='Input A'
              onChange={e => setInputA(e.target.value)}
              value={inputA}
              
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floating-input-b"
            className="my-2 my-md-0 shadow-sm"
            label="Input B"
          >
            <Form.Control
              type="number"
              placeholder='Input B'
              onChange={e => setInputB(e.target.value)}
              value={inputB}
              
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floating-input-c"
            className="my-2 my-md-0 shadow-sm"
            label="Input C"
          >
            <Form.Control
              type="number"
              placeholder='Input C'
              onChange={e => setInputC(e.target.value)}
              value={inputC}
              
            />
          </FloatingLabel>
        </div>
        <div className="my-3 text-center">
          <Button
            type="submit"
            variant="warning"
            className="px-4"
            disabled={!inputA || !inputB || !inputC}
          >
          Compute
          </Button>
          <Button
            type="reset"
            className="d-block my-2 mx-auto"
            variant="secondary"
            disabled={!inputA && !inputB && !inputC}
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>

    <div>
      {result}
    </div>

  </div>;
}
