///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    key: "dee8f90237b443d887961e7a542bbb5e",
    src: jokeString,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Assign One or Two Part Joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Passing Joke to VoiceRSS API
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Error Here
    console.log("whoops", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
