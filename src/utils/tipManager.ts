// Create an array of tip keys
const tipKeys = Array.from({ length: 50 }, (_, i) => `tips.tip_${i + 1}`);

// Fisher-Yates shuffle algorithm
const shuffle = (array: string[]) => {
  let currentIndex = array.length;
  let randomIndex;

  // While elements remain to be shuffled
  while (currentIndex !== 0) {
    // Pick a random remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element
    if (randomIndex !== undefined && currentIndex < array.length) {
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex]!,
        array[currentIndex]!,
      ];
    }
  }

  return array;
};

// Initialize the shuffled tips and index
let shuffledTips = shuffle([...tipKeys]);
let currentIndex = 0;

const getTip = () => {
  // Reshuffle if we've reached the end
  if (currentIndex >= shuffledTips.length) {
    shuffledTips = shuffle([...tipKeys]);
    currentIndex = 0;
  }

  // Get the next tip and increment the index
  const tipKey = shuffledTips[currentIndex];
  currentIndex++;

  // Return the localized tip string
  return tipKey || "Hmmm...";
};

export { getTip };
