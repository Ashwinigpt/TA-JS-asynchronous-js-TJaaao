const input = document.querySelector('input');
const userImage = document.querySelector('.img-user');
const userName = document.querySelector('h2');
const workingAt = document.querySelector('p');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');

function displayUI(data){
   userImage.src = data
}

function handleChange(event){
    if (event.keyCode === 13) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
        xhr.onload = function () {
            let userData = JSON.parse(xhr.response);
            displayUI(userData);
        };
        xhr.onerror = function () {
            console.log('Somethind went wrong...')
        }
        xhr.send();
        event.target.value = '';
    }
}

input.addEventListener('keyup', handleChange);