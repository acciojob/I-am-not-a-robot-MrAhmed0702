//your code here
const images = [
          "https://picsum.photos/id/237/200/300",
          "https://picsum.photos/seed/picsum/200/300",
          "https://picsum.photos/200/300?grayscale",
          "https://picsum.photos/200/300/",
          "https://picsum.photos/200/300.jpg",
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
          // Pick one random index for duplicate
          const duplicateIndex = Math.floor(Math.random() * images.length);

          // Build 6 images: 5 unique + duplicate of one random
          let sixImages = [...images];
          sixImages.push(images[duplicateIndex]);

          // Shuffle the 6 images array
          shuffle(sixImages);

          // Create img elements
          sixImages.forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            img.dataset.index = index; // index for internal use
            img.dataset.src = src; // store src for comparison
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