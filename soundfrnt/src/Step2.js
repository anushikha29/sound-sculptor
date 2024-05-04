
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
document.getElementById('next2').addEventListener('click', function() {
  window.location.href = 'Step3.html';
  
});
// var nextButton = document.querySelector('.next-button');
// nextButton.addEventListener('click', function() {
//     window.location.href = 'Step2.html';

// });
  