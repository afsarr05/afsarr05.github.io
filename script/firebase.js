// Enhanced Firebase Script with Project Modal Support
// script/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

<<<<<<< HEAD
// Get Firebase config from config.js or use default
let firebaseConfig;
if (typeof window !== 'undefined' && window.config) {
    firebaseConfig = window.config.get('firebase');
} else {
    // Fallback config
    firebaseConfig = {
        apiKey: "AIzaSyAizUdQv_RTVsUS-3Ogit_ztrYhvyOdLWY",
        authDomain: "again-firebase-82baf.firebaseapp.com",
        projectId: "again-firebase-82baf",
        storageBucket: "again-firebase-82baf.appspot.com",
        messagingSenderId: "885321882779",
        appId: "1:885321882779:web:36f5eef08cb8bb9140ba3e",
        measurementId: "G-PLE2XPXQ03"
    };
}
=======
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAizUdQv_RTVsUS-3Ogit_ztrYhvyOdLWY",
  authDomain: "again-firebase-82baf.firebaseapp.com",
  projectId: "again-firebase-82baf",
  storageBucket: "again-firebase-82baf.appspot.com",
  messagingSenderId: "885321882779",
  appId: "1:885321882779:web:36f5eef08cb8bb9140ba3e",
  measurementId: "G-PLE2XPXQ03"
};
>>>>>>> 93bb626ed6aa237678c6f024e1d224b4a0e3523e

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

<<<<<<< HEAD
// Store all projects data globally for modal access
const projectsData = new Map();

=======
>>>>>>> 93bb626ed6aa237678c6f024e1d224b4a0e3523e
// Load Work Projects
async function loadProjects() {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const grid = document.getElementById("projects-grid");
  
  if (!grid) return;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const projectId = doc.id;
    
    // Store full project data including all images
    projectsData.set(projectId, {
      id: projectId,
      ...data
    });
    
    const images = Array.isArray(data.imageUrl) ? data.imageUrl : [];

    // Fallback image if no images
    const firstImage = images.length > 0 
      ? images[0] 
      : "https://placehold.co/600x400/E5E7EB/4B5563?text=No+Image";

    const tags = (data.tags || []).map(
      tag => `<span class="px-3 py-1 bg-accent-blue/10 text-accent-blue text-xs rounded-full font-medium">${tag}</span>`
    ).join("");

    const card = `
      <div class="project-card group bg-secondary-bg dark:bg-dark-card rounded-3xl shadow-lg overflow-hidden cursor-pointer" 
           data-animate-on-scroll
<<<<<<< HEAD
           data-project-id="${projectId}"
           data-project-type="work">
=======
           data-project-id="${doc.id}">
>>>>>>> 93bb626ed6aa237678c6f024e1d224b4a0e3523e
        <!-- Image -->
        <div class="relative overflow-hidden h-64">
          <img src="${firstImage}" 
               alt="${data.title || 'Project'}" 
               class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-4 left-4 right-4">
              <button class="w-full px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl border border-white/30 hover:bg-white/30 transition-all">
                <i class="fas fa-expand-alt mr-2"></i>
                View Details
              </button>
            </div>
          </div>
          ${images.length > 1 ? `
            <div class="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
              <i class="fas fa-images mr-1"></i>
              ${images.length}
            </div>
          ` : ''}
        </div>

        <!-- Content -->
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2 dark:text-white group-hover:text-accent-blue transition-colors">
            ${data.title || "Untitled Project"}
          </h3>
          <p class="text-secondary-text dark:text-gray-400 mb-4 line-clamp-2">
            ${data.description || ""}
          </p>
          <div class="flex flex-wrap gap-2 mb-4">${tags}</div>

          <!-- Links -->
          <div class="flex space-x-3">
            ${data.github ? `
            <a href="${data.github}" 
               target="_blank" 
               onclick="event.stopPropagation()"
               class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-dark-secondary text-primary-text dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <i class="fab fa-github"></i>
              <span class="text-sm">Code</span>
            </a>` : ""}
            ${data.live ? `
            <a href="${data.live}" 
               target="_blank"
               onclick="event.stopPropagation()"
               class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-xl hover:shadow-lg transition-all">
              <i class="fas fa-external-link-alt"></i>
              <span class="text-sm">Demo</span>
            </a>` : ""}
          </div>
        </div>
      </div>
    `;

    grid.insertAdjacentHTML("beforeend", card);
  });

  // Add click handlers to open modal
  attachProjectClickHandlers();
}

