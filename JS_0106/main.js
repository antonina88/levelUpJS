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

let reDate = /\d{4}\/\d{1,2}\/\d{1,2}/g;
let reBid = /\d{3}.\d{2}(?=-ask)/g
let reAsk = /(\d{3,}\.\d{2,})(?!-ask)/g;
let reBrand = /^[a-z]+/g;

let dateArr = reDate.exec(str2);
let bid = reBid.exec(str2);
let ask = reAsk.exec(str2);
let brandName = reBrand.exec(str2);

function Brand(brandName) {
	this.stockName = brandName,
	this.rates = []
} 
Brand.prototype.addRate = function(data, bid, ask) {
	let newRate = {};
	for (let i = 0; i < ask.length; i++) {
		newRate = {
				data: data[i],
				bid: bid[i],
				ask: ask[i]
		} 
		this.rates.push(newRate);	
	}
}
let firstBrand = new Brand(brandName[0]);
firstBrand.addRate(dateArr,bid,ask);
console.log(firstBrand);
