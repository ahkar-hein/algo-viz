export function quickSort(array) {
  const arr = [...array];

  function sort(low, high) {
    if (low < high) {
      const pivotIndex = partition(low, high);
      sort(low, pivotIndex - 1);
      sort(pivotIndex + 1, high);
    }
  }

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
  }

  sort(0, arr.length - 1);

  return arr;
}