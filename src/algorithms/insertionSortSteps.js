export function insertionSortSteps(array) {
  const arr = [...array];
  const steps = [];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
     steps.push({
      array: [...arr],
      comparing: [i],
      sortedUpTo: i - 1,
      key: key,
    });

    while (j >= 0 && arr[j] > key) {
      // Record: comparing key with arr[j]
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        sortedUpTo: i,
        key: key,
      });

      arr[j + 1] = arr[j];
      j = j - 1;

      // Record: after shifting
      steps.push({
        array: [...arr],
        comparing: [j + 1],
        sortedUpTo: i,
        key: key,
      });
    }

    arr[j + 1] = key;

    // Record: key inserted
    steps.push({
      array: [...arr],
      comparing: [j + 1],
      sortedUpTo: i,
      key: key,
    });
  }
  return steps;
}