# ⚡ EnergyWise – Electricity Tracker

**EnergyWise** is a web-based household electricity tracking application designed to help users monitor their electricity consumption, manage home appliances, and estimate monthly electricity bills.

The application allows users to calculate energy usage based on appliance power ratings, daily operating hours, and quantity. It also provides real-time weather information for selected cities through the Open-Meteo API.

## 🌐 Live Demo

🚀 **[View Live Website](https://sakif-anam.github.io/Electricity-Tracker/)**

---

## ✨ Features

### 📊 Interactive Dashboard
- View total daily electricity consumption.
- Monitor estimated monthly electricity usage.
- See the total number of appliances.
- View estimated monthly electricity bills.

### 🔌 Appliance Management
- Add new household appliances.
- Edit existing appliance information.
- Delete appliances.
- Search appliances by name.
- Calculate individual appliance energy consumption.
- Automatically update dashboard statistics.

### 💰 Electricity Bill Calculator
- Enter electricity price per unit (kWh).
- Add additional charges.
- Calculate estimated monthly electricity costs.
- View energy costs, additional charges, and total estimated bills.
- Save electricity rates and charges in the browser.

### 🌤️ Live Weather Information
- Search weather information by city name.
- Retrieve city coordinates using Open-Meteo Geocoding API.
- Display current temperature.
- Display relative humidity and apparent temperature.

### 📈 Monthly Energy Usage Comparison
- Compare monthly electricity consumption across appliances.
- Visualize individual appliance usage through dynamic progress bars.

### 💾 Local Data Storage
- Save appliance information using Local Storage.
- Preserve electricity rates and additional charges.
- Automatically load previously saved information when reopening the application.

### 📱 Responsive Design
- Responsive layouts for desktop, tablet, and mobile devices.
- Clean dashboard interface.
- Simple navigation and user-friendly controls.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| Tailwind CSS | Styling and responsive design |
| JavaScript (Vanilla JS) | Application logic and interactivity |
| DOM Manipulation | Dynamic content updates |
| Local Storage | Saving user data |
| Fetch API | Retrieving weather information |
| Open-Meteo API | Weather and geocoding data |

---

## 📂 Project Structure

```text
Electricity-Tracker/
│
├── index.html       # Main website structure
├── script.js        # Application logic and functionality
└── README.md        # Project documentation
```

## ⚙️ How to Run the Project

No additional installation or build tools are required.

**Step 1: Clone the repository**

```bash
git clone https://github.com/Sakif-Anam/Electricity-Tracker.git
```

**Step 2: Navigate to the project directory**

```bash
cd Electricity-Tracker
```

**Step 3: Open the project**

Open `index.html` directly in your browser.

Alternatively, use the Live Server extension in Visual Studio Code.

---

## 🧮 Electricity Consumption Formula

Energy consumption is calculated using the following formula:

**Daily Energy Consumption:**

```text
Daily kWh = (Power × Hours × Quantity) / 1000
```

**Monthly Energy Consumption:**

```text
Monthly kWh = Daily kWh × 30
```

**Estimated Electricity Bill:**

```text
Energy Cost = Monthly kWh × Unit Rate

Total Bill = Energy Cost + Additional Charges
```

*Note: The bill calculator provides an estimate based on the user's entered unit rate. Actual electricity bills may vary due to applicable tariff slabs, VAT, demand charges, and other fees.*

---

## 🌐 API Integration

EnergyWise uses the free **Open-Meteo API** to retrieve weather information.

Two API services are used:

1. **Geocoding API:** Converts a city name into geographical coordinates (latitude and longitude).
2. **Weather Forecast API:** Retrieves current weather information using those coordinates.

API Documentation:

- [Open-Meteo Weather API](https://open-meteo.com/en/docs)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

No API key is required for the public Open-Meteo endpoints used in this project.

---

## 🎯 Project Objectives

- Promote household electricity awareness.
- Help users understand appliance-wise energy consumption.
- Provide a simple way to estimate monthly electricity expenses.
- Encourage efficient electricity usage.
- Demonstrate practical applications of HTML, Tailwind CSS, JavaScript, APIs, and browser storage.

## 🚀 Future Improvements

- Integration of official Bangladesh electricity tariff rates.
- Electricity consumption history and monthly reports.
- Interactive charts for energy consumption analysis.
- Downloadable electricity usage reports.
- More advanced energy-saving recommendations.
- User authentication and cloud-based data storage.

---

## 👨‍💻 Author

**Sakif Anam**

- GitHub: [@Sakif-Anam](https://github.com/Sakif-Anam)
- Project Repository: [Electricity-Tracker](https://github.com/Sakif-Anam/Electricity-Tracker)

---

⭐ If you find this project useful, consider giving the repository a star!

**Built with ⚡ to promote smarter energy consumption.**
