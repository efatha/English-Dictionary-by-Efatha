const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inputword = document.getElementById("inp-word").value;

  // Fetch the word data
  fetch(`${url}${inputword}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Display word details
      result.innerHTML = `
        <div class="word">
            <h3>${inputword}</h3>
            <button onclick="playSound()">
                <i class="fa fa-volume-up" aria-hidden="true"></i>
            </button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>${data[0].phonetic || ""}</p>
        </div>
        <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
        <p class="word-example">${data[0].meanings[0].definitions[0].example || ""}</p>`;

      // Search for American pronunciation
      const phonetics = data[0].phonetics;
      let audioSrc = "";
      
      // Loop through phonetics to find American pronunciation
      for (let i = 0; i < phonetics.length; i++) {
        if (phonetics[i].audio.includes("-us.mp3")) { // Check for American pronunciation
          audioSrc = phonetics[i].audio;
          break;
        }
      }

      // If American pronunciation not found, use the first available one
      if (!audioSrc && phonetics[0]?.audio) {
        audioSrc = phonetics[0].audio;
      }

      // Set audio if available
      if (audioSrc) {
        sound.setAttribute("src", audioSrc);
      } else {
        sound.removeAttribute("src"); // Remove if no audio available
        console.log("Audio not available for this word.");
      }
    })
    .catch(() => {
      // Display error message if word not found or API request fails
      result.innerHTML = `<h3 class="error">Couldn't find this word</h3>
        <img src="Images/photosearch.jpg" width="150px" alt="search-image" class="not_found">`;
    });
});

// Play sound function
function playSound() {
  if (sound.getAttribute("src")) {
    sound.play();  // Play sound if available
  } else {
    alert("Audio not available for this word.");
  }
}
