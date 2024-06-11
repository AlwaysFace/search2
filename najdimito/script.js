// API key obtained from Google Cloud Console
const API_KEY = 'YOUR_API_KEY';
// Custom search engine ID (CX) obtained from Google Custom Search Engine
const CX = '9307ef100df4a4f70';

// Variable to store search results
let searchResults = [];

// Function to perform the search
function performSearch() {
    // Get the value from the search input field
    const query = document.getElementById('searchQuery').value;
    // Check if the input field is empty
    if (!query) return;

    // Call the Google Custom Search API using fetch
    fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}`)
        .then(response => response.json())
        .then(data => {
            // Store search results in the variable
            searchResults = data.items;
            // Display the results on the page
            displayResults(searchResults);
            // Show the download button
            document.getElementById('downloadButton').style.display = 'block';
        })
        .catch(error => console.error('Error:', error)); // Handle any errors
}

// Function to display search results on the page
function displayResults(results) {
    // Get the container for the results
    const resultsDiv = document.getElementById('results');
    // Clear the container
    resultsDiv.innerHTML = '';
    // Iterate over the results and display each one
    results.forEach(result => {
        // Create an element for each result
        const resultElement = document.createElement('div');
        resultElement.classList.add('card', 'mb-3');
        resultElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title"><a href="${result.link}" target="_blank">${result.title}</a></h5>
                <p class="card-text">${result.snippet}</p>
            </div>
        `;
        // Append the element to the container
        resultsDiv.appendChild(resultElement);
    });
}

// Function to download results in JSON format
function downloadResults() {
    // Create a data URL for the JSON content
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(searchResults, null, 2));
    // Create a temporary link element for the download
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "search_results.json");
    // Append the link to the document and trigger the download
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    // Remove the temporary link from the document
    downloadAnchorNode.remove();
}
