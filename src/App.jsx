import BubbleSortVisualizer from "./components/BubbleSortVisualizer";
import SelectionSortVisualizer from "./components/SelectionSortVisualizer";
import InsertionSortVisualizer from "./components/InsertionSortVisualizer";
import { quickSort } from "./algorithms/quickSort";
function App() {
  console.log("Quick:", quickSort([5, 3, 8, 4, 7, 1]));
  console.log("Reverse:", quickSort([5, 4, 3, 2, 1]));
  console.log("Sorted:", quickSort([1, 2, 3, 4]));
  console.log("Duplicates:", quickSort([3, 1, 3, 1]));
  console.log("Single:", quickSort([5]));
  console.log("Empty:", quickSort([]));
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