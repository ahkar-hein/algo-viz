// ============================================
// IMPORTS
// ============================================

// useState = lets a component remember values (state)
// useEffect = runs code at certain times (on load, when values change)
// useRef = holds a value that survives re-renders (we imported it but aren't using it yet)
import { useState, useEffect } from "react";

// Import our step-recording algorithm from the algorithms folder
import { bubbleSortSteps } from "../algorithms/bubbleSortStep";


// ============================================
// COMPONENT
// ============================================
export default function BubbleSortVisualizer() {

  // ---- STATE (the component's memory) ----

  // array = the current list of bar heights being shown
  const [array, setArray] = useState([]);

  // steps = the full frame-by-frame recording from bubbleSortSteps
  const [steps, setSteps] = useState([]);

  // currentStep = which frame of the recording we are showing right now
  const [currentStep, setCurrentStep] = useState(0);

  // isPlaying = true while the animation is running, false when stopped
  const [isPlaying, setIsPlaying] = useState(false);


  // ---- FUNCTION: make a new random array of bars ----
  const generateArray = () => {
    const newArray = [];

    // Loop 10 times to create 10 bars
    for (let i = 0; i < 10; i++) {
      // Math.random() = decimal 0 to 1
      // * 100 = scale to 0-100
      // Math.floor = round down to whole number
      // + 10 = minimum height of 10 so no tiny bars
      newArray.push(Math.floor(Math.random() * 100) + 10);
    }

    setArray(newArray);      // show the new bars
    setSteps([]);            // clear any old recording
    setCurrentStep(0);       // reset to frame 0
    setIsPlaying(false);     // make sure animation is stopped
  };


  // ---- FUNCTION: start the sort animation ----
  const startSort = () => {
    // Run the algorithm — it returns the full recording of every step
    const recordedSteps = bubbleSortSteps(array);

    setSteps(recordedSteps);  // save all the frames
    setCurrentStep(0);        // start from the first frame
    setIsPlaying(true);       // begin playing
  };


  // ---- EFFECT: generate an array once when page loads ----
  // The empty [] means "run this only once, when the component first appears"
  useEffect(() => {
    generateArray();
  }, []);


  // ---- EFFECT: the animation engine ----
  // This runs every time isPlaying, currentStep, or steps changes
  useEffect(() => {
    // If not playing, do nothing
    if (!isPlaying) return;

    // If we reached the last frame, stop playing
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    // Wait 300ms, then advance to the next frame
    // (smaller number = faster animation)
    const timer = setTimeout(() => {
      setCurrentStep(currentStep + 1);
    }, 300);

    // Cleanup — cancel the timer if the component updates before it fires
    // This prevents bugs and memory leaks
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps]);


  // ---- DERIVED VALUES (calculated on each render) ----

  // displayArray = which array to show right now
  // If we have a recording, show the current frame's array
  // Otherwise show the plain unsorted array
  const displayArray = steps.length > 0 && steps[currentStep]
    ? steps[currentStep].array
    : array;

  // comparing = which two bar indexes are being compared in this frame
  // Used to highlight those bars yellow
  const comparing = steps.length > 0 && steps[currentStep]
    ? steps[currentStep].comparing
    : [];


  // ============================================
  // JSX — what shows on screen
  // ============================================
  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>

      <h2 style={{ color: "#fff", fontSize: "24px", textAlign: "center", marginBottom: "24px" }}>
        Bubble Sort
      </h2>

      {/* BARS CONTAINER */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "6px", height: "300px", marginBottom: "24px" }}>

        {/* .map() creates one bar div for each number in displayArray */}
        {displayArray.map((value, index) => {

          // Is this bar one of the two currently being compared?
          const isComparing = comparing.includes(index);

          return (
            <div
              key={index}  // React needs a unique key for each list item
              style={{
                width: "40px",
                height: `${value * 2}px`,  // taller number = taller bar
                // yellow if comparing, blue otherwise
                background: isComparing ? "#fbbf24" : "#3b82f6",
                borderRadius: "4px 4px 0 0",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                color: "#fff",
                fontSize: "12px",
                paddingTop: "4px",
                // smooth animation when height or color changes
                transition: "height 0.2s, background 0.2s",
              }}
            >
              {value}
            </div>
          );
        })}
      </div>

      {/* BUTTONS */}
      <div style={{ textAlign: "center" }}>

        {/* Generate button — makes a new random array */}
        <button
          onClick={generateArray}
          style={{ padding: "10px 20px", background: "#6b7280", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}
        >
          Generate New Array
        </button>

        {/* Sort button — starts the animation */}
        {/* disabled while playing so you can't start twice */}
        <button
          onClick={startSort}
          disabled={isPlaying}
          style={{ padding: "10px 20px", background: isPlaying ? "#93c5fd" : "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", cursor: isPlaying ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: "600", marginRight: "8px" }}
        >
          {/* button text changes based on isPlaying */}
          {isPlaying ? "Sorting..." : "Sort"}
        </button>
      </div>
    </div>
  );
}
