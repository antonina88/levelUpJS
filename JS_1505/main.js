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
	last: 0.33333333
};

function transformObj(someObj) {
	let propNames = Object.keys(someObj);
	const i = Object.getOwnPropertyNames(someObj).length;

	let propValues = propNames.map(function(element){
		return this[element];
	}, someObj);
	let propTypes = propValues.map(elem => typeof elem);

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
		this[elem] = parseFloat(this[elem].toFixed(2));
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
			completed: 1,
			duration: 24,
			marks: [4, 5, 4, 5, 4]
		},
		{
			course: "css",
			teacherName: "Yuriy",
			completed: 1,
			duration: 30,
			marks: [4, 5, 5, 5, 4]
		},
		{
			course: "javascript",
			teacherName: "Yuriy",
			completed: 0.12,
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
	getCourses(){
		const allCourses = this.subjects.reduce(function(prev, curr) {
			if (prev)
				return `${prev}, ${curr.course}`;
			else 
				return `${curr.course}`;
		}, "");
		return allCourses;
	},
	addNewCourse(teacherName, course, duration) {
		let addNewCourse = {
			course: course,
			teacherName: teacherName,
			completed: 0,
			duration: duration,
			marks: []
		}
		student.subjects.push(addNewCourse);
		return student.subjects;
	},
	getAvarageMarkByCourse(course){
		const subject = this.subjects.find(subject => subject.course === course);

		const arrMarks = subject.marks;
		const totalSum = arrMarks.reduce(function(a, b){
			return a + b;
		}, 0);
		const avarage = totalSum/arrMarks.length;
		return avarage;
	},
	getAvarageMark(){
		const allMarks = this.subjects.reduce(function(prev, curr) {
			return prev.concat(curr.marks);
		}, []);
		
		const totalSum = allMarks.reduce(function(a, b){
				return a + b;
		}, 0);
		const avarage = totalSum/allMarks.length;
		return avarage;
	},
	addMark(course, mark){
		let subject = this.subjects.find(subject => subject.course === course);
		subject.marks.push(mark);
		return (subject.marks);
	},
	addProgress(course, hour){
		let subject = this.subjects.find(subject => subject.course === course);
		
		if (subject.completed === 1) return subject.completed;
		else {
			subject.completed += hour/subject.duration;
			return subject.completed;
		}
	}, 
	getProgress() {
		let subjectHtml = this.subjects.find(subject => subject.course === "html");
		const completedHtml = subjectHtml.completed * 100;
		console.log ("Курс html пройден на " + completedHtml + "%");

		let subjectCss = this.subjects.find(subject => subject.course === "css");
		const completedCss = subjectCss.completed * 100;
		console.log ("Курс css пройден на " + completedCss + "%");

		let subjectJS = this.subjects.find(subject => subject.course === "javascript");
		const completedJS = subjectJS.completed * 100;
		console.log ("Курс javascript пройден на " + completedJS + "%");
	}	
}

console.log(student.getFullName());
console.log(student.getAge());

console.log(student.getAvarageMarkByCourse("html"));
console.log(student.getAvarageMarkByCourse("css"));
console.log(student.getAvarageMarkByCourse("javascript"));

console.log(student.addMark("html", 5));
console.log(student.addNewCourse("Yuriy", "PHP", 10));

console.log(student.getCourses());
console.log("среднее арифметическое из всех оценок во всех курсах: " + student.getAvarageMark());

let progressCss = student.addProgress("css", 24);
console.log("прогресс прохождения курса CSS: " + progressCss);

let progressJS = student.addProgress("javascript", 30);
console.log("прогресс прохождения курса JS: " + progressJS);
student.getProgress();

