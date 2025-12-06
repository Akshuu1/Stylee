// Native fetch is global in Node 18+

async function testApi() {
    try {
        console.log("Testing API with empty params at http://localhost:5001/api/items?minPrice=&maxPrice=...");
        const response = await fetch("http://localhost:5001/api/items?minPrice=&maxPrice=");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response Status:", response.status);
        if (data.items) {
            console.log(`Found ${data.items.length} items`);
            if (data.items.length > 0) {
                console.log("First item:", data.items[0].name);
            }
        } else {
            console.log("Response does not contain 'items' property:", data);
        }

    } catch (error) {
        console.error("API Test Failed:", error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log("Connection refused. Make sure backend is running on port 5001.");
        }
    }
}

testApi();
