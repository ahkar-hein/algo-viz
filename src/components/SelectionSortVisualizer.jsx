import { useState, useEffect } from "react";
import { selectionSortSteps } from "../algorithms/selectionSortSteps";

export default function SelectionSortVisualizer() {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 10);
    }
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const startSort = () => {
    const recordedSteps = selectionSortSteps(array);
    setSteps(recordedSteps);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    generateArray();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStep(currentStep + 1);
    }, 300);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps]);

    const currentFrame = steps.length > 0 && steps[currentStep]
    ? steps[currentStep]
    : null;

    const displayArray = currentFrame ? currentFrame.array : array;
    const comparing = currentFrame ? currentFrame.comparing : [];
    const sortedIndex = currentFrame ? currentFrame.sortedIndex : -1;

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ color: "#fff", fontSize: "24px", textAlign: "center", marginBottom: "24px" }}>
        Selection Sort
        </h2>

        {/* Bars */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "6px", height: "300px", marginBottom: "24px" }}>
        {displayArray.map((value, index) => {
            const isComparing = comparing.includes(index);
            const isSorted = index < sortedIndex;

            let barColor = "#3b82f6"; // blue default
            if (isSorted) barColor = "#22c55e";      // green if sorted
            else if (isComparing) barColor = "#fbbf24"; // yellow if comparing

            return (
            <div
                key={index}
                style={{
                width: "40px",
                height: `${value * 2}px`,
                background: barColor,
                borderRadius: "4px 4px 0 0",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                color: "#fff",
                fontSize: "12px",
                paddingTop: "4px",
                transition: "height 0.2s, background 0.2s",
                }}
            >
                {value}
            </div>
            );
        })}
    </div>

        {/* Buttons */}
        <div style={{ textAlign: "center" }}>
        <button
            onClick={generateArray}
            style={{ padding: "10px 20px", background: "#6b7280", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600", marginRight: "8px" }}
        >
            Generate New Array
        </button>
        <button
            onClick={startSort}
            disabled={isPlaying}
            style={{ padding: "10px 20px", background: isPlaying ? "#93c5fd" : "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", cursor: isPlaying ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: "600" }}
        >
            {isPlaying ? "Sorting..." : "Sort"}
        </button>
        </div>
    </div>
  );
}