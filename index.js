import {
  bio,
  skills,
  education,
  experience,
  featuredProjects, // Import the featured projects
  socialLinks, // Import social links
} from "./user-data/data.js";
import { fetchRepoScreenshots } from './js/github-api.js';
import { getTagColor } from './user-data/tag-colors.js'; // Add import at the top

function populateBio(items, id) {
  const bioTag = document.getElementById(id);
  items.forEach((bioItem) => {
    const p = document.createElement("p");
    p.innerHTML = bioItem;
    bioTag.append(p);
  });
}

function populateExpEdu(items, id) {
  const container = document.getElementById(id);

  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "timeline-entry animate-box";

    const inner = document.createElement("div");
    inner.className = "timeline-entry-inner";

    const icon = document.createElement("div");
    icon.className = "timeline-icon color-2";
    const i = document.createElement("i");
    i.className = `fa fa-${item.icon}`;
    icon.append(i);

    const label = document.createElement("div");
    label.className = "timeline-label";

    const title = document.createElement("h2");
    title.innerHTML = `${item.title} <span>${item.duration}</span>`;
    label.append(title);

    const subtitle = document.createElement("span");
    subtitle.className = "timeline-sublabel";
    subtitle.innerHTML = item.subtitle;
    label.append(subtitle);

    item.details.forEach((detail) => {
      const p = document.createElement("p");
      p.className = "timeline-text";
      p.innerHTML = `&blacksquare; ${detail}`;
      label.append(p);
    });

    const tagsDiv = document.createElement("div");
    item.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "badge";
      span.innerHTML = tag;
      span.style.backgroundColor = getTagColor(tag);
      span.style.color = "#ffffff";  // White text for better contrast
      tagsDiv.append(span);
    });
    label.append(tagsDiv);

    inner.append(icon);
    inner.append(label);
    article.append(inner);
    container.append(article);
  });

  // Add final circle
  const endArticle = document.createElement("article");
  endArticle.className = "timeline-entry begin animate-box";
  const endInner = document.createElement("div");
  endInner.className = "timeline-entry-inner";
  const endIcon = document.createElement("div");
  endIcon.className = "timeline-icon color-none";
  endInner.append(endIcon);
  endArticle.append(endInner);
  container.append(endArticle);
}

function populateSkills() {
    const skillsContainer = document.getElementById('skills');
    
    skills.forEach(category => {
        // Create a row for each category
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row animate-box';
        rowDiv.setAttribute('data-animate-effect', 'fadeInLeft');
        
        // Create the skill div
        const skillDiv = document.createElement('div');
        skillDiv.className = 'col-md-12';
        
        // Create paragraph element
        const p = document.createElement('p');
        p.innerHTML = `<b>${category.category}:</b> ${category.items.join(', ')}`;
        
        skillDiv.appendChild(p);
        rowDiv.appendChild(skillDiv);
        skillsContainer.appendChild(rowDiv);
    });
}

async function populateRepos() {
    const reposContainer = document.getElementById('repos');
    if (!reposContainer) return; // Guard clause if the section is commented out in HTML

    try {
        // Updated to your GitHub username
        const response = await fetch(`https://api.github.com/users/amit22882036-ship-it/repos?sort=updated&direction=desc&per_page=6`);
        const repos = await response.json();
        
        repos.forEach(repo => {
            const li = document.createElement('li');
            li.className = 'animate-box';
            li.innerHTML = `
                <div class="repo-card">
                    <h3 class="repo-heading">${repo.name}</h3>
                    <p class="repo-description">${repo.description || 'No description available'}</p>
                    <p class="repo-language">Main language: ${repo.language || 'Not specified'}</p>
                    <p class="repo-stars">⭐ ${repo.stargazers_count} stars</p>
                    <a href="${repo.html_url}" target="_blank" class="repo-link">View Repository</a>
                </div>
            `;
            reposContainer.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching repositories:", error);
        // Updated to your GitHub profile link
        reposContainer.innerHTML = `<p>Failed to load repositories. Please check my <a href="https://github.com/amit22882036-ship-it" target="_blank">GitHub profile</a> directly.</p>`;
    }
}



async function populateProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    for (const project of featuredProjects) {
        try {
            // Fetch screenshots
            const screenshots = project.images || await fetchRepoScreenshots(project.repoName);
            const thumbnail = screenshots.length > 0 ? screenshots[0].url : './images/projects/default-thumb.png';
            
            // Create project card with new layout
            const projectCard = document.createElement('div');
            projectCard.className = 'col-md-4 animate-box';
            projectCard.setAttribute('data-animate-effect', 'fadeInLeft');
            
            // Store data for modal
            const projectData = {
                ...project,
                images: screenshots.map(s => s.url),
                imageAlts: screenshots.map(s => s.alt),
                thumbnail: thumbnail
            };
            
            // Get short description
            const shortDesc = project.shortDescription;
            
            projectCard.innerHTML = `
                <div class="project-card" role="button" tabindex="0" aria-haspopup="dialog" aria-label="View details for ${project.title}" data-project="${encodeURIComponent(JSON.stringify(projectData))}">
                    <div class="project-card-content">
                        <div class="project-image">
                            <img src="${thumbnail}" alt="${screenshots[0]?.alt || project.title}">
                            ${project.status ? '<span class="project-status"></span>' : ''}
                        </div>
                        <div class="project-info">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description large-text">${shortDesc}</p>
                        </div>
                    </div>
                </div>
            `;
            
            if (project.status) projectCard.querySelector('.project-status').textContent = project.status;
            projectsContainer.appendChild(projectCard);
        } catch (error) {
            console.error(`Error creating project card for ${project.title}:`, error);
        }
    }
    
    addProjectCardListeners();
}

function addProjectCardListeners() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const encoded = this.getAttribute('data-project');
            const projectData = JSON.parse(decodeURIComponent(encoded));
            openProjectModal(projectData);
        });
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
}

