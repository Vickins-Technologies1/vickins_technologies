This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## ChamaHub: Call Notifications + Attendance

### Call notifications (email/SMS)

- When a group call is created with a future `scheduledFor`, the API sends a "scheduled" notification to group members.
- When a call is created without a schedule time (or scheduled essentially for now), the API sends a "starting" notification.
- For scheduled calls, the "starting" notification is sent by a cron-triggered job endpoint.

Env vars:

- `EMAIL_USER`, `EMAIL_PASS` (email via Nodemailer/Gmail)
- Optional SMS via Twilio: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM`
- Cron auth: `JOBS_TOKEN`

Cron endpoint (run every 1-5 minutes):

- `GET /api/jobs/chama-call-notifications?token=...`

### Attendance capture (Google Meet)

- The calls page includes a "Sync attendance" action for admins/secretaries on calls that are ready.
- Attendance is captured using Google Meet `conferenceRecords` + `participantSessions` and stored per call.

Env vars:

- `GOOGLE_MEET_CLIENT_ID`, `GOOGLE_MEET_CLIENT_SECRET`, `GOOGLE_MEET_REFRESH_TOKEN`
- Optional formatting: `DEFAULT_TIME_ZONE` (defaults to `Africa/Nairobi`)
