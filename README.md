# AtlasBlake Technologies Website v2

This project contains the redesigned AtlasBlake Technologies public website and the existing AtlasBlake operational prototype routes.

## Public positioning

AtlasBlake is presented as a custom software and website development company offering:

- Website development
- Custom business software
- Mobile and field applications
- Business automation
- API integrations
- Cloud deployment and ongoing support

BTC Fleet is now positioned as the flagship product and Big Town Concrete as the lead case study rather than the identity of the entire company.

## Preserved operational routes

The existing dashboard, portal, eTicket, mock platform data, and backend files remain in place.

## Local testing

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```powershell
npm run lint
npm run build
```

## Environment

The operational prototype continues to use:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_PLATFORM_MODE`

Do not commit `.env` files or credentials.

## Main routes

- `/`
- `/services`
- `/work`
- `/products`
- `/about`
- `/contact`
- `/support`
- `/login`

Legacy marketing routes permanently redirect to the new information architecture.
