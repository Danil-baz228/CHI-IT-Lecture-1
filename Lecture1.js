//task 1
// Цикл for
for (let i = 1; i <= 10; i++) {
    console.log(i);
  }
  
  // Цикл while
  let j = 1;
  while (j <= 10) {
    console.log(j);
    j++;
  }

//task 2
let array = [42, 'hello', true, null, undefined, {name: 'John'}, [1, 2, 3], 3.14, 'world', false];

// Метод forEach
array.forEach(element => console.log(typeof element));

// Цикл for
for (let i = 0; i < array.length; i++) {
  console.log(typeof array[i]);
}

// Цикл while
let k = 0;
while (k < array.length) {
  console.log(typeof array[k]);
  k++;
}

// Цикл do while
let l = 0;
do {
  console.log(typeof array[l]);
  l++;
} while (l < array.length);

//task 3
let people = [
    {name: 'John', age: 25, pets: ['cat']},
    {name: 'Jane', age: 19, pets: ['dog']},
    {name: 'Bob', age: 30, pets: []},
    {name: 'Alice', age: 17, pets: ['parrot']}
  ];
  
  let olderThan20 = people.filter(person => person.age > 20);
  console.log(olderThan20);

//task 4
let updatedPeople = people.map(person => {
    person.pets.push('fish');
    return person;
  });
  
  console.log(updatedPeople);

//task 5
// Заповнюємо масив 42
let array42 = new Array(10).fill(42);
console.log(array42);

// Вставляємо на 5-ту позицію слово "answer"
array42.splice(4, 0, "answer");
console.log(array42);

// Знаходимо слово "answer"
let foundWord = array42.find(element => element === "answer");
console.log(foundWord);

//task 6
let obj = {
    name: 'John',
    age: 25,
    city: 'Kyiv'
  };
  
  // Використання keys
  console.log(Object.keys(obj));
  
  // Використання hasOwnProperty
  console.log(obj.hasOwnProperty('age')); // true
  console.log(obj.hasOwnProperty('country')); // false
  
  // Використання values
  console.log(Object.values(obj));
