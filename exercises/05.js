// ## Part 1 — Variables, Arrow Functions, Destructuring, Spread
// ### Exercise 5 — Destructuring Arrays

const genres = ["Action", "Sci-Fi", "Thriller"];

const [firstGenre] = genres;

const [first, , third] = genres;

const [firstGenreOnly, ...remainingGenres] = genres;

let a = "Action";

let b = "Comedy";

[a, b] = [b, a];

console.log(genres);

console.log(a, b);
