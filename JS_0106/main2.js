let str = "apple:2016/5/27__bid_203.38-ask_203.43|2016/5/28__bid_203.35-ask_203.42|2016/5/28__bid_203.39-ask_203.45";
let strArr = str.split(":");
let re = /(\d{4}\/\d{1,2}\/\d{1,2})__bid_(\d{1,}.?\d{1,})-ask_(\d{1,}.?\d{1,})/g;

function Brand(brandName) {
	this.stockName = brandName,
	this.rates = []
} 
Brand.prototype.addRate = function(reg, str) {
	let newRate = {};
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