// Function to open the project modal
let modalTrigger = null;

function openProjectModal(project) {
  const modal = document.getElementById('projectModal');
  if (modal.style.display !== 'block') modalTrigger = document.activeElement;
  // Set modal content
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-description').textContent = project.description;
  const status = document.getElementById('modal-status');
  status.textContent = project.status || '';
  status.hidden = !project.status;
  const category = document.getElementById('modal-category');
  category.textContent = project.category || '';
  category.hidden = !project.category;
  const imageNote = document.getElementById('modal-image-note');
  imageNote.textContent = project.imageNote || '';
  imageNote.hidden = !project.imageNote;
  
  // Set tags
  const tagsContainer = document.getElementById('modal-tags');
  tagsContainer.innerHTML = '';
  project.tags.forEach(tag => {
    const tagSpan = document.createElement('span');
    tagSpan.className = 'modal-tag';
    tagSpan.textContent = tag;
    tagSpan.style.backgroundColor = getTagColor(tag);
    tagSpan.style.color = "#ffffff";  // White text for better contrast
    tagsContainer.appendChild(tagSpan);
  });
  
  // Set buttons
  setProjectLink('modal-github', project.github, 'btn-github');
  setProjectLink('modal-demo', project.demo, 'btn-demo');
  
  // Create carousel
  const carousel = document.getElementById('modal-carousel');
  carousel.innerHTML = '';
  carousel.style.display = '';

  // Filter out the thumbnail/first image from carousel images
  // Explicit image collections include their thumbnail in the gallery.
  // Keep the existing screenshot-discovery convention for older projects.
  const imageOffset = project.repoName ? 1 : 0;
  const carouselImages = project.images.slice(imageOffset);

  if (carouselImages.length > 0) {
    carouselImages.forEach((img, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = img;
      imgElement.alt = project.imageAlts?.[index + imageOffset] || `${project.title} screenshot ${index + 1}`;
      imgElement.className = index === 0 ? 'active' : '';
      carousel.appendChild(imgElement);
    });
    
    // Create carousel navigation dots if multiple images
    if (carouselImages.length > 1) {
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'carousel-dots';
      for (let i = 0; i < carouselImages.length; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show image ${i + 1}`);
        dot.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
        dot.className = i === 0 ? 'dot active' : 'dot';
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'));
          showSlide(index);
        });
        dotsContainer.appendChild(dot);
      }
      carousel.appendChild(dotsContainer);
    }
  } else {
    // If no additional images, hide carousel
    carousel.style.display = 'none';
  }
  
  // Show modal
  modal.style.display = 'block';
  modal.querySelector('.close-modal').focus();
}

// Only configured absolute HTTP(S) links are eligible for public project buttons.
// Public visibility is a content decision: never configure private URLs here.
function setProjectLink(id, url, buttonClass) {
  const link = document.getElementById(id);
  let valid = false;
  try {
    const parsed = new URL(url);
    valid = /^https?:$/.test(parsed.protocol) && !parsed.username && !parsed.password;
  } catch { /* An absent or malformed URL has no button. */ }
  link.className = `modal-button ${buttonClass}`;
  link.hidden = !valid;
  link.style.display = valid ? 'inline-block' : 'none';
  link.removeAttribute('href');
  if (valid) link.href = url;
}

function closeProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
  modalTrigger?.focus();
}

// Function to handle modal carousel slides
function showSlide(index) {
  const slides = document.querySelectorAll('#modal-carousel img');
  const dots = document.querySelectorAll('#modal-carousel .dot');
  
  slides.forEach((slide, i) => {
    slide.className = i === index ? 'active' : '';
  });
  
  dots.forEach((dot, i) => {
    dot.className = i === index ? 'dot active' : 'dot';
    dot.setAttribute('aria-pressed', i === index ? 'true' : 'false');
  });
}

function populateSocialLinks() {
  const container = document.getElementById('social-links-container');
  
  socialLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    
    const i = document.createElement('i');
    i.className = link.icon;
    i.style.fontSize = "24px";
    i.style.margin = "0 10px";
    i.style.color = link.color;
    
    a.appendChild(i);
    container.appendChild(a);
  });
}

// Run all population functions
populateBio(bio, "bio");
populateExpEdu(education, "education");
populateExpEdu(experience, "experience");

// Call the function when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  populateSkills();
  populateRepos();
  populateProjects(); 
  populateSocialLinks(); 
  
  // Close modal when clicking the X
  document.querySelector('.close-modal').addEventListener('click', function() {
    closeProjectModal();
  });
  
  // Close modal when clicking outside of it
  window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('projectModal')) {
      closeProjectModal();
    }
  });
  document.getElementById('projectModal').addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeProjectModal();
    } else if (event.key === 'Tab') {
      const controls = [...this.querySelectorAll('button, a[href]')].filter(el => !el.hidden && el.style.display !== 'none');
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
});
