Date.prototype.getCustomFormat = function(str){
	let arrStr = str.split(" ");
	let month = ["january", "february", "march", "april", "may", "june", "july", "august","september","october","november"];
	let date, time;

	let splitElem = arrStr.map((strElem) => {
		return strElem.includes("-") ? date = strElem.split("-") : time = strElem.split(":");
	});

	let resDate = date.map(dateElem => {
		switch(dateElem) {
			case "YY": return this.getFullYear().toString().slice(2); break;
			case "YYYY": return this.getFullYear().toString().slice(2); break;
			case "MM": return month[this.getMonth()]; break;
			case "MMMM": return month[this.getMonth()]; break;
			case "DD": return this.getDate(); break;
		}
	}).join("-");

	let resTime = time.map(timeElem => {
		switch(timeElem) {
			case "HH": return this.getHours(); break;
			case "mm": return this.getMinutes(); break;
			case "ss": return this.getSeconds(); break;
		}
	}).join(":");

	let fullDate = resDate + " " + resTime;
	return fullDate;
}

let someDate = new Date;
let dateFormat = someDate.getCustomFormat("YY-MMMM-DD HH:mm:ss");
console.log(dateFormat);