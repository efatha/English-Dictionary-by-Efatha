const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () =>{
  let inputword = document.getElementById("inp-word").value;
  console.log(inputword);
  fetch(`${url}${inputword}`)
  .then((response)=> response.json())
  .then((data) =>{
    console.log(data);
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
            sound.setAttribute("src",`https:${data[0],phonetics[0].audio}`)
          console.log(sound);
  });
});
function playSound(){
  sound.play();
}