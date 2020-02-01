const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

// type method
TypeWriter.prototype.type = function () {
  // Current index
  const current = this.wordIndex % this.words.length;

  // Get full text of current word
  const fulltxt = this.words[current];

  // check if deleting
  if (this.isDeleting) {
    // remove char
    this.txt = fulltxt.substring(0, this.txt.length - 1);
  } else {
    // add char
    this.txt = fulltxt.substring(0, this.txt.length + 1);
  }

  // insert text into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

  //init type speed
  let typeSpeed = 200;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // if word is complete
  if (!this.isDeleting && this.txt === fulltxt) {
    // make pause at end
    typeSpeed = this.wait;
    // set is deleting to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // move to next word
    this.wordIndex++;
    // pasuse
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
}

// init on DOM load
document.addEventListener('DOMContentLoaded', init);

//init App

function init() {
  const txtElement = document.querySelector(".txt_type");
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // init typewriter
  new TypeWriter(txtElement, words, wait);

}

