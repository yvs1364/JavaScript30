const play = document.querySelector(".player");
// console.log(play);
const view = play.querySelector(".viewer");
// console.log(view);
const progress = play.querySelector(".progress");
// console.log(progress);
const progressFull = play.querySelector(".progress__filled")
// console.log(progressFull);
const toggle = play.querySelector(".toggle")
// console.log(toggle);
const skipBtn = play.querySelectorAll("[data-skip]")
// console.log(skipBtn);
const playSlide = play.querySelectorAll(".player__slider")
// console.log(playSlide);
function played() {
  const active = view.paused ? "play" : "pause";
  view[active]();
}
function changeBtn() {
  const icon = view.paused ? "►" : "❚❚";
  console.log(icon)
  toggle.textContent = icon;
}
function skip() {
  view.currentTime += parseFloat(this.dataset.skip)
}
function handlePlaySlide(){
  view[this.name] = this.value;
}
function handleProgress(){
  const duree = (view.currentTime / view.duration) * 100;
  progressFull.style.flexBasis = `${duree}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * view.duration;
  view.currentTime = scrubTime;
}
view.addEventListener("click", played);
toggle.addEventListener("click", played)
view.addEventListener("play", changeBtn);
view.addEventListener("pause", changeBtn);
view.addEventListener("timeupdate", handleProgress);

skipBtn.forEach(btn => btn.addEventListener("click", skip));
playSlide.forEach(slide => slide.addEventListener("change",handlePlaySlide));
playSlide.forEach(slide => slide.addEventListener("mousemove",handlePlaySlide));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
