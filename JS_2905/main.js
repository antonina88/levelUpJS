try {
	let indexUrl = prompt("Введите пожалуйста номер персонажа");
	let reg = /[1-8][0-9]?/g;

	if (indexUrl === null) {
		throw new Error("Вы отменили действие!");
	} else if (!indexUrl.match(reg)) {
		throw new Error("Вы ввели некорректное значение, попробуйте снова");
	}

	fetch(`http://swapi.co/api/people/${indexUrl}/`)
	.then(res => res.json())
	.then(person => {
		const name = person.name;
		console.log("Имя персонажа: " + name);
		
		let filmsRequest = person.films.map(filmUrl => {
			return fetch(filmUrl).then(res => res.json());
		});
		
		Promise.all(filmsRequest).then(function(resFilms) {
			let titles = resFilms.reduce(function(prev,curr){
				return !prev ? prev + curr.title : prev + ", " + curr.title;
			},"")
			console.log(`Фильмы, в которых участвовал(а) ${person.name} : ` + titles);
		});

		let speciesRequest = person.species.map(speciesElem => {
			return fetch(speciesElem).then(res => res.json())
		});
		return Promise.all(speciesRequest);
	})
	.then(function(resultSpecies) {
		let species = resultSpecies.map(species => {
			console.log("Вид существа - " + species.name);
			console.log(`Язык, присущий виду ${species.name} - ` + species.language);
			
			let personsThisSpecies = species.people.map(peopleURL => {
				return fetch(peopleURL).then(res => res.json());
			});

			Promise.all(personsThisSpecies).then(result => {
				let personName = result.reduce(function(prev,curr){
					return !prev ? prev + curr.name : prev + ", " + curr.name;
				},"");
				console.log("Имена других представителей данного вида: " + personName);
			})
		})
	})
	.catch(function(err) {
		console.warn(err);
	})	
} 
catch(e) {
	console.warn(e);
}