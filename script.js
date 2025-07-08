//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const error = document.getElementById('error');
const loading = document.getElementById('loading');
const images = [
  { url: "https://picsum.photos/id/237/200/3001" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];


btn.addEventListener('click',(e) => {
	e.preventDefault();
	downloadImages();
})

async function downloadImages() {
	error.textContent = "";

	loading.style.display = "block";
	output.innerHTML = "";

	try {
		let downloads = images.map(img => downloadImage(img.url));
		const downloadimages = await Promise.all(downloads);
		downloadimages.forEach((img) => {
			output.appendChild(img);
		})
	} catch (err) {
		error.textContent = err;
	}finally{
		loading.style.display = "none";
	}
}

function downloadImage(url) {
	return new Promise((resolve,reject) => {
		let img = new Image();

		img.src = url;

		img.onload = () => resolve(img);
		img.onerror = () => reject(`Image failed to load at url ${url}`)
	})
}
