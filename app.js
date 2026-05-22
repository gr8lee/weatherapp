// Grab our html elements so that JavaScript can interact with them
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const display = document.getElementById('weather-display');

// setup an event listener for the search button

searchBtn.addEventListener('click', async () => {
    const city = cityInput.value;


    // If user doesn't enter a city, show an error message
    if(!city) {
    alert('Please enter a city name!');
    return;        
    }


  // API key for OpenWeatherMap (replace with your own key)
    const apiKey = "YOUR_API_KEY_HERE"; 
    // <-- Replace with your actual API key



    // ... inside your searchBtn click listener ...
     display.innerHTML = 'Fetching weather...';



    // 1. Construct the URL with the city name and your API key
     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

     try {

        // 2. Send the request to the internet and wait for it to answer
        const response = await fetch(apiUrl);

        //3. Convert the answer from the internet into a format that JavaScript can understand (JSON)
        const data = await response.json();


//Let's add a quick check to see if the API returned an error (like city not found) and handle it gracefully
// If the city doesn't exist, handle the error beautifully instead of freezing

if ( data.cod === "404" ) {
    display.innerHTML = `
                <p style="color: #ef4444; font-weight: bold; margin-top: 15px;">
                    City not found. Please check your spelling!
                </p>
            `;
            return;
}


// Now we will fetch the weather data from the OpenWeatherMap API and display it on the page. We will use the Fetch API to make a request to the OpenWeatherMap API and get the weather data for the city that the user entered.


        // 1. Print the weather data to the console (for debugging)
        console.log("API response Data", data);

        // 2. Unpack the data we care about from the API response
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        //3 Generate the URL for the weather icon based on the icon code from the API
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // 4. Construct the HTML to display the weather information, including the icon, temperature, and description and inject it into the card
        display.innerHTML = `
            <div style="animation: fadeIn 0.5s ease;">
                <h2 style="margin-bottom: 5px; font-size: 28px;">${data.name}</h2>
                
                <img src="${iconUrl}" alt="${description}" style="width: 100px; height: 100px;">
                
                <p style="font-size: 48px; font-weight: bold; margin: 0;">${Math.round(temp)}°C</p>
                
                <p style="text-transform: capitalize; color: #a5b4fc; margin-top: 10px; font-style: italic;">
                    ${description}
                </p>
            </div>
        `;
     }
catch (error) {
    display.innerHTML = "Error loading weather data.";
    console.error(error);
}
});