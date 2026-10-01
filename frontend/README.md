# Private Members Savings & Loan Group

React and Vite application for managing private member registrations, savings,
loans, nominees, witnesses, and office approval details.

## Application Flow

The application uses one registration page instead of separate pages:

1. Open the dashboard.
2. Select **Add member**.
3. Complete member details and ID proof.
4. Complete membership and nominee details.
5. Complete the declaration, witness, and office sections.
6. Save a draft or submit the registration.

## Project Structure

```text
private services/
├── public/                         # Static public assets
├── src/
│   ├── assets/                     # Application images and assets
│   ├── Components/
│   │   ├── Dashboard.jsx           # Workspace dashboard
│   │   ├── navbar.jsx              # Main navigation
│   │   └── registration/           # Single-page registration sections
│   │       ├── FormField.jsx       # Reusable input field
│   │       ├── FormSection.jsx     # Registration section wrapper
│   │       ├── MemberDetails.jsx   # Member details and ID proof
│   │       ├── MembershipDetails.jsx
│   │       ├── NomineeDetails.jsx
│   │       ├── MemberDeclaration.jsx
│   │       ├── WitnessDetails.jsx
│   │       ├── OfficeUseOnly.jsx
│   │       ├── MemberSummary.jsx
│   │       ├── SelectField.jsx     # Reusable select field
│   │       └── RadioField.jsx      # Reusable radio group
│   ├── constants/
│   │   └── formOptions.js          # Options and initial form state
│   ├── hooks/
│   │   └── useMemberForm.js        # Form state, drafts, and submission
│   ├── services/
│   │   └── memberService.js        # Registration service boundary
│   ├── utils/
│   │   ├── formHelpers.js          # Form calculations and helpers
│   │   └── validation.js           # Registration validation
│   ├── App.jsx                     # Application view switching
│   ├── App.css                     # Layout and component styles
│   ├── banking.css                 # Banking workspace styles
│   ├── index.css                   # Global styles and Tailwind import
│   └── main.jsx                    # React entry point
├── index.html
├── package.json
└── vite.config.js                  # Vite, React, and Tailwind configuration
```

## Technology

- React 19
- Vite
- Tailwind CSS 4
- ESLint
- Browser local storage for draft registration data

## Commands

Run these commands from the `private services` directory:

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm run lint       # Check source files
npm run build      # Create a production build
npm run preview    # Preview the production build
```
