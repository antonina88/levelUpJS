class Bar {
	constructor (title) {
		this.title = title;	
		this.barmens = [];
		this.waiters = [];
		this.drinks = [];
		this.tips = 0;
		this.listOrders = [];
		return this;
	}
	addEmployee(person) {
		switch(person.position){
			case "waiter": this.waiters.push(person)
			break;
			case "barmen": this.barmens.push(person)
			break;		
		}
	}
	fireEmployee(person){
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
	}
	resupplyProducts(nameDrink, count) {
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
	}
	shareTips(){
		let counter = this.barmens.length + this.waiters.length;
		return this.tips/counter;
	}
}

class Person {
	constructor(name, age){
		this.name = name;
		this.age = age;
		return this;
	}
}
class Barmen extends Person {
	constructor(name, age, coctail) {
		super(name, age);
		this.position = "barmen";
		this.crowningCocktail = coctail;
		return this;
	}
}
class Waiter extends Person {
	constructor(name, age) {
		super(name, age);
		this.position = "waiter";
		return this;
	}
	takeOrder (nameDrink, count, barName) {
		let newOrder = {
			nameDrink,
			count
		} 
		barName.listOrders.push(newOrder);

		return barName.listOrders;
	}
	executeOrder(nameDrink, count, barName){
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
	addTips (num, barName) {
		barName.tips += num;	
		return barName.tips;
	}
}

const campusBar = new Bar("Campus-bar");

const sam = new Waiter("Sam", 21);
const emma = new Waiter("Emma", 24);
const sophia = new Waiter("Sophia", 23);

const daniel = new Barmen("Daniel", 19);
const sergey = new Barmen("Sergey", 30);
const vitaliy = new Barmen("Vitaliy", 25);

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

const eachTips = campusBar.shareTips();
console.log(`Количество чаевых для каждого сотрудника бара составляет: ${eachTips}`);

console.log(campusBar); 
