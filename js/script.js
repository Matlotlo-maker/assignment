let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

const words = ["Satisfied Client", "Reaching out", "Subscribing."];
const typingSpeed = 100; // typing speed in ms per character
const delayBetweenWords = 1000; // delay in ms before the next word starts
const typewriterText = document.getElementById("typewriter-text");

let currentWordIndex = 0;
let currentCharIndex = 0;

function type() {
  const currentWord = words[currentWordIndex];

  if (currentCharIndex < currentWord.length) {
    // Add the next character to the display
    typewriterText.textContent += currentWord[currentCharIndex];
    currentCharIndex++;
    setTimeout(type, typingSpeed);
  } else {
    // Clear the word after a delay and move to the next word
    setTimeout(() => {
      typewriterText.textContent = "";
      currentCharIndex = 0;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      setTimeout(type, typingSpeed);
    }, delayBetweenWords);
  }
}

// Start the typewriter effect
type();