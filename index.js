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
    result.innerHTML = ``
  });
});