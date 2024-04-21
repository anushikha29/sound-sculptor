const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
function display(){
    alert("hello");
}
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
    });

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
    