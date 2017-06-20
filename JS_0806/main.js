const links = Array.from(document.querySelectorAll("a"));
let reg = /name=([a-z]{1,})&lastname=([a-z]{1,})&age=(\d{1,})/ig;

let name = document.createElement("p");
let lastname = document.createElement("p");
let age = document.createElement("p");

links.forEach(function(link) {
	link.addEventListener("click", onLinkClicked);
});

function onLinkClicked(ev){
	ev.preventDefault();
	const href = this.href; 
	let user = {};
	let data;
	while ((data = reg.exec(href)) !== null) {
		user = {
			name: data[1],
			lastname: data[2],
			age: data[3]
		};
		history.pushState({user}, "page user", href);
	};
	name.textContent = `Name: ${user.name}`;
	lastname.textContent = `Last Name: ${user.lastname}`;
	age.textContent = `Age: ${user.age}`;

	document.body.appendChild(name);
	document.body.appendChild(lastname);
	document.body.appendChild(age);
}

window.addEventListener("popstate", function (ev) {
	let p = Array.from(document.querySelectorAll("p"));
	name.textContent = `Name: ${ev.state.user.name}`;
	lastname.textContent = `Last Name: ${ev.state.user.lastname}`;
	age.textContent = `Age: ${ev.state.user.age}`;

	const history = document.querySelector("#history");
    history.appendChild(name);
	history.appendChild(lastname);
	history.appendChild(age);
});

window.addEventListener("hashchange", function(ev) {
	ev.preventDefault();
	const hash = location.hash.slice(1);
	const currHref = location.href; 
	const property = hash.split("=")[0];
	const newValue = hash.split("=")[1];
	
	let data, 
		user = {};
	while ((data = reg.exec(currHref)) !== null) {
		user = {
			name: data[1],
			lastname: data[2],
			age: data[3]
		};
	}
	const objectKeys = Object.getOwnPropertyNames(user);
	const prop = objectKeys.filter(elem => {
		if (elem == property) 
			return elem;
	});
	if (user[prop] !== newValue) {
		user[prop] = newValue;
	}
	
	name.textContent = `Name: ${user.name}`;
	lastname.textContent = `Last Name: ${user.lastname}`;
	age.textContent = `Age: ${user.age}`;
	const history = document.querySelector("#history");
	history.appendChild(name);
	history.appendChild(lastname);
	history.appendChild(age);
});