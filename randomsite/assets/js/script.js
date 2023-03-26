const textList = [
    "Fix your credit",
    "Educate you",
    "Remove negative items"
  ];
  const typingSpeed = 200; // In milliseconds
  const pauseBetweenLoops = 2000; // In milliseconds
  const typewriterText = document.getElementById("typewriter-text");
  const words = textList.map(text => text.split(" "));
  let currentTextIndex = 0;
  let currentWordIndex = 0;
  
  function typeWord() {
    if (currentWordIndex < words[currentTextIndex].length) {
      typewriterText.textContent += words[currentTextIndex][currentWordIndex] + " ";
      currentWordIndex++;
      setTimeout(typeWord, typingSpeed);
    } else {
      // Finished typing current text, pause before starting next loop
      setTimeout(startNextLoop, pauseBetweenLoops);
    }
  }
  
  function startNextLoop() {
    // Reset the typewriterText content
    typewriterText.textContent = "";
  
    // Move to the next text, or restart from the first if at the end
    currentTextIndex = (currentTextIndex + 1) % textList.length;
  
    // Reset the currentWordIndex
    currentWordIndex = 0;
  
    // Start typing again
    typeWord();
  }
  
  // Start typing
  typeWord();