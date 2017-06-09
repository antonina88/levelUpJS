//Задание 1
let str = "2016/05/20-12:00:35+0300";

let regDate = /(\d{4}(?=\/))\/(\d{2})\/(\d{2})/g;
let regTime = /\d{2}:\d{2}:\d{2}/g;

let date = regDate.exec(str)
let time = regTime.exec(str);

let date2 = date[0].replace(/\//g, "-");
let fullDate = date2+" " + time; 

let objDate = new Date(fullDate);
console.log(objDate.getTime());

//Задание 2
let str2 = "apple:2016/5/27__bid_203.38-ask_203.43|2016/5/28__bid_203.35-ask_203.42|2016/5/28__bid_203.39-ask_203.45";
let strArr = str2.split(":");
let re = /(\d{4}\/\d{1,2}\/\d{1,2})__bid_(\d{1,}.?\d{1,})-ask_(\d{1,}.?\d{1,})/g;

function Brand(brandName) {
	this.stockName = brandName,
	this.rates = []
} 
Brand.prototype.addRate = function(reg, str) {
	let newRate = {};
	let data;
	while ((data = re.exec(str)) !== null)  {
		newRate = {
			data: data[1],
			bid: data[2],
			ask: data[3]
		} 
		this.rates.push(newRate);	
	}
}
let firstBrand = new Brand(strArr[0]);
firstBrand.addRate(re, strArr[1]);

console.log(firstBrand);