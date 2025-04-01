import fs from 'fs';

// Regular expressions to capture selectors from common Cypress commands
const selectorPatterns = [
    /cy\.get\(['"`](.*?)['"`]\)/g,        // Matches cy.get("selector")
    /cy\.contains\([^,]+,\s*['"`](.*?)['"`]\)/g, // Matches cy.contains("text", "selector")
    /cy\.find\(['"`](.*?)['"`]\)/g,       // Matches cy.find("selector")
    /cy\.within\(\s*\(\)\s*=>\s*{[^}]*?cy\.get\(['"`](.*?)['"`]\)/g // cy.within(() => { cy.get("selector") })
];

// Function to extract unique selectors
function extractSelectors(testFileContent) {
    const uniqueSelectors = new Set();

    selectorPatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(testFileContent)) !== null) {
            uniqueSelectors.add(match[1]);
        }
    });

    return uniqueSelectors;
}

// Function to read Cypress test file and count elements
function countTestedElements(filePath) {
    try {
        const testFileContent = fs.readFileSync(filePath, 'utf8');
        const uniqueSelectors = extractSelectors(testFileContent);
        
        console.log(`✅ Unique elements tested in ${filePath}: ${uniqueSelectors.size}`);
        console.log("Elements found:", [...uniqueSelectors]);
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
    }
}

// Example Usage: Replace with your test file path
const testFilePath = 'tests/example.cy.js'; // Change this to your actual Cypress test file
countTestedElements(testFilePath);
