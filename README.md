# CCS Lost and Found Management System (LFMS)

An intelligent, privacy-first property recovery platform designed for the College of Computer Studies (CCS). Built with **Google Cloud Firestore**, **Firebase Authentication (Microsoft 365 Entra ID & Google OAuth)**, and an Apple-inspired user interface with native Apple iOS emojis.

---

## Key Features

- **Guest Access & Privacy by Design**:
  - Open public browsing for lost and found items.
  - Automatic contact information masking (`0917-***-**67` and `2023-*****`) protecting student privacy under the Data Privacy Act (RA 10173).
  - Friendly gatekeeper interception requiring authentication before reporting or claiming items.

- **Student Portal**:
  - Single Sign-On (SSO) via institutional Microsoft 365 or authorized Google/Gmail accounts.
  - One-click **Report Lost Item** and **Report Found Item** with custody selection (*With Finder*, *CCS Office*, or *Direct Handover*).
  - **Smart Finder Communication**: Automatically detects finder account type and surfaces the right channel (direct compose on **Gmail** for Gmail finders, or direct 1-on-1 chat on **Microsoft Teams** for institutional school accounts).
  - **Direct Handover Confirmation ("I Got It Back! ✅")**: Ensures items can only be marked as resolved when the actual owner confirms receipt.
  - Dedicated **My Reports** tracking tab.

- **Staff & Property Custodian Dashboard**:
  - Full analytics tracking active lost, found, and resolved items.
  - Full unmasked access to student contact details for physical custody coordination.
  - **Claims Review Center**: Cross-examine submitted ownership proof and approve/reject claims. Enforces anti-self-approval protection.
  - **Finder Reports Verification**: Verify found item turnover to the CCS Office.
  - Catalog moderation and status toggle.

- **Administrator Command Center**:
  - Real-time system metrics and audit logs.
  - **User Management Console**: Browse campus directory, pre-assign faculty/staff roles by email, promote/demote user roles, and manage accounts.
  - Exclusive administrative listing deletion privileges.

---

## Tech Stack & Architecture

- **Frontend**: Vanilla JavaScript (ES6+), Tailwind CSS, Apple Color Emoji typography stack (`emoji-datasource-apple`).
- **Database**: Google Cloud Firestore (NoSQL Document Database with real-time WebSocket `onSnapshot` synchronization).
- **Authentication**: Firebase Authentication supporting OAuth 2.0 via Microsoft Entra ID (Azure AD tenant directory) and Google OAuth.
- **Security & Authorization**: Cloud Firestore Security Rules (`firestore.rules`) enforcing backend Role-Based Access Control (RBAC).
- **Hosting**: Firebase Hosting on Google Cloud global Edge CDN.
- **Resilience**: Local storage engine (`localStorage`) providing graceful offline fallback.

---

## Project Structure

```text
├── index.html          # Main application file
├── firebase.json       # Firebase Hosting & Firestore configuration
├── firestore.rules     # Backend security rules & RBAC validation
├── .firebaserc         # Firebase project targeting
├── .gitignore          # Git exclusion rules
├── public/
│   ├── index.html      # Production distribution file
│   └── ccslogo.png     # Official CCS seal graphic
└── backups/            # Milestone architectural snapshots
```

---

## Deployment

Deploy directly to Firebase Hosting:

```bash
firebase deploy
```
