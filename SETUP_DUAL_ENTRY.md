# GJIMT Smart Student Data Center — Scan + Manual Entry

This update is based on the uploaded NPFSchoolData-main project and the official GJIMT Career Counseling & Student Profile Feedback Form.

## New functionality
- New sidebar page: Manual Data Entry.
- Five sections and choices from the supplied form.
- Counselor name on both manual and scanned records.
- Manual records save to the same Google Sheet using the existing save API.
- The backend adds missing `entryMethod` and `counselorName` columns without deleting existing rows.
- Existing upload/scan, verify, records, analytics and logos remain.

## Installation / important steps
1. Back up your existing Google Sheet and Apps Script first.
2. Open `Code.gs` in the ZIP, copy its entire contents into your existing Google Apps Script project, and save.
3. Deploy > Manage deployments > Edit > Version: New version > Deploy. Keep your existing deployment URL if possible.
4. Keep `config.js` pointing to the correct /exec deployment URL. Do not put a PIN in GitHub.
5. Replace frontend files in your GitHub Pages repository: `index.html`, `app.js`, `manual.js`, `style.css` and other assets/scripts from this folder. Keep relative paths unchanged.
6. Test with VS Code Live Server or GitHub Pages, then enter your staff PIN.
7. To enter a student manually, first add/select the school in Upload & Scan, then click Manual Data Entry, select school and fill the form.
8. Click Save Student Record. Check the Google Sheet `Students` tab and dashboard.
9. To scan, use Upload & Scan as before, enter the counselor name, and review each result.

## Limitations / security
- OCR and tick detection remain best-effort; review scanned records carefully.
- The manual form is a functional web reproduction of the paper form, not a pixel-identical Word document.
- School creation uses the existing Upload & Scan page; it is shared with manual entry.
- Existing shared-PIN security is not appropriate for real student personal data on a publicly accessible site. Test with dummy data until proper per-user authentication and server-side authorization are in place.
- Do not commit any real student records or staff PIN to GitHub.
