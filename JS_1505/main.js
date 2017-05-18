/* Задание 1 : Написать функцию, передав в которую исходный объект, мы получим новый объект вида:
{
  “количество собственных свойств”: 7,
  propTypes: [“number”, “string”, “function”, …, “number”],
  propNames: [“num”, “str”, …, “last”]
} 
Исходный объект после вызова функции изменяется:
a. все числовые значения свойств первого уровня (*) преобразуются в числа с плавающей точкой с двумя знаками после точки;
b. все строковые значения первого уровня преобразуются к верхнему регистру;
c. объект становится не расширяемым (нельзя добавлять новые свойства). */

let obj = {
	num: 1.24,
	str: "not very long string",
	f() {
		return this.str.split(" ")
	},
	arr: ["some", "array", {someProp: "value"}],
	prop: { key: 1 },
	empty: null,
	last: 0
};

function transformObj(someObj) {
	let propNames = Object.keys(someObj);
	let i = 0;	
	propNames.forEach(function(el){
		if (this.hasOwnProperty(el)) {
			i++;
		}
	}, someObj);
	let propValues = propNames.map(function(element){
		return this[element];
	}, someObj);
	let propTypes = propValues.map(elem => typeof(elem));

	let newObj = {
		"Количество собственных свойств" : i,
		propNames,
		propTypes 
	}

	var numElem = propNames.filter(function(elem) {
		return typeof(this[elem]) == "number"; 
	}, someObj);
	var strElem = propNames.filter(function(elem) {
		return typeof(this[elem]) == "string"; 
	}, someObj);

	numElem.forEach(function(elem) {
		this[elem] = this[elem].toFixed(2);
	}, someObj);

	strElem.forEach(function(elem) {
		this[elem] = this[elem].toUpperCase();
	}, someObj);

	console.log(newObj);
	console.log(someObj);
}

transformObj(obj);

/* Задание 2: Создать объект, который будет описывать человека. А именно, студента LevelUp. 
У Объекта есть следующие свойства:
-имя студента (строка)
-фамилия (строка)
-возраст (число)
-изучаемые предметы/курсы (массив объектов, где каждый объект - это описание отдельного курса)*/

let student = {
	surname: "Kukhta",
	name: "Antonina",
	age: 29,
	subjects : [{
			course: "html",
			teacherName: "Yuriy",
			passCourse: 1,
			duration: 24,
			marks: [4, 5, 4, 5, 4]
		},
		{
			course: "css",
			teacherName: "Yuriy",
			passCourse: 1,
			duration: 30,
			marks: [4, 5, 5, 5, 4]
		},
		{
			course: "javascript",
			teacherName: "Yuriy",
			passCourse: 0.12,
			duration: 128,
			marks: [5, 4, 3, 4]
		}		
	],
	getFullName() {
		return `${this.name} ${this.surname}`;
	},
	getAge () {
		return `${this.age} years old`;
	},
	getAvarageMarkByCourse(course){
		let subject = this.subjects.find(subject => subject.course === course);

		let arrMarks = subject.marks;
		let totalSum = arrMarks.reduce(function(a, b){
			return a + b;
		}, 0);
		let avarage = totalSum/arrMarks.length;
		return avarage;
	},
	addMark(course, mark){
		let subject = this.subjects.find(subject => subject.course === course);
		subject.marks.push(mark);
		return (subject.marks);
	},
	addProgress(course, hour){
		let subject = this.subjects.find(subject => subject.course === course);
		let progress = hour/subject.duration;
		return progress;
	}, 
	addNewCourse(teacherName, course, duration) {
		let addNewCourse = {
			course: course,
			teacherName: teacherName,
			passCourse: null,
			duration: duration,
			marks: []
		}
		student.subjects.push(addNewCourse);
		return student.subjects;
	}
}

console.log(student.getFullName());
console.log(student.getAge());

console.log(student.getAvarageMarkByCourse("html"));
console.log(student.getAvarageMarkByCourse("css"));
console.log(student.getAvarageMarkByCourse("javascript"));

console.log(student.addMark("html", 5));

let progress = student.addProgress("css", 24);
console.log("прогресс прохождения курса: " + progress);

console.log(student.addNewCourse("Yuriy", "PHP", 10));