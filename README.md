# Face ID / OTP Login App

A React.js frontend app with signup, 6-digit OTP login, and Face ID / biometric login using the WebAuthn API.

## Tech Stack

- React.js (Vite)
- React Router
- WebAuthn API (`navigator.credentials`) for Face ID / biometrics
- localStorage (no backend)

## Features

- **Signup** with email or phone, date of birth (DOB), and surname
- **Login via 6-digit OTP**
- **Login via Face ID / biometrics** (WebAuthn)
- **Dashboard (Home page)** where the user enables Face ID for the device
- **One active device limit** (simulated using a device ID)
- Protected routes and logout

## How to Run

1. Clone the repository
   ```bash
   git clone <your-repo-link>
   cd <project-folder>
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in Chrome or Safari.

> WebAuthn works only on `localhost` or HTTPS.

## App Flow

1. **Signup:** The user enters email or phone, DOB, and surname. The details are saved in localStorage.
2. **OTP Login:** The user logs in with a 6-digit OTP (generated on the frontend, shown for demo purposes).
3. **Dashboard:** After login, the user lands on the dashboard and clicks **"Enable Face ID"**. This registers a WebAuthn credential on the device, and only the credential ID is stored in localStorage.
4. **Next logins:** If Face ID is enabled, the login page shows **"Login with Face ID"** first and hides the form. The user can choose **"Use OTP instead"** at any time.
5. **Face ID fails or is cancelled:** The app falls back to the OTP form.

## How Face ID Works

- `registerFaceId()` calls `navigator.credentials.create()`, which triggers the device's biometric prompt and creates a credential.
- The credential ID is converted to Base64URL text and saved in