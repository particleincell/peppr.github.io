# Direct Inquiries form

The included Direct Inquiries form is fully functional on a plain static host: it validates required fields and opens the visitor’s email application with a pre-addressed, pre-filled message. Update the `data-recipient="peppr@calpoly.edu"` value on the form in `team.html` before launch if the recipient changes.

## Sending without opening an email app

Static HTML, CSS, and JavaScript cannot safely send email directly because SMTP/API credentials would be exposed. To receive submissions silently, connect a form service or serverless endpoint.

### Netlify Forms (no custom server)

1. Deploy the site to Netlify.
2. Replace the `#direct-inquiry` form tag with `<form name="direct-inquiry" method="POST" data-netlify="true">`.
3. Add `<input type="hidden" name="form-name" value="direct-inquiry">` directly inside the form.
4. Remove the JavaScript submit handler for `#direct-inquiry`; Netlify then handles the submission.

### Other hosts

Use a service such as Formspree, Basin, or a serverless function. Configure its endpoint in the form `action`, keep the visible fields unchanged, and follow the provider’s spam-protection guidance. Never put a private email API key in `assets/js/site.js`.
