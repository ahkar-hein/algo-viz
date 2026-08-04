
export function insertionSort(array) {
  // Make a copy so we don't change the original array
  const arr = [...array];
 
  // Start at i = 1 because the first item (index 0)
  // is already "sorted" by itself — a single card is always in order
  for (let i = 1; i < arr.length; i++) {
 
    // key = the number we're inserting (the card we just picked up)
    let key = arr[i];
 
    // j points to the last item in the sorted part
    // (the item just before the key)
    let j = i - 1;
 
    // Shift bigger numbers to the right to make room for the key.
    // Two conditions to keep going:
    //   j >= 0        → don't go past the left edge (index 0)
    //   arr[j] > key  → only shift numbers BIGGER than the key
    while (j >= 0 && arr[j] > key) {
      // Copy arr[j] one position to the right
      arr[j + 1] = arr[j];
 
      // Move j one step left to check the next number back
      j = j - 1;
    }
 
    // The loop stopped — j is one position LEFT of where the key goes.
    // So j + 1 is the correct gap. Drop the key into it.
    arr[j + 1] = key;
  }
 
  // Return the fully sorted array
  return arr;
}