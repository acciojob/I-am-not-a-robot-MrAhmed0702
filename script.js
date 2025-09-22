const images = [
    {src: "https://picsum.photos/id/237/200/300", class: "img1"},
    {src: "https://picsum.photos/seed/picsum/200/300", class: "img2"},
    {src: "https://picsum.photos/200/300?grayscale", class: "img3"},
    {src: "https://picsum.photos/200/300/", class: "img4"},
    {src: "https://picsum.photos/200/300.jpg", class: "img5"},
]

let random = Math.floor(Math.random() * images.length);

let imageWithRandom = [...images]

imageWithRandom.push(images[random])

shuffle(imageWithRandom)

function shuffle(arr){
    for(let i = arr.length - 1; i > 0; i--){
        let shuf = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[shuf]] = [arr[shuf], arr[i]];
    }
}

const container = document.getElementById("image-container");

imageWithRandom.forEach(imgObj => {
    const img = document.createElement("img");
    img.src = imgObj.src;
    img.className = imgObj.class;
    container.appendChild(img);
	img.addEventListener("click", () => {
		handleImageClick(img);
	});
});

let selectedImages = [];

function handleImageClick(img){
	if(selectedImages.includes(img) || selectedImages.length === 2) return;
	img.classList.add("selected");
	selectedImages.push(img);

	document.getElementById("reset").style.display = "inline";

	if(selectedImages.length === 2){
		document.getElementById("verify").style.display = "inline";
	}
}

document.getElementById("reset").addEventListener("click", () => {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];

  document.getElementById("reset").style.display = "none";
  document.getElementById("verify").style.display = "none";
  document.getElementById("para").textContent = "";
});

document.getElementById("verify").addEventListener("click", () => {
	const [img1, img2] = selectedImages;

	if(img1.src === img2.src){
		document.getElementById("para").textContent = "You are a human. Congratulations!";
	} else {
		document.getElementById("para").textContent = "We can't verify you as a human. You selected the non-identical tiles.";
	}

	document.getElementById("verify").style.display = "none";
});