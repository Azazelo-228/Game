const item = document.querySelector(".item"),
  time = document.querySelector(".time"),
  score = document.querySelector(".score"),
  startBtn = document.querySelector(".start__button"),
  res = document.querySelector(".result"),
  gameAgainBtn = document.querySelector(".result__button"),
  resScore = document.querySelector(".result__score-span");

const shapes = [
  {
    name: `triangle`,
    style: `clip-path: polygon(50% 0%, 0% 100%, 100% 100%);`,
  },
  {
    name: `rhombus`,
    style: `clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);`,
  },
  {
    name: `circle`,
    style: `clip-path: circle(50% at 50% 50%);`,
  },
  {
    name: `star`,
    style: `clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);`,
  },
  {
    name: `decagon`,
    style: `clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%);`,
  },
  {
    name: "diamond",
    style: `clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`,
  },
];

let random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
let scoreCount = 0;
function randomGradient() {
  let hue = random(0, 359);
  let shift = random(30, 60);
  let angle = random(0, 359);

  let color1 = `hsl(${hue}, 85%, 65%)`;
  let color2 = `hsl(${hue + shift}, 85%, 60%)`;

  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}
item.style.background = randomGradient();

function Timer() {
  let timer = 20000;
  let interval = setInterval(() => {
    timer -= 1000;
    time.textContent =
      timer / 1000 < 10 ? `00:0${timer / 1000}` : `00:${timer / 1000}`;
    if (timer <= 0) {
      clearInterval(interval);
      gameStop();
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  Timer();
  spawnItem();
  startBtn.classList.remove("active");
});

function spawnItem() {
  let size = random(30, 80);
  item.style.width = `${size}px`;
  item.style.height = `${size}px`;
  let top = random(0, 570 - size);
  let left = random(0, 1000 - size);
  item.style.top = `${top}px`;
  item.style.left = `${left}px`;
  item.style.background = randomGradient();
  let shape = shapes[random(0, shapes.length - 1)];
  item.style.cssText += shape.style;
}
item.addEventListener("click", clickItem);

function clickItem() {
  scoreCount += 10;
  score.innerHTML = `${scoreCount}`;
  spawnItem();
}

function gameStop() {
  item.style.width = `0`;
  item.style.height = `0`;
  res.classList.add("active");
  resScore.innerHTML = `${scoreCount}`;
}
gameAgainBtn.addEventListener("click", () => {
  res.classList.remove("active");
  startBtn.classList.add("active");
  time.textContent = `00:20`;
  scoreCount = 0;
  score.innerHTML = 0
});
