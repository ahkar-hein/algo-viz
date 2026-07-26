export function selectionSortSteps(array) {
  const arr = [...array];
  const steps = [];

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, minIndex],
        sortedIndex: i,
        swapped: false,
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;

    steps.push({
      array: [...arr],
      comparing: [i, minIndex],
      sortedIndex: i,
      swapped: true,
    });
  }

  return steps;
}