// API endpoint for Fortnite shop data (unofficial, free)
const API_URL = 'https://fortnite-api.com/v2/shop/br';

// Conversion rate: 1 V-Buck = $0.005 USD (as per your request)
const VBucksToUSD = 0.005;

// Function to fetch shop data
async function fetchShopData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch shop data');
        const data = await response.json();
        return data.data.entries; // Array of shop items
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to display items
function displayItems(items) {
    const container = document.getElementById('shop-container');
    container.innerHTML = ''; // Clear loading message

    if (items.length === 0) {
        container.innerHTML = '<p>No shop data available.</p>';
        return;
    }

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        // Extract item details (adjust based on API response structure)
        const name = item.items[0]?.name || 'Unknown Item';
        const description = item.items[0]?.description || '';
        const imageUrl = item.items[0]?.images?.icon || '';
        const vbucksPrice = item.finalPrice || item.regularPrice || 0; // V-Bucks price
        const usdPrice = (vbucksPrice * VBucksToUSD).toFixed(2); // Calculate USD

        itemDiv.innerHTML = `
            <img src="${imageUrl}" alt="${name}" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
            <h3>${name}</h3>
            <p>${description}</p>
            <p class="price">${vbucksPrice} V-Bucks ($${usdPrice})</p>
        `;

        container.appendChild(itemDiv);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    const items = await fetchShopData();
    displayItems(items);
});
