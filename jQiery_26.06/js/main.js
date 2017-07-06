;(function($){
	let url = "https://api.darksky.net/forecast/ae40eed696db288bd9a567e4edcb2d19/48.45,34.98";

	$.ajax({
		url,
		method: "GET",
		contentType: "application/json",
		dataType: "jsonp",
		success,
		error
	});

	function success(data){
		console.log(data);
		const daysArr = data.daily.data;
		const $dailyContainer = $(".daily-container");
		const $main = $('main');
		const $daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const $monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		
		let currentValue = Math.round(data.currently.apparentTemperature);
		$(".current-temperature").text(`Current temperature: ${currentValue}°F`);

		daysArr.forEach(function(dayElem) {
			let time = dayElem.time * 1000;
			let newDate = new Date(time);
			let numbsDay = newDate.getDay();
			let date = newDate.getDate();
			let numbsMonth = newDate.getMonth();
			let $minTemperature = Math.round(dayElem.apparentTemperatureMin);
			let $maxTemperature = Math.round(dayElem.apparentTemperatureMax);	
			let wind = Math.round(dayElem.windGust*0.514);
			let $weatherIcon = $(".daily-item:last-child > .icon-weather");
	
			$dailyContainer.append(`<div class="daily-item">
		        <p class="day-link">${$daysArr[numbsDay]}</p>
		       	<div class="date-container">
					<p class="date">${date}</p>
					<p class="month">${$monthArr[numbsMonth]}</p>
		       	</div>
				<div class="icon-weather"></div>
				<div class="temperature">
					<div class="min">min ${$minTemperature}</div>
					<div class="max">max ${$maxTemperature}</div>
				</div>
		    </div>`);

			$main.append(`<div class="weather-description">
				<p class="weather-summary">${dayElem.summary}</p>
				<p class="min">Minimal temperature ${$minTemperature}&deg;F</p>
				<p class="max">Maximal temperature  ${$maxTemperature}&deg;F</p>
				<p class="wind">wind ${wind} m/s</p>
			</div>`);	
		   
		    switch(dayElem.icon){
		    	case "clear-day": $weatherIcon.css({'background-position': `1px 0`}); break;
				case "clear-night": $weatherIcon.css({'background-position': `0 -107px`}); break;
				case "rain": $weatherIcon.css({'background-position': `0 -322px`}); break;
				case "partly-cloudy-day": $weatherIcon.css({'background-position': `-95px -2px`}); break;
				case "partly-cloudy-night": $weatherIcon.css({'background-position': `-96px -111px`}); break;
				case "fog": $weatherIcon.css({'background-position': `-335px -400px`}); break;
				case "snow": $weatherIcon.css({'background-position': `-335px -322px`});	break;
				case "sleet": $weatherIcon.css({'background-position': `-222px -322px`}); break;
				case "wind": $weatherIcon.css({'background-position': `-222px -400px`}); break;
			}
		});

		$('div.daily-item').eq(0).addClass('active');
		$('div.weather-description').eq(0).show();
		$('div.daily-container').on('click', '.daily-item', function(event) {
            $('.daily-container .daily-item').removeClass('active');
            $(this).addClass('active');
            $('div.weather-description').hide().eq($(this).index()).show();
            event.preventDefault();
        });
		const minTemperature = daysArr.map(element => {
			let $minTemperature = Math.round(element.apparentTemperatureMin);
			return $minTemperature;
		});
		const maxTemperature = daysArr.map(element => {
			let $maxTemperature = Math.round(element.apparentTemperatureMax);
			return $maxTemperature;
		});
		const celesiumValueMin = minTemperature.map(element => {
			const fahrenheitMin = Math.round(5*(element - 32)/9);
			return fahrenheitMin;
		});
		const celesiumValueMax = maxTemperature.map(element => {
			const fahrenheitMax = Math.round(5*(element - 32)/9);
			return fahrenheitMax;
		});

		$(".btn-celesium").on('click', function(event) {
			$(".btn-fahrenheit").removeClass('active');
			$(this).addClass('active');
			celesiumValueMin.forEach(function(elem, index) {
				$(".min").eq(index).text(`min ${elem}`);
				$("p.min").eq(index).text(`Minimal temperature ${elem}°C`);
			});
			celesiumValueMax.forEach(function(elem, index) {
				$(".max").eq(index).text(`max ${elem}`);
				$("p.max").eq(index).text(`Maximal temperature ${elem}°C`);
			});	
			celesiumValue = Math.round(5*(Math.round(data.currently.apparentTemperature)-32)/9);
			$(".current-temperature").text(`Current temperature: ${celesiumValue}°C`);
		});

		$(".btn-fahrenheit").on('click', function(event) {
			$(".btn-celesium").removeClass('active');
			$(this).addClass('active');
			minTemperature.forEach(function(elem, index) {
				$(".min").eq(index).text(`min ${elem}`);
				$("p.min").eq(index).text(`Minimal temperature ${elem}°F`);
			});
			maxTemperature.forEach(function(elem, index) {
				$(".max").eq(index).text(`max ${elem}`);
				$("p.max").eq(index).text(`Maximal temperature ${elem}°F`);
			});	
			currentValue = Math.round(data.currently.apparentTemperature);
			$(".current-temperature").text(`Current temperature: ${currentValue}°F`);
		});
	};

	function error(er){
		console.warn(er);
	};

})(jQuery);