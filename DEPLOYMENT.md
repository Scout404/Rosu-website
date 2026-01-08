# Deploying to GitHub Pages

This website is ready to be hosted on GitHub Pages. Follow these steps to deploy:

## Deployment Steps

1. Go to your repository on GitHub: `https://github.com/Scout404/Rosu-website`

2. Click on **Settings** in the repository menu

3. In the left sidebar, click on **Pages** under "Code and automation"

4. Under "Source", select **Deploy from a branch**

5. Under "Branch":
   - Select the branch you want to deploy (e.g., `main` or `copilot/create-static-website`)
   - Keep the folder as `/ (root)`
   - Click **Save**

6. Wait a few minutes for GitHub to build and deploy your site

7. Your site will be available at: `https://scout404.github.io/Rosu-website/`

## Local Development

To test the website locally:

```bash
# Navigate to the repository directory
cd Rosu-website

# Start a local web server (Python 3)
python3 -m http.server 8080

# Or using Python 2
python -m SimpleHTTPServer 8080

# Or using Node.js
npx http-server -p 8080
```

Then open your browser to `http://localhost:8080`

## File Structure

```
Rosu-website/
├── index.html      # Main HTML file
├── styles.css      # CSS styling
├── script.js       # JavaScript functionality
├── .gitignore      # Git ignore rules
└── README.md       # Project description
```

## Features

- Fully responsive design
- Smooth scrolling navigation
- Animated sections
- Modern, clean design
- Optimized for GitHub Pages hosting
