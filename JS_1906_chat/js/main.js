const socket = io("http://46.101.241.147:8888");

socket.on("chat message", data => {
	//console.log(data);
	addNewMessage(data);
});

const form = document.querySelector("form");
const $message = document.getElementById("message");
const $username = document.getElementById("username");
const $messageList = document.getElementById("message-list");
const $giftsList = document.getElementById("gifts-list");

$username.addEventListener("change", function(ev) {
	ev.target.value = ev.target.value.trim();
	if (ev.target.value !== ""){
		$message.removeAttribute("disabled");
	}
});

form.addEventListener("submit", ev => {
	ev.preventDefault();
	const message = $message.value.trim();
	const username = $username.value.trim();
	const activeImg = document.querySelectorAll("img.active");
	let imageId;
	
	if (username) {
		if (message) {
			socket.emit("chat message", {message, username, type: "text"});
			$message.value = "";	
			$username.value = "";	
		}
		if (activeImg) {
			activeImg.forEach(imgElem => {
				imageId = imgElem.dataset.id;
				socket.emit("chat message", { username, imageId, type: "gif"});
				$username.value = "";	
				imgElem.classList.remove("active");
			});
		}
		if (!message&&!activeImg) return;
	}	
});

function addNewMessage({message, username, imageId, type}){
	if (username) {
		const div = document.createElement('div');
		const p2 = document.createElement("p");
		div.classList.add("message-container");
		p2.classList.add("user-name");
		p2.textContent = username;	

		if (message) {
			const p1 = document.createElement("p");
			p1.classList.add("item-message");
			p1.textContent = message;
			div.appendChild(p1);
		}
		if (type === "gif") {
			const a = document.createElement("a");
			const imgGif = document.createElement("img");
			imgGif.classList.add("message-gif");

			fetch(`http://api.giphy.com/v1/gifs/${imageId}?api_key=dc6zaTOxFJmzC`)
				.then(res => res.json())
				.then(res => {
					url = res.data.images.fixed_width.url;
					imgGif.src = url;
					a.href = res.data.images.original.url;
				});
			a.setAttribute("target", "_blank");
			a.appendChild(imgGif);
			div.appendChild(a);
			div.appendChild(p2);
			$messageList.appendChild(div);	
		}
		div.appendChild(p2);
		$messageList.appendChild(div);	
	}
}

fetch("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC")
	.then(res => res.json())
	.then(res => {
		console.log(res);
		const fragment = document.createDocumentFragment();
		res.data.forEach(function(data) {
			const img = document.createElement("img");
			img.src = data.images.fixed_height_small.url;	
			img.setAttribute("data-id", data.id);
			fragment.appendChild(img);
		});
		$giftsList.appendChild(fragment);
});
$giftsList.addEventListener("click", function(ev){
	ev.target.classList.toggle("active");
});
