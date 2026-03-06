export const tagColors = {
    /* * This object maps tags to their corresponding colors.
    // Programming Languages
    "Python": "#3776AB",
    "SQL": "#FF9800",
    "C#": "#178600",
    
    // Frameworks & Libraries
    "FastAPI": "#009688",
    "TensorFlow": "#FF6F00",
    "PyTorch": "#EE4C2C",
    "Pandas": "#150458",
    "NumPy": "#013243",
    "Scikit-learn": "#F7931E",
    "BERT": "#FFD700",
    
    // Machine Learning & AI
    "Machine Learning": "#4CAF50",
    "Deep Learning": "#9C27B0",
    "NLP": "#E91E63",
    "Statistical Analysis": "#607D8B",
    "Data Analysis": "#2196F3",
    "Feature Engineering": "#795548",
    
    // Development Tools
    "Docker": "#2496ED",
    "Git": "#F05032",
    "OOP": "#FF5722",
    
    // Cloud & Infrastructure
    "AWS": "#232F3E",
    "Azure": "#0089D6",
    
    // Web Development
    "Vue.js": "#42b883",
    
    // Data Visualization
    "Data Visualization": "#00BCD4",
    "Matplotlib": "#11557C",
    "Seaborn": "#4EABE6",
    
    // Other Skills
    "Game Development": "#D32F2F",
    "Software Design": "#673AB7",
    "System Analysis": "#FF5252",
    "Team Collaboration": "#03A9F4",
    
    // Education & Academic Skills
    "Statistics": "#9C27B0",
    "Data Science": "#2196F3",
    "Databases": "#FFA000",
    "Data Structures & Algorithms": "#00796B",
    "Image Processing": "#607D8B",
    "Cloud Computing (AWS, Azure)": "#0277BD",
    "OOP Design": "#558B2F",
    "Software Engineering Fundamentals": "#1565C0",
    "Computer Science": "#4527A0",
    "Physics": "#C2185B",
    "Mathematics": "#00838F",
    "English": "#5D4037",
    
    // Work Experience & Technologies
    "OpenAI": "#412991",
    "Qdrant": "#FF6B6B",
    "LLMs": "#7952B3",
    "HuggingFace": "#FFD21E", 
    "Streamlit": "#FF4B4B", 
    "Benchmarking": "#607D8B",
    "SAP": "#0FAAFF",
    "Training": "#4CAF50",

    */

    // Default color for undefined tags
    "default": "#888888"
};

// Helper function to get color for a tag
export function getTagColor(tag) {
    return tagColors[tag] || tagColors.default;
}