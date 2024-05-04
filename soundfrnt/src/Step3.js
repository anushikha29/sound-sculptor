var nextButton = document.querySelector('.next3-button');
nextButton.addEventListener('click', function() {
    var sliderIds = ['Acoustic', 'Energy', 'Instrumental', 'Loud', 'Popular', 'Tempo'];
    var sliderValues = {};
    sliderIds.forEach(function(id) {
        var slider = document.getElementById(id);
        sliderValues[id] = slider.value;
    });
    console.log(sliderValues);
    window.location.href = 'Finished.html';
});
