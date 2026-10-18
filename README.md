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

## 👨‍💻 Team Members

- Yash Kushwaha
- Vishesh Katiyar

## 📌 Project Status

🚧 Currently Under Development
