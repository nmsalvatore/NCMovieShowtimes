# NCMovieShowtimes

### Description
This project contains three main services:

- Backend: Express API
- Frontend: SvelteKit
- Node.js Web Scraper

### Process Management
The frontend and backend are both managed with PM2. With ```ecosystem.config.js``` in the base directory (next to frontend, backend and scraper), run ```pm2 start ecosystem.config.js``` to initialize the two processes.

### Frontend: SvelteKit
Changes made to the SvelteKit application can be reflected in the production environment by running ```npm run build``` from the frontend directory and then restarting the frontend process with ```pm2 restart frontend```.

### Backend: Express API
Changes made to the Express API can be reflected in the production environment by simply restarting the backend process with ```pm2 restart backend```.

### Node.js Web Scraper
The web scraper is a Node.js script that executes through a systemd service. The service runs on a systemd timer. Changes made to the scraper will automatically be reflected upon the next execution of the service.
