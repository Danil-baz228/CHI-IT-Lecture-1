// Виправлення 1: використовуємо  call и bind в getData
const obj = {
  name: 'John',
  age: 30,
  getData: function() {
    console.log(`Person name is: ${this.name} and age ${this.age}`);
  }
};

obj.getData();

// використовуємо call для вызова метода getData с объектом obj
function callGetData() {
  obj.getData.call(obj); // використовуємо call
}

callGetData();


const boundGetData = obj.getData.bind(obj);
boundGetData(); // використовуємо bind


// Виправленя 2: Перенос инкремента в кінці в addParamsToRequest
function addParamsToRequest(params) {
  let count = 0;

  return function(data) {
    const result = {
      ...params,
      data: data,
      count: count
    };
    count++; 
    return result;
  };
}

const sendData = addParamsToRequest({ 'access-token': 'qwerty' });
const result1 = sendData({ key: 'value' });
console.log(result1); 
const result2 = sendData({ key: 'anotherValue' });
console.log(result2);


const root = {
  name: 'root',
  type: 'folder',
  children: [
      {
          name: 'folder 1',
          type: 'folder',
          children: [
              {
                  name: 'folder 2',
                  type: 'folder',
                  children: [
                      {
                          name: 'file 3',
                          type: 'file',
                          size: 30
                      }
                  ]
              }
          ]
      },
      {
          name: 'file 1',
          type: 'file',
          size: 10
      },
      {
          name: 'file 2',
          type: 'file',
          size: 20
      }
  ]
};

function findFiles(node) {
  let files = [];
  if (node.type === 'file') {
      files.push(node.name);
  } else if (node.children) {
      node.children.forEach(child => {
          files = files.concat(findFiles(child)); 
      });
  }
  return files;
}

const files = findFiles(root);
console.log(files); 


function Person(name, phone) {
  this.name = name;
  this.phone = phone;
}

Person.prototype.introduce = function() {
  console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
};

function Student(name, phone, course) {
  Person.call(this, name, phone); 
  this.course = course;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.study = function() {
  console.log(`Я навчаюся на ${this.course} курсі.`);
};

function Teacher(name, phone, subject) {
  Person.call(this, name, phone); 
  this.subject = subject;
}

Teacher.prototype = Object.create(Person.prototype);
Teacher.prototype.teach = function() {
  console.log(`Я викладаю ${this.subject}.`);
};

const student1 = new Student('Alice', '123-456', '3');
student1.introduce(); 
student1.study();

const teacher1 = new Teacher('Bob', '789-012', 'Mathematics');
teacher1.introduce(); 
teacher1.teach(); 


class PersonES6 {
  constructor(name, phone) {
      this.name = name;
      this.phone = phone;
  }

  introduce() {
      console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
  }
}

class StudentES6 extends PersonES6 {
  constructor(name, phone, course) {
      super(name, phone); 
      this.course = course;
  }

  study() {
      console.log(`Я навчаюся на ${this.course} курсі.`);
  }
}

class TeacherES6 extends PersonES6 {
  constructor(name, phone, subject) {
      super(name, phone);
      this.subject = subject;
  }

  teach() {
      console.log(`Я викладаю ${this.subject}.`);
  }
}

const student2 = new StudentES6('Alice', '123-456', '3');
student2.introduce(); 
student2.study(); 

const teacher2 = new TeacherES6('Bob', '789-012', 'Mathematics');
teacher2.introduce(); 
teacher2.teach();
