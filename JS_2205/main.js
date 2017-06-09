Date.prototype.getCustomFormat = function(str){
	let month = ["january", "february", "march", "april", "may", "june", "july", "august","september","october","november"];
	let that = this;
	const configDate = {
		YY: () => that.getFullYear().toString().slice(2),
		MM: () => month[that.getMonth()],
		DD: () => that.getDate()
	}
	const configTime = {
		HH: () => that.getHours(),
		mm: () => that.getMinutes(),
		ss: () => that.getSeconds()
	}
	const patternsDate = Object.keys(configDate);
	const patternsTime = Object.keys(configTime);	

	let newDate = patternsDate.map(function(pattern) {
		if (str.includes(pattern)) {
			return configDate[pattern]();
		}
	}).join("-");

	let newTime = patternsTime.map(function(pattern) {
		if (str.includes(pattern)) {
			return configTime[pattern]();
		}
	}).join(":");

	const fullDate = newDate + " " + newTime;
	return fullDate;
}
let currDate = new Date();
console.log(currDate.getCustomFormat("YY-MMMM-DD HH:mm:ss"));