//your code here
const images = [
  {src: "https://picsum.photos/id/237/200/300", class: "img1"},
  {src: "https://picsum.photos/seed/picsum/200/300", class: "img2"},
  {src: "https://picsum.photos/200/300?grayscale", class: "img3"},
  {src: "https://picsum.photos/200/300/", class: "img4"},
  {src: "https://picsum.photos/200/300.jpg", class: "img5"},
];

        const container = document.getElementById("image-container");
        const resetBtn = document.getElementById("reset");
        const verifyBtn = document.getElementById("verify");
        const message = document.getElementById("h");
        const result = document.getElementById("para");

        let selectedIndices = [];

        // Shuffle function (Fisher-Yates)
        function shuffle(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        function resetState() {
          selectedIndices = [];
          result.textContent = "";
          message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
          resetBtn.style.display = "none";
          verifyBtn.style.display = "none";
          // Remove all images and reload
          container.innerHTML = "";
          loadImages();
        }

function loadImages() {
  const duplicateIndex = Math.floor(Math.random() * images.length);

  // Create 6 images: 5 unique + 1 duplicate object (with class and src)
  let sixImages = [...images];
  sixImages.push(images[duplicateIndex]);

  shuffle(sixImages);

  container.innerHTML = ""; // clear container

  sixImages.forEach((imgData, index) => {
    const img = document.createElement("img");
    img.src = imgData.src;
    img.classList.add(imgData.class);  // important for Cypress tests
    img.dataset.index = index;
    img.dataset.src = imgData.src;
    container.appendChild(img);
  });
}

        // Handle image click
        function onImageClick(e) {
          if (e.target.tagName !== "IMG") return;
          const img = e.target;

          // If already selected, ignore click (no unselect)
          if (img.classList.contains("selected")) return;

          if (selectedIndices.length >= 2) return; // Max 2 clicks only

          img.classList.add("selected");
          selectedIndices.push(img);

          if (selectedIndices.length === 1) {
            // Show Reset button
            resetBtn.style.display = "inline-block";
            result.textContent = "";
          }

          if (selectedIndices.length === 2) {
            // Show Verify button only if two different images clicked
            const sameImg = selectedIndices[0].dataset.src === selectedIndices[1].dataset.src;
            verifyBtn.style.display = "inline-block";
          }
        }

        // Verify click handler
        function onVerifyClick() {
          if (selectedIndices.length !== 2) return;

          const img1 = selectedIndices[0];
          const img2 = selectedIndices[1];

          verifyBtn.style.display = "none";

          if (img1.dataset.src === img2.dataset.src) {
            result.textContent = "You are a human. Congratulations!";
            result.style.color = "green";
          } else {
            result.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
            result.style.color = "red";
          }
        }

        // Reset click handler
        function onResetClick() {
          // Reset everything
          selectedIndices.forEach(img => img.classList.remove("selected"));
          selectedIndices = [];
          verifyBtn.style.display = "none";
          resetBtn.style.display = "none";
          result.textContent = "";
          message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
        }

        // Initialize
        function init() {
          loadImages();
          container.addEventListener("click", onImageClick);
          resetBtn.addEventListener("click", onResetClick);
          verifyBtn.addEventListener("click", onVerifyClick);
        }

        init();