
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const bgColorSelector = document.getElementById("bg-color");
const inputWord = document.getElementById("inp-word");

function searchWord() {
    let inputword = inputWord.value.trim();
    if (!inputword) {
        result.innerHTML = "<p>Please enter a word to search.</p>";
        return;
    }
    fetch(`${url}${inputword}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Word not found");
            }
            return response.json();
        })
        .then((data) => {
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
                <p class="word-example">${data[0].meanings[0].definitions[0].example || "No example available."}</p>`;
            sound.setAttribute("src", data[0].phonetics[0]?.audio || "");
        })
        .catch((error) => {
            result.innerHTML = `<p>${error.message}</p>`;
        });
}

btn.addEventListener("click", searchWord);

// Allow the user to press "Enter" to trigger the search.
inputWord.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchWord();
    }
});

function playSound() {
    if (sound.src) {
        sound.play();
    } else {
        alert("No audio available for this word.");
    }
}

// Change background color based on selection.
bgColorSelector.addEventListener("change", (e) => {
    document.body.style.backgroundColor = e.target.value;
});
