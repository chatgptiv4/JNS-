# JNS Express Delivery - Professional Logistics Portfolio

JNS Express Delivery is a high-end logistics and freight forwarding website designed for a professional portfolio. It features a modern design, a custom tracking system with 3D visualization, and a secure admin management portal.

## 🎨 Branding & Visuals
- **Primary Colors**: Professional Blue, Clean White, and Energetic Orange.
- **Visual Identity**: The site uses CSS filters to maintain a consistent "Mood Board" across all images, shifting original reds to professional oranges and blues.

## 🚀 Key Features

### 1. Real-Time Google Maps Tracking
Located at `/track-shipping/index.html`. 
- **Interactive Map**: Uses Google Maps JavaScript API for a familiar, high-performance tracking experience.
- **Custom Theming**: The map is styled with a dark, professional "Midnight" theme to match the JNS brand.
- **Dynamic Markers**: Packages are plotted with a custom orange marker.
- **Hold Logic**: If a package is marked as "On Hold" in the admin panel, the customer sees a specialized warning instead of the map.

### 2. Secure Admin Dashboard
Located at `/admin/index.html`.
- **Management Hub**: Generate unique 12-character tracking codes (e.g., JNS123456789).
- **Package Control**: Update live locations, change status messages, or place shipments on hold.
- **Security**: Protected by session-based authentication with a 30-minute auto-expiry.
- **Credentials**: 
  - **Username**: `admin`
  - **Password**: `jns2026`

### 3. Customer Interaction
- **Live Chat**: Integrated with Smartsupp for real-time customer support.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Preloader**: A custom "JNS" branded preloader ensures a smooth entrance.

---

## 📂 Project Structure

- `index.html`: The main landing page.
- `/track-shipping/index.html`: The customer-facing tracking interface.
- `/admin/`:
  - `index.html`: Admin login page.
  - `dashboard.html`: The package management interface.
- `/static/assets/`:
  - `css/`: Theming and layout styles.
  - `js/tracking/`: The core engine for the 3D globe and tracking database.
  - `img/`: Optimized logistics imagery.

---

## 🛠️ How It Works (Technical Details)

### The "Database" (`db.js`)
Since this is a frontend-focused portfolio piece, we use `localStorage` to simulate a real database. 
- When you add a package in the **Admin Dashboard**, it is saved to the browser's storage.
- When a customer enters a code in **Track Order**, the site searches this storage for a match.

### The Tracking Map (`map.js`)
The tracking map is powered by the **Google Maps JavaScript API**. It uses the coordinates (Lat/Lng) stored in the database to pan the camera and place a custom marker at the shipment's current location.

---

## 🔗 Connections & Setup (Step-by-Step)

If you are moving this site to a live server, follow these steps:

### Step 0: Google Maps API Key (NEW)
To make the tracking map work, you **must** provide your own Google Maps API Key:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project and enable the **"Maps JavaScript API"**.
3. Generate an **API Key** under "Credentials".
4. Open `track-shipping/index.html`.
5. Find the line: `<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY..."></script>`.
6. Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key.

### Step 1: Form Handling (Contact/Newsletter)
The current forms are visual templates. To make them send real emails:
1. **Newsletter**: In `index.html`, find the `<form class="subscribe-form">`. Replace the `action="#"` with your Mailchimp or Formspree URL.
2. **Contact**: The "Help" and "Support" links are currently `mailto:` links. You can change these to point to a contact form or a specific CRM.

### Step 2: Live Chat Configuration
The site uses Smartsupp. To use your own account:
1. Sign up at [Smartsupp.com](https://www.smartsupp.com/).
2. Copy your unique **Key**.
3. Open `index.html` and `track-shipping/index.html`.
4. Replace the `_smartsupp.key` value with your own key.

### Step 3: Domain Customization
- All support emails are currently set to `support@jns-expressdelivery.com`. 
- To change this globally, use a "Find and Replace" in your editor to swap it with your actual domain email.

### Step 4: Deployment
This is a static website. You can host it for free on:
- **GitHub Pages**
- **Netlify**
- **Vercel**
Simply upload the entire folder, and it will work immediately.

---

## ⚠️ Important Note on Data
Because the site uses `localStorage`, tracking codes created on *your* computer will not automatically show up on a *friend's* computer. For a professional portfolio, it is recommended to "Demo" the admin panel first to create a code, then show the tracking page.
