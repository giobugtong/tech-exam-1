import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function ColorManager({ defaultColor, colors }) {

    const [currentColor, setCurrentColor] = useState(defaultColor);
    const originalColor = defaultColor;

    const handleLightColor = () => {
        const lightColors = ["yellow", "white", "gold"]
        return lightColors.includes(currentColor);
    }
    
    const colorManager = {
        get: function () {
            return currentColor;
        },
        next: function () {
            let index = colors.indexOf(currentColor);
            if (index === colors.length - 1) {
                setCurrentColor(colors[0]);
            } else {
                setCurrentColor(colors[index + 1]);
            }
        },
        prev: function () {
            let index = colors.indexOf(currentColor);
            if (index === 0) {
                setCurrentColor(colors[colors.length - 1]);
            } else {
                setCurrentColor(colors[index - 1]);
            }
        },
        reset: function () {
            setCurrentColor(originalColor);
        },
    }
       
  return <>
        <div className="m-3 p-3 border rounded bg-light shadow-sm" style={{ minWidth: "320px" }}>
            <div className="mb-2 small">
                <span>
                    Original color: <b>{originalColor}</b>
                </span>
            </div>
            <div className="text-center py-5 mb-3 fs-1 fw-bold" style={{ backgroundColor: colorManager.get(), color: handleLightColor() ? "black" : "white" }}>
                {colorManager.get().toUpperCase()}
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <Button
                    variant="outline-dark"
                    onClick={() => colorManager.prev()}
                    className="px-3"
                >
                Prev
                </Button>
                <Button
                    variant="outline-dark"
                    onClick={() => colorManager.reset()}
                    className="px-3"
                    disabled={currentColor === originalColor}
                >
                Reset
                </Button>
                <Button
                    variant="outline-dark"
                    onClick={() => colorManager.next()}
                    className="px-3"
                >
                Next
                </Button>
            </div>
        </div>
  </>;
}
