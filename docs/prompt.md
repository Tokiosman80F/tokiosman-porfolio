The new URL is in place and the build passes, but https://cal.com/tokiosman/project-call
doesn't exist on Cal.com yet. It returns 404 ("This page could not be found"), so as things
stand every Book a call button opens a 404 inside the modal. Your profile cal.com/tokiosman is
live, and the only event it has is cal.com/tokiosman/30min ("30 min meeting").

To fix it, do one of these:

- In Cal.com, create an event with the URL slug project-call (or rename the 30-min event to
  it). The code then works as it is.
- Or tell me to point bookingUrl at https://cal.com/tokiosman/30min, which works today.

What I changed (not committed)

- content/site.ts: bookingUrl is now https://cal.com/tokiosman/project-call, and I replaced the
  old "PLACEHOLDER" comment.
- components/BookingModal.tsx: reworded one comment that described the placeholder. The code
  itself is unchanged.

Already correct

- All the buttons use this value. Every Book a call button reads site.bookingUrl: hero, header,
  services, pricing, about, FAQ, testimonials, contact, footer and all service pages. In the
  build, all 75 booking links on the site point to the new URL, with no other Cal.com links.
- Cal's script only loads on click. BookingModal.tsx (mounted once in the root layout) catches
  clicks on those links and only then adds https://app.cal.com/embed/embed.js. That script
  isn't in any page's HTML, and there's no npm package for it.
- Fallbacks keep working. A Ctrl/Cmd-click still opens the booking page in a new tab, and
  visitors with JavaScript off still get a normal link.

Not tested in a browser. The Chrome extension isn't connected, so I couldn't click through the
modal on mobile or desktop. Cal's modal is their own full-screen overlay on small screens.
Earlier notes in PROJECT_PROGRESS.md record it opening without errors against Cal's demo event,
but that was before this change. Once the event exists, either connect the extension so I can
test both sizes, or check it yourself.
