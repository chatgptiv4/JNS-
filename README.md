# JNS Express Delivery - Professional Logistics Portfolio

JNS Express Delivery is a high-end logistics and freight forwarding website designed for a professional portfolio. It features a modern design, a custom tracking system with real-time Google Maps integration, and a secure admin management portal.

## 🎨 Branding & Visuals
- **Primary Colors**: Professional Blue, Clean White, and Energetic Orange.
- **Visual Identity**: The site uses CSS filters to maintain a consistent "Mood Board" across all images, shifting original reds to professional oranges and blues.

## 🚀 Key Features

### 1. Advanced Package Management & Tracking
- **Full Tracking Cycle**: From code entry to detailed shipment visualization.
- **Verification Loader**: A realistic, multi-step verification animation that simulates global logistics database syncing.
- **Detailed Results Page**: Located at `/track-shipping/details.html`, showing:
    - **Customer Info**: Full name, contact, and address.
    - **Package Documentation**: Description of items and up to 3 attached photos.
    - **Payment Portal**: Dynamic display of "Paid", "Balance", and "Hold Release Fees".
    - **Live Timeline**: A professional vertical timeline of movement logs (Timestamp, Location, Status).
    - **Interactive Map**: Real-time Google Map showing the current location.

### 2. Upgraded Admin Dashboard
Located at `/admin/dashboard.html`.
- **Comprehensive Management**: Full CRUD (Create, Read, Update, Delete) capabilities for shipments.
- **Dynamic Field Control**:
    - Edit customer details and delivery addresses.
    - Update payment balances and set "On Hold" release amounts.
    - Upload and manage package documentation images.
    - Add real-time movement logs to the shipment history.
- **Status Automation**: Easily switch between "In Transit", "Out for Delivery", "Delivered", and "On Hold".
- **Responsive Controls**: Fully optimized for management on both mobile and desktop.
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
- `/track-shipping/`:
  - `index.html`: The tracking search interface with professional loader.
  - `details.html`: The detailed shipment results page.
- `/admin/`:
  - `index.html`: Admin login page.
  - `dashboard.html`: The advanced shipment management interface.
- `/static/assets/`:
  - `css/`: Theming and layout styles.
  - `js/tracking/`:
    - `db.js`: The core Firebase engine.
    - `map.js`: Google Maps integration module.

---

## 🛠️ How It Works (Technical Details)

### Data Management (`db.js` + Firebase)
The system is powered by **Firebase Realtime Database**, allowing for:
- **Cross-Device Sync**: Create a package on your laptop and track it on your phone instantly.
- **Persistent Storage**: Data remains safe and secure even after browser restarts.
- **Real-time Updates**: Status changes in the admin panel reflect for customers immediately.

### Verification Engine
The tracking page uses an `async` sequence to simulate verification steps (Connecting, Authenticating, Retrieving). This adds a level of professionalism and realism to the user experience.

---

## 🔗 Connections & Setup (Step-by-Step)

### Step 0: Firebase Backend Setup (REQUIRED)
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a project and register a **Web App**.
3. Copy the `firebaseConfig` object and paste it into `static/assets/js/tracking/db.js`.
4. Enable **Realtime Database** in "Test Mode".

### Step 1: Google Maps API Key (REQUIRED)
1. Get a key from [Google Cloud Console](https://console.cloud.google.com/) for "Maps JavaScript API".
2. Replace `YOUR_GOOGLE_MAPS_API_KEY` in:
    - `track-shipping/index.html`
    - `track-shipping/details.html`

### Step 2: Form Handling (Contact/Newsletter)
The current forms are visual templates. To make them send real emails:
1. **Newsletter**: In `index.html`, find the `<form class="subscribe-form">`. Replace the `action="#"` with your Mailchimp or Formspree URL.
2. **Contact**: The "Help" and "Support" links are currently `mailto:` links. You can change these to point to a contact form or a specific CRM.

### Step 3: Live Chat Configuration
The site uses Smartsupp. To use your own account:
1. Sign up at [Smartsupp.com](https://www.smartsupp.com/).
2. Copy your unique **Key**.
3. Open `index.html` and `track-shipping/index.html`.
4. Replace the `_smartsupp.key` value with your own key.

### Step 4: Domain Customization
- All support emails are currently set to `support@jns-expressdelivery.com`. 
- To change this globally, use a "Find and Replace" in your editor to swap it with your actual domain email.

### Step 5: Deployment
This is a static website. You can host it for free on **GitHub Pages**, **Netlify**, or **Vercel**. Simply upload the entire folder, and it will work immediately.
