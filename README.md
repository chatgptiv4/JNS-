# JNS express delivery

Static logistics portfolio website with a Firebase-backed package tracking dashboard.

## Main Pages

- `index.html` - public homepage.
- `track-shipping/index.html` - customer tracking-code lookup page.
- `track-shipping/details.html` - shipment details page with animated route tracking.
- `admin/index.html` - admin login page.
- `admin/dashboard.html` - shipment management dashboard.
- `static/assets/js/tracking/db.js` - Firebase Realtime Database integration.

## Admin Login

- URL: `/admin/`
- Username: `admin`
- Password: `jns2026`

This is front-end demo authentication. For real production use, move admin auth to Firebase Authentication or a server-side backend.

## Tracking System

Admins create and edit shipments from the dashboard. Each shipment can include:

- Tracking code
- Customer name and contact
- Delivery address
- Package description
- Freight type
- Origin/from address
- Current location name
- Route progress percentage
- Arrival date
- Currency
- Total shipment fee
- Pending fee/balance
- Hold release fee
- Movement logs
- Up to 3 package images

Customers enter a tracking code at `/track-shipping/`. If the code exists, they are redirected to `/track-shipping/details.html?code=TRACKING_CODE`.

The details page uses a branded animated route line as the visual tracker. The delivery vehicle moves along the route based on the admin-controlled progress percentage. Package images appear below.

## Package Hold Logic

If the admin places a shipment on hold:

- The customer details page displays an on-hold status.
- A hold notice appears with the support email.
- The route remains visible, but the status and fee information clearly show the hold condition.

## Firebase Setup

The site currently uses Firebase Realtime Database through `static/assets/js/tracking/db.js`.

1. Go to Firebase Console.
2. Create or open your Firebase project.
3. Enable **Realtime Database**.
4. Copy your web app `firebaseConfig`.
5. Replace the config object in `static/assets/js/tracking/db.js`.
6. Set secure database rules before using real customer data.

For quick testing, Firebase test mode works, but do not leave public write access enabled for real deployment.

## Chat Setup

Smartsupp chat is embedded in the public pages.

To use your own account:

1. Create a Smartsupp account.
2. Copy your Smartsupp key.
3. Replace `_smartsupp.key` in `index.html` and `track-shipping/index.html`.

## Support Email

Current support email:

`support@jns-expressdelivery.com`

Change it globally if your final domain email is different.

## Deployment

This is a static site and can be deployed to Vercel, Netlify, or GitHub Pages.

For Vercel:

1. Upload or push this folder to GitHub.
2. Import the project in Vercel.
3. Use the default static deployment settings.
4. After deploying, test:
   - `/`
   - `/track-shipping/`
   - `/admin/`
   - `/track-shipping/details.html?code=JNS123456789`

## Pre-Launch Checklist

- Replace Firebase config if needed.
- Restrict Firebase database rules.
- Confirm Smartsupp key belongs to you.
- Confirm support email exists.
- Create at least one shipment from the admin dashboard.
- Test tracking on desktop and mobile.
