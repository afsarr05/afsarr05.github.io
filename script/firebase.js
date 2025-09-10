// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";
// Your Firebase config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAizUdQv_RTVsUS-3Ogit_ztrYhvyOdLWY",
  authDomain: "again-firebase-82baf.firebaseapp.com",
  projectId: "again-firebase-82baf",
  storageBucket: "again-firebase-82baf.appspot.com",
  messagingSenderId: "885321882779",
  appId: "1:885321882779:web:36f5eef08cb8bb9140ba3e",
  measurementId: "G-PLE2XPXQ03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Firestore reference
const db = getFirestore(app);

// Storage reference
const storage = getStorage(app);

async function loadProjects() {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const grid = document.getElementById("projects-grid");

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const images = Array.isArray(data.imageUrl) ? data.imageUrl : [];

    // fallback image if no images
    const slides = images.length
      ? images.map((url, i) => `
          <div class="slide ${i === 0 ? 'active' : ''}">
            <img src="${url}" alt="slide ${i}" class="w-full h-60 object-contain rounded-xl">
          </div>
        `).join("")
      : `
          <div class="slide active">
            <img src="https://placehold.co/600x400/E5E7EB/4B5563?text=No+Image" class="w-full h-60 object-cover rounded-xl">
          </div>
        `;

    const tags = (data.tags || []).map(
      tag => `<span class="px-3 py-1 bg-accent-blue/10 text-accent-blue text-xs rounded-full">${tag}</span>`
    ).join("");

    const card = `
      <div class="project-card bg-secondary-bg p-6 rounded-2xl shadow-lg dark:bg-dark-secondary relative" data-animate-on-scroll>
        <!-- Slider -->
        <div class="slider relative overflow-hidden rounded-xl mb-4 h-60">
          ${slides}
        </div>

        <!-- Project info -->
        <h3 class="text-xl font-semibold mb-2 dark:text-white">${data.title || "Untitled Project"}</h3>
        <p class="text-secondary-text mb-4 dark:text-gray-400">${data.description || ""}</p>
        <div class="flex flex-wrap gap-2 mb-4">${tags}</div>

        <!-- Links -->
        <div class="flex space-x-3">
          ${data.github ? `
          <a href="${data.github}" target="_blank" class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent-blue hover:bg-accent-blue hover:text-white transition-colors">
            <i class="fab fa-github"></i>
          </a>` : ""}
          ${data.live ? `
          <a href="${data.live}" target="_blank" class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent-blue hover:bg-accent-blue hover:text-white transition-colors">
            <i class="fas fa-external-link-alt"></i>
          </a>` : ""}
        </div>
      </div>
    `;

    grid.insertAdjacentHTML("beforeend", card);
  });

  // After cards inserted → start sliders
  startSliders();
}
async function loadHobbyProjects() {
  const querySnapshot = await getDocs(collection(db, "hobby_projects"));
  const grid = document.getElementById("hobby-projects-grid");

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const images = Array.isArray(data.imageUrl) ? data.imageUrl : [];

    // fallback image if no images
    const slides = images.length
      ? images.map((url, i) => `
          <div class="slide ${i === 0 ? 'active' : ''}">
            <img src="${url}" alt="slide ${i}" class="w-full h-60 object-contain rounded-xl">
          </div>
        `).join("")
      : `
          <div class="slide active">
            <img src="https://placehold.co/600x400/E5E7EB/4B5563?text=No+Image" class="w-full h-60 object-cover rounded-xl">
          </div>
        `;

    const tags = (data.tags || []).map(
      tag => `<span class="px-3 py-1 bg-accent-blue/10 text-accent-blue text-xs rounded-full">${tag}</span>`
    ).join("");

    const card = `
      <div class="project-card bg-secondary-bg p-6 rounded-2xl shadow-lg dark:bg-dark-secondary relative" data-animate-on-scroll>
        <!-- Slider -->
        <div class="slider relative overflow-hidden rounded-xl mb-4 h-60">
          ${slides}
        </div>

        <!-- Project info -->
        <h3 class="text-xl font-semibold mb-2 dark:text-white">${data.title || "Untitled Project"}</h3>
        <p class="text-secondary-text mb-4 dark:text-gray-400">${data.description || ""}</p>
        <div class="flex flex-wrap gap-2 mb-4">${tags}</div>

        <!-- Links -->
        <div class="flex space-x-3">
          ${data.github ? `
          <a href="${data.github}" target="_blank" class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent-blue hover:bg-accent-blue hover:text-white transition-colors">
            <i class="fab fa-github"></i>
          </a>` : ""}
          ${data.live ? `
          <a href="${data.live}" target="_blank" class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent-blue hover:bg-accent-blue hover:text-white transition-colors">
            <i class="fas fa-external-link-alt"></i>
          </a>` : ""}
        </div>
      </div>
    `;

    grid.insertAdjacentHTML("beforeend", card);
  });

  // After cards inserted → start sliders
  startSliders();
}

function startSliders() {
  const sliders = document.querySelectorAll(".slider");
  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    let index = 0;

    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, 3000); // change every 3s
  });
}

loadProjects();
loadHobbyProjects();




// // Example: Get file from Firebase Storage
// async function getFile() {
//     const fileRef = ref(storage, "images/example.png");
//     const url = await getDownloadURL(fileRef);
//     console.log("File URL:", url);
// }
// getFile();