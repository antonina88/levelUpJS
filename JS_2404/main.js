//--------------------- Задание 2 --------------------------------------
/* Написать функцию, которая будет принимать строку (только буквы латинского алфавита) любой длины и возвращать ее, 
но удалив из нее все гласные буквы английского алфавита. (их всего 6:  «A», «E», «I», «O», «U», «Y») */

function deleteVowelFromString (str) {
	if (typeof str == "string") {
		str = str.toLowerCase();
		var arrayFromStr = str.split("");
	}
	else return alert("Аргумент функции должен быть строкового типа");
	
	let isLatin = arrayFromStr.every(function(elem1){
		 return (('a' <= elem1) && (elem1 <= 'z'));
	})
	var arrVowel = ["a", "e", "i", "o", "u", "y"];

	if(isLatin){
		let result = arrayFromStr.filter(function(item){
			return !arrVowel.includes(item);
		})
		result = result.join(' ');
		console.log("строка без гласных букв: " + result);	
	}
	else  return alert("строка должна содержать только латинские символы");
}
deleteVowelFromString("abbanooiteeeghdiolpk");


//--------------------- Задание 3 --------------------------------------
/* Написать функцию, которая будет принимать произвольное количество аргументов и возвращать массив 
строк. Каждая строка - это тип аргумента, возвращаемый оператором typeof. 
Например, f(null, undefined) -> [“object”, “undefined”] */

function stringFromTypeofElem() {
	var arg = Array.from(arguments);

	arg.forEach(function(element, i, array) {
		element = typeof element;
		return console.log(element.toString());  
	});
}
stringFromTypeofElem(1, "2", 6, true, 3.45, "false");


//--------------------- Задание 4 --------------------------------------
let nums = [1, 2, 3, 5, 8, 13, 21, 34];
let strArr = ["this", "is", "a", "very", "long", "array", "which", "has", "absolutely", "no", "sense"];

//1) Сумма удвоенных значений каждого элемента 
function sum(arr){
	const sumElem = arr.reduce((prev,curr) => prev + curr*2, 0);
	console.log(sumElem);
}
//2) Узнать, есть ли в массиве четные числа
function evenElem(arr){
	const hasEven = arr.some(num => num % 2 === 0);
	console.log(hasEven);
}
//3) Соединить элементы массива в одну строку, где слова разделены пробелами
const str = strArr.join(' ');
console.log(str);

//4) Получить новый массив, в котором к каждому элементу (строке) будет добавлено число, равное количеству символов в этой строке.
function elemLength(arr){
	const newArrStr = arr.map(element => `${element} - ${element.length}`);
	console.log(newArrStr); 
}
//5) Получить новый массив, в котором все элементы (строки) содержат 4 или более символов
function elemLengthMoreFour(arr){
	const newArr = arr.filter(element => element.length >= 4);
	console.log("массив, элементы которого длинной >= 4: " + newArr);
}
//6) Получить массив, который будет содержать только нечетные числа
function oddElement(arr){
	const oddNumb = arr.filter(element => element % 2 != 0);
	console.log("Массив из нечетных элементов: " + oddNumb);
}
//7) Сообщить, является ли сумма всех элементов больше 100
function isGreaterHundred(arr) {
	const sum = arr.reduce((prev, curr) => prev + curr) > 100;
	console.log("Сумма элементов больше 100? - " + sum);
} 
// 8) Получить новый массив, в котором все элементы будут отсортированы по количеству символов в строке по возрастанию
function sortElement(a, b) {
    return a.length - b.length;
}
console.log([...strArr].sort(sortElement));

//9) Найти индекс самого длинного слова в массиве
function indexMaxElem(arr) {
	const elemLength = arr.map(element => element.length);
	const theBiggest = Math.max(...elemLength);
	const biggestIndex = elemLength.indexOf(theBiggest);
	console.log("Индекс самого длинного слова в массиве" + biggestIndex);
}	

//10) Получить строку, которая будет содержать все элементы двух массивов перечисленных через запятую
function arrConcat(arr1, arr2){
	let newArr = [arr1, arr2].reduce((prev, curr) =>  prev.concat(curr)).join();
	console.log("Строка из двух массивов: " + newArr);
}

sum(nums);
evenElem(nums);
elemLength(strArr);

elemLengthMoreFour(strArr);
oddElement(nums);
isGreaterHundred(nums);
arrConcat(nums, strArr);
indexMaxElem(strArr);
