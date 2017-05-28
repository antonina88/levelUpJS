var Bar = {
	constructor (title) {
		this.title = title;	
		this.barmens = [];
		this.waiters = [];
		this.drinks = [];
		this.tips = 0;
		this.listOrders = [];
		return this;
	}
};

var Person = {
	constructor(name, age){
		this.name = name;
		this.age = age;
		return this;
	},
};

Barmen = Object.create(Person);
Barmen.constructor = function(name, age, coctail) {
	Person.constructor.apply(this, arguments);
	this.position = "barmen";
	this.crowningCocktail = coctail;
	return this;
};

Waiter = Object.create(Person);
Waiter.constructor = function(name, age) {
	Person.constructor.apply(this, arguments);
	this.position = "waiter";
	return this;
};

Bar.addEmployee = function(person) {
	switch(person.position){
		case "waiter": this.waiters.push(person)
		break;
		case "barmen": this.barmens.push(person)
		break;		
	}
};

Bar.fireEmployee = function(person){
	switch(person.position){
		case "waiter": const waiterPerson = this.waiters.find(waiterPerson => waiterPerson.name === name);
					   const index = this.waiters.indexOf(waiterPerson);
					    return this.waiters.splice(index, 1);
						break;
		case "barmen": const barmenPerson = this.barmens.find(barmenPerson => barmenPerson.name === name);
						const index2 = this.barmens.indexOf(barmenPerson);
						return this.barmens.splice(index2, 1);
						break;
		}
};	

Bar.resupplyProducts = function(nameDrink, count) {
	var newDrink = {
		nameDrink,
		count
	};
	const drink = this.drinks.find(drink => drink.nameDrink === nameDrink);

	if (drink) {
		drink.count += newDrink.count;
	}
	else {
		this.drinks.push(newDrink);
	}
	return this;
};

Bar.shareTips = function(){
	let counter = this.barmens.length + this.waiters.length;
	return this.tips/counter;
};

Waiter.takeOrder = function(nameDrink, count, barName) {
	let newOrder = {
		nameDrink,
		count
	} 
	barName.listOrders.push(newOrder);

	return barName.listOrders;
}
Waiter.executeOrder = function(nameDrink, count, barName){
	const order = barName.listOrders.find(order => order.nameDrink === nameDrink);
	
	if (!order) 
		return null;
	else {
		const drink = barName.drinks.find(drink => drink.nameDrink === order.nameDrink);

		if (drink.count < count){ 
			console.log(`Sorry, we don't have ${count}  ${drink.nameDrink}, we have only ${drink.count}`);
			count = drink.count;
		} 
	
		drink.count -= count;
	}
	return this;
}

Waiter.addTips = function(num, barName) {
	barName.tips += num;	
	return barName.tips;
}

const campusBar = Object.create(Bar).constructor("Campus-bar");

const sam = Object.create(Waiter).constructor("Sam", 21);
const emma = Object.create(Waiter).constructor("Emma", 24);
const sophia = Object.create(Waiter).constructor("Sophia", 23);

const daniel = Object.create(Barmen).constructor("Daniel", 19);
const sergey = Object.create(Barmen).constructor("Sergey", 30);
const vitaliy = Object.create(Barmen).constructor("Vitaliy", 25);


campusBar.addEmployee(sam);
campusBar.addEmployee(emma);
campusBar.addEmployee(sophia);
campusBar.addEmployee(daniel);
campusBar.addEmployee(sergey);
campusBar.addEmployee(vitaliy);

campusBar.fireEmployee(emma);
campusBar.fireEmployee(daniel);

campusBar.resupplyProducts("apple fresh", 21);
campusBar.resupplyProducts("tequila", 10);
campusBar.resupplyProducts("rum", 5);
campusBar.resupplyProducts("brandy", 2);

console.log(campusBar); 

sam.takeOrder("apple fresh", 5, campusBar);
emma.takeOrder("tequila", 1, campusBar);
sophia.takeOrder("brandy", 1, campusBar);

sam.executeOrder("apple fresh", 5, campusBar);
emma.executeOrder("tequila", 1, campusBar);
sophia.executeOrder("brandy", 3, campusBar);

sam.addTips(200, campusBar);
emma.addTips(100, campusBar);
sophia.addTips(150, campusBar);

let eachTips = campusBar.shareTips();
console.log(`Количество чаевых для каждого сотрудника бара составляет: ${eachTips}`);

console.log(campusBar); 