// Load Hobby Projects
async function loadHobbyProjects() {
  const querySnapshot = await getDocs(collection(db, "hobby_projects"));
  const grid = document.getElementById("hobby-projects-grid");
  
  if (!grid) return;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const projectId = doc.id;
    
    // Store full project data including all images
    projectsData.set(projectId, {
      id: projectId,
      ...data
    });
    
    const images = Array.isArray(data.imageUrl) ? data.imageUrl : [];

    const firstImage = images.length > 0 
      ? images[0] 
      : "https://placehold.co/600x400/E5E7EB/4B5563?text=No+Image";

    const tags = (data.tags || []).map(
      tag => `<span class="px-3 py-1 bg-accent-purple/10 text-accent-purple text-xs rounded-full font-medium">${tag}</span>`
    ).join("");

    const card = `
      <div class="project-card group bg-secondary-bg dark:bg-dark-card rounded-3xl shadow-lg overflow-hidden cursor-pointer" 
           data-animate-on-scroll
<<<<<<< HEAD
           data-project-id="${projectId}"
           data-project-type="hobby">
=======
           data-project-id="${doc.id}">
>>>>>>> 93bb626ed6aa237678c6f024e1d224b4a0e3523e
        <div class="relative overflow-hidden h-64">
          <img src="${firstImage}" 
               alt="${data.title || 'Project'}" 
               class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-4 left-4 right-4">
              <button class="w-full px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl border border-white/30 hover:bg-white/30 transition-all">
                <i class="fas fa-expand-alt mr-2"></i>
                View Details
              </button>
            </div>
          </div>
          ${images.length > 1 ? `
            <div class="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
              <i class="fas fa-images mr-1"></i>
              ${images.length}
            </div>
          ` : ''}
        </div>

        <div class="p-6">
          <h3 class="text-xl font-bold mb-2 dark:text-white group-hover:text-accent-purple transition-colors">
            ${data.title || "Untitled Project"}
          </h3>
          <p class="text-secondary-text dark:text-gray-400 mb-4 line-clamp-2">
            ${data.description || ""}
          </p>
          <div class="flex flex-wrap gap-2 mb-4">${tags}</div>

          <div class="flex space-x-3">
            ${data.github ? `
            <a href="${data.github}" 
               target="_blank" 
               onclick="event.stopPropagation()"
               class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-dark-secondary text-primary-text dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <i class="fab fa-github"></i>
              <span class="text-sm">Code</span>
            </a>` : ""}
            ${data.live ? `
            <a href="${data.live}" 
               target="_blank"
               onclick="event.stopPropagation()"
               class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-cyan text-white rounded-xl hover:shadow-lg transition-all">
              <i class="fas fa-external-link-alt"></i>
              <span class="text-sm">Demo</span>
            </a>` : ""}
          </div>
        </div>
      </div>
    `;

    grid.insertAdjacentHTML("beforeend", card);
  });

  attachProjectClickHandlers();
}

// Attach click handlers to project cards
function attachProjectClickHandlers() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Remove existing listener to avoid duplicates
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    // Add new listener
    newCard.addEventListener('click', async (e) => {
      // Don't open modal if clicking on a link
      if (e.target.closest('a')) return;
      
      const projectId = newCard.dataset.projectId;
      if (!projectId) return;
      
<<<<<<< HEAD
      // Get project data from our stored map
      const projectData = projectsData.get(projectId);
      
      if (!projectData) {
        console.error('Project data not found for ID:', projectId);
        return;
      }
      
      // Open modal with the correct project data
=======
      // Get project data
      const projectData = await getProjectData(projectId);
      if (!projectData) return;
      
      // Open modal
>>>>>>> 93bb626ed6aa237678c6f024e1d224b4a0e3523e
      if (window.projectModal) {
        window.projectModal.open(projectData);
      }
    });
  });
}

<<<<<<< HEAD
// Get project data - now simplified since we store it in memory
async function getProjectData(projectId) {
  // Return from our stored data
  return projectsData.get(projectId) || null;
=======
// Get project data from Firestore
async function getProjectData(projectId) {
  try {
    // Try work projects first
    let querySnapshot = await getDocs(collection(db, "projects"));
    let projectDoc = null;
    
    querySnapshot.forEach((doc) => {
      if (doc.id === projectId) {
        projectDoc = { id: doc.id, ...doc.data() };
      }
    });
    
    // If not found, try hobby projects
    if (!projectDoc) {
      querySnapshot = await getDocs(collection(db, "hobby_projects"));
      querySnapshot.forEach((doc) => {
        if (doc.id === projectId) {
          projectDoc = { id: doc.id, ...doc.data() };
        }
      });
    }
    
    return projectDoc;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
>>>>>>> 93bb626ed6aa237678c6f024e1d224b4a0e3523e
}

// Initialize
loadProjects();
<<<<<<< HEAD
loadHobbyProjects();
=======
loadHobbyProjects();
>>>>>>> 93bb626ed6aa237678c6f024e1d224b4a0e3523e
