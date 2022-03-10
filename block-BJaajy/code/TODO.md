- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

```js
const user1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Ashwini'), 1000)
});
const user2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Suman'), 2000)
});
const user3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Saurabh'), 3000)
});
const user4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Shweta'), 4000)
});

let all = Promise.all([user1, user2, user3, user4])
  .then((res) => console.log(res))
  .catch((error) => console.error(error));

```

- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

```js
const usernames = ['sophiebits', 'getify', 'gaearon', 'AArnott', 'piranha',];

const usernameData = Promise.all(
  usernames.map((user) => 
    fetch(`https://api.github.com/users/${user}`).then((res) => res.json())
  )
).then((users) => console.log(users));
```

- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

let all = Promise.allSettled([one, two, three])
  .then((res) => console.log(res))
  .catch((error) => console.error(error));
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);

// Promise {<pending>}
// ['Arya', 'Sam', {…}]
// 1 sec
```
