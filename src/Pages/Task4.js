import React, { useEffect, useState } from 'react';

export default function Task4() {

  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");
  const [result4, setResult4] = useState("");
  const [newResult4, setNewResult4] = useState("");

  const createBemObject = () => {
    let result = "";
    const bemObject = {
      block: function (value) {
        result += value;
        return this;
      },
      element: function (value) {
        result += `__${value}`;
        return this;
      },
      modifier: function (value) {
        result +=`--${value}`;
        return this;
      },
      build: function () {
        let testStrings = ["__", "--"];
        let error = testStrings.includes(result.slice(0, 2));
        if (error) return "Error: no block object";
        let final = result;
        result = "";
        return final;
      }
    }
    return bemObject;
  }

  useEffect(() => {
    const bem1 = createBemObject();
    const result = bem1.block("list")
      .element("item")
      .modifier("active")
      .build();
    setResult1(result);

    const bem2 = createBemObject();
    const result2 = bem2.element("image")
      .modifier("hover")
      .build();
    setResult2(result2)

    const bem3 = createBemObject();
    const result3 = bem3.block("card")
      .element("image")
      .modifier("hover")
      .build();
    setResult3(result3)

    const bem4 = createBemObject();
    const result4 = bem4.block("span")
      .element("focus")
      .build();
    const newResult4 = bem4.block("input")
      .modifier("checked")
      .build()
    setResult4(result4);
    setNewResult4(newResult4);

  }, [])
  
  return <>
    <h1 className="text-center">Task 4 - B.E.M.</h1>
    <div className="mx-auto my-4" style={{ maxWidth: "560px"}}>
    <div className="bg-light border border-success border-5 rounded shadow p-3 ps-3 mb-4">
      <code>const = createBemObject = () =&gt; &#123;</code>
      <code className="ps-3">let result = "";</code>
      <code className="ps-3">const bemObject = &#123;</code>

      <code className="ps-4">block: function (value) &#123;</code>
      <code className="ps-5">result += value;</code>
      <code className="ps-5">return this;</code>
      <code className="ps-4">&#125;,</code>

      <code className="ps-4">element: function (value) &#123;</code>
      <code className="ps-5">result += `__$&#123;value&#125;`;</code>
      <code className="ps-5">return this;</code>
      <code className="ps-4">&#125;,</code>

      <code className="ps-4">modifier: function (value) &#123;</code>
      <code className="ps-5">result += `--$&#123;value&#125;`;</code>
      <code className="ps-5">return this;</code>
      <code className="ps-4">&#125;,</code>

      <code className="ps-4">build: function () &#123;</code>
      <code className="ps-5">let testStrings = ["__", "--"];</code>
      <code className="ps-5">let error = testStrings.includes(result.slice(0, 2));</code>
      <code className="ps-5">if  (error) return "Error: no block object";</code>
      <code className="ps-5">let final = result</code>
      <code className="ps-5">return final;</code>

      <code className="ps-4">&#125;</code>
      <code className="ps-3">&#125;</code>

      <code className="ps-3">return bemObject;</code>

      <code className="ps-2">&#125;</code>
    </div>
      {
        result1 &&
        <>
          <div className="fw-bold mb-2">Sample 1:</div>
          <div className="bg-light border border-2 border-dark rounded shadow p-3 ps-3 mb-2">
            <code>const bem1 = createBemObject();</code>
            <code>const result = bem1.block("list")</code>
            <code className="ps-2">.element("item")</code>
            <code className="ps-2">.modifier("active")</code>
            <code className="ps-2">.build();</code>
            <code>console.log(result);</code>
          </div>
          <div className="rounded mb-4 fs-5 fw-bold text-center p-3 bg-dark text-light">
            {result1}
          </div>
        </>
      }
      {
        result2 &&
        <>
          <div className="fw-bold mb-2">Sample 2:</div>
          <div className="bg-light border border-2 border-dark rounded shadow p-3 mb-2">
            <code>const bem2 = createBemObject();</code>
            <code>const result2 = bem2.element("image")</code>
            <code className="ps-2">.modifier("hover")</code>
            <code className="ps-2">.build();</code>
            <code>console.log(result2);</code>
          </div>
          <div className="rounded mb-4 fs-5 fw-bold text-center p-3 bg-dark text-light">
            {result2}
          </div>
        </>
      }
      {
        result3 &&
        <>
          <div className="fw-bold mb-2">Sample 3:</div>
          <div className="bg-light border border-2 border-dark rounded shadow p-3 ps-3 mb-2">
            <code>const bem3 = createBemObject();</code>
            <code>const result3 = bem3.block("card")</code>
            <code className="ps-2">.element("image")</code>
            <code className="ps-2">.block("hover")</code>
            <code className="ps-2">.build();</code>
            <code>console.log(result3);</code>
          </div>
          <div className="rounded mb-4 fs-5 fw-bold text-center p-3 bg-dark text-light">
            {result3}
          </div>
        </>
      }
      {
        result4 &&
        <>
          <div className="fw-bold mb-2">Sample 4:</div>
          <div className="bg-light border border-2 border-dark rounded shadow p-3 ps-3 mb-2">
            <code>const bem4 = createBemObject();</code>
            <code>const result4 = bem4.block("span")</code>
            <code className="ps-2">.element("focus")</code>
            <code className="ps-2">.build();</code>
            <code>const newResult4 = bem4.block("input")</code>
            <code className="ps-2">.modifier("checked")</code>
            <code className="ps-2">.build();</code>
            <code>console.log(result4);</code>
            <code>console.log(newResult4);</code>
          </div>
          <div className="rounded mb-4 fs-5 fw-bold text-center p-3 bg-dark text-light">
            <div>{result4}</div>
            <div>{newResult4}</div>
          </div>
        </>
      }
    </div>
  </>;
}
