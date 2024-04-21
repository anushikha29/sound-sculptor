document.addEventListener('DOMContentLoaded', (event) => {
  const moodButtons = document.querySelectorAll('.mood-button');
  moodButtons.forEach((button) => {
      button.addEventListener('click', () => {
          button.classList.toggle('selected');
      });
  });
});
document.addEventListener('DOMContentLoaded', (event) => {
  const moodButtons = document.querySelectorAll('.genre-button');
  moodButtons.forEach((button) => {
      button.addEventListener('click', () => {
          button.classList.toggle('selected');
      });
  });
});
var nextButton = document.querySelector('.next3-button');
nextButton.addEventListener('click', function() {
    var sliderIds = ['Acoustic', 'Energy', 'Instrumental', 'Loud', 'Popular', 'Tempo'];
    var sliderValues = {};
    sliderIds.forEach(function(id) {
        var slider = document.getElementById(id);
        sliderValues[id] = slider.value;
    });
    console.log(sliderValues);
});
