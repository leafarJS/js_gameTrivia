"use strict";
const d = document;
const _game = d.getElementById("game");
const _scoreDisplay = d.getElementById("score");
let score = 0;
const _Agenres = [
  {
    id: 11,
    name: "Film",
  },
  {
    id: 12,
    name: "Books",
  },
  {
    id: 13,
    name: "Music",
  },
  {
    id: 14,
    name: "Video Games",
  },
  {
    id: 15,
    name: "Television",
  },
  {
    id: 16,
    name: "Musical & Theatres",
  },
  {
    id: 15,
    name: "History",
  },
  {
    id: 16,
    name: "Geography",
  },
  {
    id: 17,
    name: "Mythology",
  },
  {
    id: 18,
    name: "Animals",
  },
  {
    id: 19,
    name: "Sports",
  },
  {
    id: 20,
    name: "Computers",
  },
];
const _Aleves = ["easy", "medium", "hard"];

function addGenre(genre) {
  const column = d.createElement("div");
  column.classList.add("genre-column");
  column.innerHTML = genre.name;
  _game.append(column);

  _Aleves.forEach((level) => {
    const card = d.createElement("div");
    card.classList.add("card");
    column.append(card);

    if (level === "easy") {
      card.innerHTML = 100;
    }
    if (level === "medium") {
      card.innerHTML = 200;
    }
    if (level === "hard") {
      card.innerHTML = 300;
    }

    const url = `https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        card.setAttribute("data-question", data.results[0].question);
        card.setAttribute("data-answer", data.results[0].correct_answer);
        card.setAttribute("data-value", card.getInnerHTML());
      })
      .then((done) => card.addEventListener("click", flipCard));
  });
}
_Agenres.forEach((item) => addGenre(item));

function flipCard() {
  //console.log("click");
  this.innerHTML = "";
  const textDisplay = d.createElement("div");

  const trueBtn = d.createElement("button");
  const falseBtn = d.createElement("button");

  textDisplay.classList.add("text");
  trueBtn.classList.add("true-btn");
  falseBtn.classList.add("false-btn");

  trueBtn.innerHTML = "True";
  falseBtn.innerHTML = "False";

  trueBtn.addEventListener("click", getResult);
  falseBtn.addEventListener("click", getResult);

  textDisplay.innerHTML = this.getAttribute("data-question");

  this.append(textDisplay, trueBtn, falseBtn);

  const _Acards = Array.from(d.querySelectorAll(".card"));
  _Acards.forEach((card) => card.removeEventListener("click", flipCard));
}

function getResult() {
  const allCards = Array.from(d.querySelectorAll(".card"));
  allCards.forEach((card) => card.addEventListener("click", flipCard));

  const cardOfBtn = this.parentElement;
  //console.log(cardOfBtn);
  if (cardOfBtn.getAttribute("data-answer") === this.innerHTML) {
    score = score + parseInt(cardOfBtn.getAttribute("data-value"));
    _scoreDisplay.innerHTML = score;
    cardOfBtn.classList.add("correct-answer");
    setTimeout(() => {
      while (cardOfBtn.firstChild) {
        cardOfBtn.removeChild(cardOfBtn.lastChild);
      }
      cardOfBtn.innerHTML = cardOfBtn.getAttribute("data-value");
    }, 1000);
  } else {
    cardOfBtn.classList.add("incorrect-answer");
    setTimeout(() => {
      while (cardOfBtn.firstChild) {
        cardOfBtn.removeChild(cardOfBtn.lastChild);
      }
      cardOfBtn.innerHTML = 0;
    }, 1000);
  }
  cardOfBtn.removeEventListener("click", flipCard);
}
