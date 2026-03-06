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
    try {
        // Use the GitHub API directly instead of the third-party service
        const response = await fetch(`https://api.github.com/users/EitanBakirov/repos?sort=updated&direction=desc&per_page=6`);
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
        reposContainer.innerHTML = `<p>Failed to load repositories. Please check my <a href="https://github.com/EitanBakirov" target="_blank">GitHub profile</a> directly.</p>`;
    }
}



async function populateProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    for (const project of featuredProjects) {
        try {
            // Fetch screenshots
            const screenshots = await fetchRepoScreenshots(project.repoName);
            const thumbnail = screenshots.length > 0 ? screenshots[0].url : './images/default-project-thumb.png';
            
            // Create project card with new layout
            const projectCard = document.createElement('div');
            projectCard.className = 'col-md-4 animate-box';
            projectCard.setAttribute('data-animate-effect', 'fadeInLeft');
            
            // Store data for modal
            const projectData = {
                ...project,
                images: screenshots.map(s => s.url),
                thumbnail: thumbnail
            };
            
            // Get short description (first sentence)
            const shortDesc = project.shortDescription;
            
            projectCard.innerHTML = `
                <div class="project-card" data-project="${encodeURIComponent(JSON.stringify(projectData))}">
                    <div class="project-card-content">
                        <div class="project-image">
                            <img src="${thumbnail}" alt="${project.title}">
                        </div>
                        <div class="project-info">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description large-text">${shortDesc}</p>
                        </div>
                    </div>
                </div>
            `;
            
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
    });
}

// Function to open the project modal
function openProjectModal(project) {
  // Set modal content
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-description').textContent = project.description;
  
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
  const githubLink = document.getElementById('modal-github');
  githubLink.href = project.github;
  githubLink.className = 'modal-button btn-github';

  const demoLink = document.getElementById('modal-demo');
  if (project.demo) {
    demoLink.href = project.demo;
    demoLink.className = 'modal-button btn-demo';
    demoLink.style.display = 'inline-block';
  } else {
    demoLink.style.display = 'none';
  }
  
  // Create carousel
  const carousel = document.getElementById('modal-carousel');
  carousel.innerHTML = '';

  // Filter out the thumbnail/first image from carousel images
  const carouselImages = project.images.slice(1); // Skip the first image

  if (carouselImages.length > 0) {
    carouselImages.forEach((img, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = img;
      imgElement.alt = `${project.title} screenshot ${index + 1}`;
      imgElement.className = index === 0 ? 'active' : '';
      carousel.appendChild(imgElement);
    });
    
    // Create carousel navigation dots if multiple images
    if (carouselImages.length > 1) {
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'carousel-dots';
      for (let i = 0; i < carouselImages.length; i++) {
        const dot = document.createElement('span');
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
  document.getElementById('projectModal').style.display = 'block';
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
populateExpEdu(experience, "experience");
populateExpEdu(education, "education");

// Call the function when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  populateSkills();
  populateRepos();
  populateProjects(); // Add this line
  populateSocialLinks(); // Add this line
  
  // Close modal when clicking the X
  document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('projectModal').style.display = 'none';
  });
  
  // Close modal when clicking outside of it
  window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('projectModal')) {
      document.getElementById('projectModal').style.display = 'none';
    }
  });
});
