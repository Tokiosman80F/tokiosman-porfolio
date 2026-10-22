# CTA Section Content

Final call-to-action section, placed before the footer. Replaces the agency copy ("brand refresh", "sprint window", "senior partners").

---

## Badge

● AVAILABLE FOR NEW PROJECTS · [MONTH 2026]

Only show this while it's true, and update the month regularly.

---

## Headline

HAVE A PROJECT IN MIND BUT **UNSURE** WHERE TO START?

- Highlighted word(s): **UNSURE** (green box, same style as now)

Alternative (ties to the hero):
READY FOR A WEBSITE THAT ACTUALLY **SELLS**?

---

## Subheadline

One free 30-minute call is all it takes. We'll talk through your goals, and I'll tell you what to build, how long it takes, and what it costs, with a fixed quote within 24 hours. No pressure, no obligation.

---

## Buttons

- Primary: BOOK A FREE 30-MIN CALL 📅 (link: your booking URL)
- Secondary: SEE MY WORK 👁 (link: `#work`)

---

## Contact form

Shown beside the buttons, or under an expandable link. The call stays the main action.

- Toggle link: Prefer to write? Send a message ↓
- Form heading: Tell me about your project
- Form subtext: I'll reply within 24 hours.

### Fields

| Field                        | Type     | Required | Placeholder                                     |
| ---------------------------- | -------- | -------- | ----------------------------------------------- |
| Name                         | text     | Yes      | Your name                                       |
| Email                        | email    | Yes      | you@company.com                                 |
| Project type                 | select   | Yes      | Website · Web app · AI upgrade · Custom         |
| Message                      | textarea | Yes      | What are you building, and when do you need it? |
| Budget (optional, add later) | select   | No       | Under $1,500 · $1,500–4,500 · $4,500+           |

### Button

SEND MESSAGE →

### Small note under the button

This form sends your message straight to my CRM. Want the same for your business?

### Success state

- Heading: Thanks, [Name]! 🎉
- Text: Your message is in. I'll reply within 24 hours. In the meantime, feel free to book a call.
- Button: Book a free call

### Error state

Something went wrong. Please try again, or email me at tokiosman@outlook.com.

### Validation messages

- Name: Please enter your name.
- Email: Please enter a valid email address.
- Project type: Please pick a project type.
- Message: Please tell me a little about your project.

---

## Form technical notes

1. **CRM:** send submissions to Zoho CRM as new leads (name, email, project type, message, source: "Portfolio contact form").
2. **Auto-reply:** send the visitor a confirmation email right away.
3. **Notification:** email or WhatsApp yourself for each new lead.
4. **Spam protection:** add a hidden honeypot field and Cloudflare Turnstile. Never use a plain mailto form.
5. **Validation:** validate on both the client and the server (e.g. zod with a Next.js server action or API route).
6. **Accessibility:** every input gets a visible `<label>`, errors are linked with `aria-describedby`, and the success message uses `aria-live="polite"`.

---

## Trust line (under the divider)

FIXED PRICE · DIRECT WITH THE DEVELOPER · LAUNCH IN 2–4 WEEKS

---

## Related change

The final CTA block has been removed from `footer-section.md`, since this section now does that job.
