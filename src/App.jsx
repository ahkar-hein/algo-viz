import BubbleSortVisualizer from "./components/BubbleSortVisualizer";
import SelectionSortVisualizer from "./components/SelectionSortVisualizer";
import InsertionSortVisualizer from "./components/InsertionSortVisualizer";

function App() {
  return (
    <div>
      <h1 style={{ color: "#fff", textAlign: "center", padding: "24px" }}>
        AlgoViz 🧠
      </h1>
      <BubbleSortVisualizer />
      <SelectionSortVisualizer />
      <InsertionSortVisualizer />
    </div>
  );
}

export default App;