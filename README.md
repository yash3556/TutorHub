# 🎓 TutorHub

TutorHub is a MERN Stack web application that connects students with tutors. Students can search for tutors based on subject, location, budget, and teaching mode, while tutors can discover students looking for guidance.

## 🚀 Features

### Student
- Student Registration & Login
- Create and Update Profile
- Search Tutors
- Filter Tutors
- Send Tutor Requests
- View Accepted Requests
- Contact Tutor (Phone/WhatsApp)
- Save Favorite Tutors

### Teacher
- Teacher Registration & Login
- Create Professional Profile
- Search Students
- Accept/Reject Requests
- Manage Availability
- Receive Reviews & Ratings

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- Tailwind CSS
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

## 📁 Project Structure

```
TutorLink
│
├── client
└── server
```

## Contact form email

Contact-form submissions are sent to `yashkush660@gmail.com` by the server only when SMTP is configured. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, and `SMTP_PASS` in `server/.env` (see `server/.env.example`), then restart the backend. For Gmail, use an app password, not your account password. If SMTP is missing or delivery fails, the form reports an error and the message is not stored; ask visitors to email the address directly until delivery is configured. Never commit `.env` or publish SMTP credentials.

## Deploying TutorHub

TutorHub is deployed as two services:

- **Frontend:** Vercel, with the project root set to `client`. It builds with `npm run build` and serves the `dist` directory. `client/vercel.json` routes browser-side React Router paths to `index.html`.
- **Backend:** Render, with the service root set to `server`. It installs from `server/package-lock.json` and starts with `npm start` (`node app.js`).
- **Database:** MongoDB Atlas (or another reachable MongoDB deployment). Mongoose creates the application collections and indexes as models are used; there are no separate migration scripts in this repository.

### Render setup

1. Create a Render **Web Service** from this repository and set **Root Directory** to `server`.
2. Use `npm ci` for the build command and `npm start` for the start command. Render supplies `PORT`; the app listens on it.
3. In the service's Environment settings, set:
   - `MONGO_URI`: the MongoDB Atlas connection URI. Create a production database/user and allow network access from Render (Atlas's `0.0.0.0/0` rule is the common option when Render outbound IPs are not fixed; use a narrower allowlist if your plan/network permits it).
   - `JWT_SECRET`: a long, random secret generated in the hosting dashboard.
   - `CLIENT_URL`: the exact public Vercel origin, for example `https://your-project.vercel.app` (no trailing slash). If the Vercel origin is not known yet, set it after the first Vercel deployment and redeploy/restart this service. For multiple allowed origins (including previews you intend to test), separate exact origins with commas.
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and optionally `SMTP_FROM` only if contact-form email delivery is needed.
4. Set `NODE_ENV=production` if it is not already set by the service environment. Startup waits for MongoDB and fails if `MONGO_URI` or `JWT_SECRET` is missing or the database cannot be reached.
5. After deployment, verify the service's root URL returns `welcome`.

### Vercel setup

1. Import the repository into Vercel and set **Root Directory** to `client`.
2. Select Vite (or let Vercel detect it). Use `npm run build` and `dist` as the output directory.
3. Add `VITE_API_URL` for the Production environment, with the Render service's origin only, for example `https://your-service.onrender.com` (no `/api` suffix or trailing slash). If you also configure it for Preview, add the corresponding exact preview origin(s) to Render's `CLIENT_URL`.
4. Deploy, then copy the final Vercel production origin into Render's `CLIENT_URL` and redeploy/restart the Render service.

The API URL is a Vite build-time setting, so redeploy the frontend after changing it. The backend uses credentialed CORS and production `SameSite=None; Secure` HTTP-only auth cookies for the separately hosted frontend and API. Browsers that block third-party cookies can still prevent cookie-based sign-in when using the default `vercel.app` and `onrender.com` domains; using frontend and API custom domains under the same parent domain avoids that cross-site-cookie limitation.

Do not commit `.env` files or place MongoDB, SMTP, or JWT secrets in Vercel variables. `VITE_API_URL` is public configuration and belongs in Vercel; the other variables belong in Render.

### Post-deployment smoke test

1. Open the Render root URL and confirm it returns `welcome`; check the Render logs show a successful MongoDB connection.
2. Open the Vercel site, refresh a nested route directly (for example `/login` or `/teacher`), and confirm it loads rather than returning a 404.
3. In a browser, create a student account, sign in, open Find Tutor, search/filter, and confirm protected profile and request pages load. Sign out and verify protected routes require sign-in again.
4. Create a teacher account in a separate browser session, complete profile/availability, then check the student-to-teacher request flow and teacher dashboard/requests. Confirm profile changes persist after refreshing.
5. In browser developer tools, confirm API calls use the Render URL, requests include credentials, and responses have no CORS errors. Check cookie storage if login appears successful but protected requests return 401; browsers that block third-party cookies may require the custom-domain setup noted above.
6. Test the contact form only after SMTP is configured. Check MongoDB Atlas for the user/profile/request documents created during the smoke test.

## 👨‍💻 Team Members

- Yash Kushwaha
- Vishesh Katiyar

## 📌 Project Status

🚧 Currently Under Development
