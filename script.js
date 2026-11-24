// =========================================================
    // 1. APPLICATION DATA
    // An array of objects stores the appliances.
    // =========================================================

    let appliances = [
      { name: "Ceiling fan", watts: 75, hours: 10, quantity: 3 },
      { name: "LED light", watts: 12, hours: 6, quantity: 5 },
      { name: "Refrigerator", watts: 150, hours: 10, quantity: 1 },
      { name: "Television", watts: 100, hours: 5, quantity: 1 }
    ];

    let unitRate = 0;
    let fixedCharge = 0;

    // =========================================================
    // 2. GET HTML ELEMENTS
    // We use getElementById() to select elements from the page.
    // =========================================================

    const applianceTable = document.getElementById("applianceTable");
    const applianceForm = document.getElementById("applianceForm");

    // =========================================================
    // 3. LOCAL STORAGE
    // Load saved data when the page opens.
    // =========================================================

    function loadSavedData() {
      const savedAppliances = localStorage.getItem("energywiseAppliances");
      const savedRate = localStorage.getItem("energywiseRate");
      const savedCharge = localStorage.getItem("energywiseCharge");

      if (savedAppliances !== null) {
        appliances = JSON.parse(savedAppliances);
      }

      if (savedRate !== null) {
        unitRate = Number(savedRate);
        document.getElementById("unitRate").value = unitRate;
      }

      if (savedCharge !== null) {
        fixedCharge = Number(savedCharge);
        document.getElementById("fixedCharge").value = fixedCharge;
      }
    }

    function saveAppliances() {
      localStorage.setItem("energywiseAppliances", JSON.stringify(appliances));
    }

    // =========================================================
    // 4. CALCULATIONS
    // Daily kWh = watts x hours x quantity / 1000
    // Monthly usage = daily usage x 30 days
    // =========================================================

    function getDailyUsage(appliance) {
      return (appliance.watts * appliance.hours * appliance.quantity) / 1000;
    }

    function getTotalDailyUsage() {
      let total = 0;

      // forEach() visits every appliance in the array.
      appliances.forEach(function(appliance) {
        total = total + getDailyUsage(appliance);
      });

      return total;
    }

    function updateBill() {
      const monthlyUsage = getTotalDailyUsage() * 30;
      const energyCost = monthlyUsage * unitRate;
      const total = energyCost + fixedCharge;

      document.getElementById("energyCost").textContent = "৳" + energyCost.toFixed(2);
      document.getElementById("otherCost").textContent = "৳" + fixedCharge.toFixed(2);
      document.getElementById("totalCost").textContent = "৳" + total.toFixed(2);
      document.getElementById("estimatedBill").textContent =
        unitRate === 0 ? "Set rate" : "৳" + total.toFixed(2);
    }

    // =========================================================
    // 5. DISPLAY APPLIANCES (DOM MANIPULATION)
    // Create table rows using JavaScript.
    // =========================================================

    function showAppliances() {
      applianceTable.innerHTML = "";

      if (appliances.length === 0) {
        document.getElementById("emptyMessage").classList.remove("hidden");
      } else {
        document.getElementById("emptyMessage").classList.add("hidden");
      }

      // filter() selects only appliances matching the search text.
      const searchText = document.getElementById("applianceSearch").value.toLowerCase();
      const filteredAppliances = appliances.filter(function(appliance) {
        return appliance.name.toLowerCase().includes(searchText);
      });

      if (filteredAppliances.length === 0) {
        document.getElementById("emptyMessage").classList.remove("hidden");
        return;
      }

      // forEach() creates one table row for each matching appliance.
      filteredAppliances.forEach(function(appliance) {
        // Find the original position so Edit and Delete still work after searching.
        const index = appliances.indexOf(appliance);
        const row = document.createElement("tr");
        row.className = "border-b";

        row.innerHTML = `
          <td class="p-3 font-semibold">${appliance.name}</td>
          <td class="p-3">${appliance.watts} W</td>
          <td class="p-3">${appliance.hours} hours</td>
          <td class="p-3 text-emerald-700 font-semibold">${getDailyUsage(appliance).toFixed(3)} kWh</td>
          <td class="p-3 whitespace-nowrap">
            <button class="text-emerald-700 font-semibold mr-3 edit-button">Edit</button>
            <button class="text-rose-600 font-semibold delete-button">Delete</button>
          </td>
        `;

        // Add click events to the Edit and Delete buttons.
        row.querySelector(".edit-button").addEventListener("click", function() {
          editAppliance(index);
        });

        row.querySelector(".delete-button").addEventListener("click", function() {
          deleteAppliance(index);
        });

        applianceTable.appendChild(row);
      });
    }

    // =========================================================
    // 6. UPDATE DASHBOARD AND USAGE BARS
    // =========================================================

    function updateDashboard() {
      const daily = getTotalDailyUsage();
      const monthly = daily * 30;
      let totalQuantity = 0;

      appliances.forEach(function(appliance) {
        totalQuantity = totalQuantity + appliance.quantity;
      });

      document.getElementById("dailyUsage").textContent = daily.toFixed(2) + " kWh";
      document.getElementById("monthlyUsage").textContent = monthly.toFixed(2) + " kWh";
      document.getElementById("applianceCount").textContent = totalQuantity;

      showAppliances();
      showUsageBars();
      updateBill();
    }

    function showUsageBars() {
      const barsArea = document.getElementById("usageBars");
      barsArea.innerHTML = "";

      if (appliances.length === 0) {
        barsArea.textContent = "Add appliances to see the usage comparison.";
        return;
      }

      // Find the highest monthly usage to calculate bar widths.
      let highestUsage = 0;
      appliances.forEach(function(appliance) {
        const monthly = getDailyUsage(appliance) * 30;
        if (monthly > highestUsage) {
          highestUsage = monthly;
        }
      });

      appliances.forEach(function(appliance) {
        const monthly = getDailyUsage(appliance) * 30;
        const width = (monthly / highestUsage) * 100;

        const item = document.createElement("div");
        item.innerHTML = `
          <div class="flex justify-between text-sm mb-2">
            <span class="font-semibold">${appliance.name}</span>
            <span>${monthly.toFixed(2)} kWh</span>
          </div>
          <div class="bg-slate-100 rounded-full h-2.5">
            <div class="h-2.5 rounded-full bg-emerald-500" style="width:${width}%"></div>
          </div>
        `;

        barsArea.appendChild(item);
      });
    }

    // =========================================================
    // 7. ADD AND EDIT APPLIANCES
    // addEventListener() handles form and button actions.
    // =========================================================

    // Update the table whenever the user types in the search box.
    document.getElementById("applianceSearch").addEventListener("input", showAppliances);

    document.getElementById("showFormButton").addEventListener("click", function() {
      applianceForm.classList.remove("hidden");
      document.getElementById("formHeading").textContent = "Add an appliance";
      applianceForm.reset();
      document.getElementById("editIndex").value = "";
      document.getElementById("applianceQuantity").value = 1;
    });

    document.getElementById("cancelFormButton").addEventListener("click", function() {
      applianceForm.classList.add("hidden");
    });

    applianceForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const name = document.getElementById("applianceName").value.trim();
      const watts = Number(document.getElementById("applianceWatts").value);
      const hours = Number(document.getElementById("applianceHours").value);
      const quantity = Number(document.getElementById("applianceQuantity").value);
      const editIndex = document.getElementById("editIndex").value;

      if (name === "" || watts <= 0 || hours < 0 || hours > 24 || quantity < 1) {
        alert("Please enter valid appliance information.");
        return;
      }

      const newAppliance = {
        name: name,
        watts: watts,
        hours: hours,
        quantity: quantity
      };

      if (editIndex === "") {
        // Add a new object to the array.
        appliances.push(newAppliance);
      } else {
        // Replace the selected appliance when editing.
        appliances[Number(editIndex)] = newAppliance;
      }

      saveAppliances();
      updateDashboard();
      applianceForm.classList.add("hidden");
    });

    function editAppliance(index) {
      const appliance = appliances[index];

      document.getElementById("applianceName").value = appliance.name;
      document.getElementById("applianceWatts").value = appliance.watts;
      document.getElementById("applianceHours").value = appliance.hours;
      document.getElementById("applianceQuantity").value = appliance.quantity;
      document.getElementById("editIndex").value = index;
      document.getElementById("formHeading").textContent = "Edit appliance";

      applianceForm.classList.remove("hidden");
    }

    function deleteAppliance(index) {
      const answer = confirm("Do you want to delete this appliance?");

      if (answer) {
        // splice() removes one item from the array.
        appliances.splice(index, 1);
        saveAppliances();
        updateDashboard();
      }
    }

    // =========================================================
    // 8. SAVE ELECTRICITY RATE
    // =========================================================

    document.getElementById("saveRateButton").addEventListener("click", function() {
      unitRate = Number(document.getElementById("unitRate").value);
      fixedCharge = Number(document.getElementById("fixedCharge").value);

      if (unitRate < 0 || fixedCharge < 0) {
        alert("Please enter valid bill settings.");
        return;
      }

      localStorage.setItem("energywiseRate", unitRate);
      localStorage.setItem("energywiseCharge", fixedCharge);

      document.getElementById("saveMessage").textContent = "Bill settings saved successfully.";
      updateBill();
    });

    // =========================================================
    // 9. WEATHER API
    // fetch() gets information from Open-Meteo.
    // async/await waits for the API response.
    // =========================================================

    async function searchWeather() {
      const cityName = document.getElementById("cityInput").value.trim();
      const message = document.getElementById("weatherMessage");
      const details = document.getElementById("weatherDetails");

      if (cityName === "") {
        message.textContent = "Please enter a city name.";
        details.classList.add("hidden");
        return;
      }

      // Show a loading message while the API is working.
      message.textContent = "Loading weather information...";
      details.classList.add("hidden");

      try {
        // First API call: find the latitude and longitude of the city.
        const cityURL = "https://geocoding-api.open-meteo.com/v1/search?name="
          + encodeURIComponent(cityName) + "&count=1&language=en&format=json";

        const cityResponse = await fetch(cityURL);

        if (!cityResponse.ok) {
          throw new Error("Could not connect to the location service.");
        }

        const cityData = await cityResponse.json();

        if (!cityData.results || cityData.results.length === 0) {
          message.textContent = "City not found. Please try another city.";
          return;
        }

        const city = cityData.results[0];

        // Second API call: get weather using the city's coordinates.
        const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude="
          + city.latitude + "&longitude=" + city.longitude
          + "&current=temperature_2m,relative_humidity_2m,apparent_temperature&timezone=auto";

        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
          throw new Error("Could not get weather information.");
        }

        const weatherData = await weatherResponse.json();

        // Display the API data on the webpage.
        document.getElementById("weatherCity").textContent =
          city.name + (city.country ? ", " + city.country : "");

        document.getElementById("weatherTemperature").textContent =
          Math.round(weatherData.current.temperature_2m) + "°C";

        document.getElementById("weatherDescription").textContent =
          "Feels like " + Math.round(weatherData.current.apparent_temperature)
          + "°C · Humidity " + weatherData.current.relative_humidity_2m + "%";

        message.textContent = "Weather information loaded successfully.";
        details.classList.remove("hidden");

        // Remember the last searched city.
        localStorage.setItem("energywiseCity", city.name);

      } catch (error) {
        // Show an error message if the API request fails.
        message.textContent = "Weather is unavailable. Please try again.";
        console.log(error);
      }
    }

    document.getElementById("weatherButton").addEventListener("click", searchWeather);

    document.getElementById("cityInput").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        searchWeather();
      }
    });

    // =========================================================
    // 10. START THE WEBSITE
    // Load saved information and display the dashboard.
    // =========================================================

    loadSavedData();

    const lastCity = localStorage.getItem("energywiseCity");
    if (lastCity !== null) {
      document.getElementById("cityInput").value = lastCity;
    }

    updateDashboard();
    searchWeather();
