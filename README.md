# JNS Express Delivery

Static logistics tracking platform.

## Storage Architecture (Planned Migration)

The project is being migrated away from Firebase.

New architecture:

```text
Admin Dashboard
      ↓
Vercel API Routes
      ↓
GitHub Repository
      ↓
data/shipments.json

Tracking Page
      ↓
Vercel API
      ↓
shipments.json
```

Benefits:

- No Firebase dependency
- No Supabase dependency
- Free for small projects
- Tracking works across devices
- Suitable for low-volume shipment tracking

## Main Pages

- `index.html` - homepage
- `track-shipping/index.html` - tracking lookup
- `track-shipping/details.html` - shipment details
- `admin/index.html` - admin login
- `admin/dashboard.html` - shipment dashboard

## Tracking Workflow

1. Admin creates shipment.
2. Shipment is stored in `data/shipments.json`.
3. Customer enters tracking code.
4. Tracking page retrieves shipment data.
5. Shipment can be viewed from any device.

## Deployment

Recommended deployment:

- GitHub
- Vercel

## Notes

Do not use browser localStorage for shipment records because data saved in localStorage is only available on the device that created it.

All shipment records should be stored in a shared location so tracking works globally.
