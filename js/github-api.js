export async function fetchRepoScreenshots(repoName) {
    if (!repoName) {
        return [{
            url: './images/projects/default-thumb.png',
            name: 'default-thumb',
            isThumb: true
        }];
    }

    try {
        const imageUrls = [];
        
        // First check for thumbnail/cover image
        const thumbnailPaths = [
            `./images/projects/${repoName}/thumbnail.png`,
            `./images/projects/${repoName}/cover.png`
        ];

        // Add thumbnail if it exists
        imageUrls.push({
            url: thumbnailPaths[0],
            name: 'thumbnail',
            isThumb: true
        });
        
        // Then add other screenshots
        let screenshotIndex = 1;
        let screenshotExists = true;

        while (screenshotExists) {
            const imagePath = `./images/projects/${repoName}/screenshot${screenshotIndex}.png`;
            
            // Try to load the image to check if it exists
            try {
                const response = await fetch(imagePath, { method: 'HEAD' });
                if (!response.ok) {
                    screenshotExists = false;
                    break;
                }
                
                imageUrls.push({
                    url: imagePath,
                    name: `screenshot${screenshotIndex}`,
                    isThumb: false
                });
                
                screenshotIndex++;
            } catch {
                screenshotExists = false;
                break;
            }
        }

        // If no images found, return default
        if (imageUrls.length === 0) {
            return [{
                url: './images/projects/default-thumb.png',
                name: 'default-thumb',
                isThumb: true
            }];
        }

        return imageUrls;
    } catch (error) {
        console.error(`Error loading screenshots for ${repoName}:`, error);
        return [{
            url: './images/projects/default-thumb.png',
            name: 'default-thumb',
            isThumb: true
        }];
    }
}