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

### Step 0: Firebase Backend Setup (NEW - For Cross-Device Sharing)
To make your tracking codes visible on all devices (not just your own), you need to connect the site to Firebase:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project (e.g., "JNS-Logistics").
3. In the project dashboard, click the **Web icon (`</>`)** to register a web app.
4. Copy the `firebaseConfig` object provided in the setup instructions.
5. Open `static/assets/js/tracking/db.js`.
6. Replace the placeholder `firebaseConfig` with your actual config.
7. **Crucial**: In the Firebase Console, go to **Build > Realtime Database**.
8. Create a database, choose a location, and start in **Test Mode** (or update rules to allow read/write).
9. Copy the **Database URL** and ensure it's in your `firebaseConfig` in `db.js`.

### Step 1: Google Maps API Key (NEW)
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
