# Conference of Contemplative Communities of Kenya (CCCK)

<!-- Test fixed deployment targeting - 2024-12-19 -->

Founded on the 22 September 2015, the Conference of Contemplative Communities of Kenya (CCCK) is a conference of Nuns from different monastic traditions established in Kenya and other English-speaking countries in Africa.

A React website for the Conference of Contemplative Communities of Kenya, showcasing member monasteries, news, and spiritual resources.

## Features

- Responsive design and optimized for all devices
- Image galleries and interactive maps
- News and events management
- Contact forms with email integration
- Multi-language support preparations

## Tech Stack

- React 19
- React Router v7
- Framer Motion for animations
- Tailwind CSS for styling
- Leaflet for interactive maps
- Vite for building and development

## Prerequisites

- Node.js 18+ and npm

## Installation

1. Cloning the repository:
   ```
   git clone https://github.com/your-username/ccc-kenya.git
   cd ccc-kenya
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Development

To run the project in development mode:

```bash
npm install
npm run dev
```

This will start the development server, usually at http://localhost:5173

## Contact Form Setup

The contact form uses Web3Forms for reliable email delivery without requiring a backend server.

### Quick Setup:

1. Get your free API key from [Web3Forms](https://web3forms.com)
2. Create a `.env` file in the project root:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your-access-key-here
   ```
3. Restart the development server

### Features:
- ✅ Direct email sending (no email client required)
- ✅ Fallback to mailto: links
- ✅ Copy-to-clipboard functionality
- ✅ Mobile-friendly
- ✅ Works without configuration (fallback mode)

See `CONTACT_FORM_SETUP.md` for detailed setup instructions.

## Production Build

To create an optimized production build:

```
npm run production
```

This will:
1. Run the linter to check for any code issues
2. Create an optimized production build in the `dist` folder

## Deployment

The site automatically deploys to Truehost hosting via GitHub Actions when pushing to the main branch.

<!-- Deployment test: 2024-12-19 - Testing FTP connectivity -->

## Project Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/assets` - Static assets
  - `/lib` - Utility functions and libraries
  - `/hooks` - Custom React hooks

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 
