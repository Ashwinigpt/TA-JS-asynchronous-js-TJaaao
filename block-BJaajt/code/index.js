// Github user

const input = document.querySelector('input');
const image = document.querySelector('.img-user');
const name = document.querySelector('h2');
const userId = document.querySelector('p');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');
const imgFollowers = document.querySelector('.img-followers');
const imgFollowing = document.querySelector('.img-following');

function displayUI(data) {
  image.src = data.avatar_url;
  name.innerText = data.name;
  userId.innerText = '@' + data.login;
  following.innerText = `Following: ${data.following}`;
  followers.innerText = `Followers: ${data.followers}`;
}

function handleChange(event) {
  if (event.keyCode === 13) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      displayUI(userData);
    };
    xhr.onerror = function () {
      console.log(`Something went wrong...`);
    };
    xhr.send();
    event.target.value = '';
  }
}

input.addEventListener('keyup', handleChange);

// Random Cat

const img = document.querySelector('.img-cat');
const reload = document.querySelector('button');
reload.addEventListener('click', () => {
  let xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://api.thecatapi.com/v1/images/search?limit=1&size=full'
  );
  xhr.onload = function () {
    let imageData = JSON.parse(xhr.response);
    img.src = imageData[0].url;
  };
  xhr.onerror = function () {
    console.log('Something went wrong...');
  };
  xhr.send();
});