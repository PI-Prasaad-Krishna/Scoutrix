const fs = require('fs');

const authModal = 'src/components/AuthModal.jsx';
let content = fs.readFileSync(authModal, 'utf8');
content = content.replace(
    `            if (isLogin) {
                navigate(\`/dashboard/\${data.role}\`);
                if (onLoginSuccess) onLoginSuccess(data);
            }`,
    `            if (isLogin) {
                localStorage.setItem('scoutrix_token', data.token); // Save token!
                navigate(\`/dashboard/\${data.role}\`);
                if (onLoginSuccess) onLoginSuccess(data);
            }`
);
content = content.replace(`credentials: 'include',`, ``);
fs.writeFileSync(authModal, content);

const appJs = 'src/App.jsx';
let appContent = fs.readFileSync(appJs, 'utf8');
appContent = appContent.replace(
    `      await fetch('https://scoutrix.onrender.com/api/auth/logout', {`,
    `      localStorage.removeItem('scoutrix_token');\n      await fetch('https://scoutrix.onrender.com/api/auth/logout', {`
);
appContent = appContent.replace(`credentials: 'include'`, `headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` }`);
fs.writeFileSync(appJs, appContent);

// AutomatedRecruitment.jsx
const ar = 'src/pages/AutomatedRecruitment.jsx';
let arContent = fs.readFileSync(ar, 'utf8');
arContent = arContent.replace(
    `                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'`,
    `                headers: { 'Content-Type': 'application/json', Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` },
                body: JSON.stringify(formData)`
);
fs.writeFileSync(ar, arContent);

// ExplorePage.jsx
const ep = 'src/pages/ExplorePage.jsx';
let epContent = fs.readFileSync(ep, 'utf8');
epContent = epContent.replace(
    `{ credentials: 'include' }`,
    `{ headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` } }`
);
epContent = epContent.replace(
    `{ credentials: 'include' }`,
    `{ headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` } }`
);
epContent = epContent.replace(
    `                method: 'POST',
                credentials: 'include'`,
    `                method: 'POST',
                headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` }`
);
fs.writeFileSync(ep, epContent);

// Leaderboard.jsx
const lb = 'src/pages/Leaderboard.jsx';
let lbContent = fs.readFileSync(lb, 'utf8');
lbContent = lbContent.replace(
    `{ credentials: 'include' }`,
    `{ headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` } }`
);
fs.writeFileSync(lb, lbContent);

// PostPage.jsx
const pp = 'src/pages/PostPage.jsx';
let ppContent = fs.readFileSync(pp, 'utf8');
ppContent = ppContent.replace(
    `{ credentials: 'include' }`,
    `{ headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` } }`
);
ppContent = ppContent.replace(
    `                method: 'POST',
                body: formData,
                credentials: 'include'`,
    `                method: 'POST',
                body: formData,
                headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` }`
);
fs.writeFileSync(pp, ppContent);

// ProfilePage.jsx
const prof = 'src/pages/ProfilePage.jsx';
let profContent = fs.readFileSync(prof, 'utf8');
profContent = profContent.replace(
    `{ credentials: 'include' }`,
    `{ headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` } }`
);
fs.writeFileSync(prof, profContent);

// RecruiterApplicants.jsx
const ra = 'src/pages/RecruiterApplicants.jsx';
let raContent = fs.readFileSync(ra, 'utf8');
raContent = raContent.replace(
    `{ credentials: 'include' }`,
    `{ headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` } }`
);
fs.writeFileSync(ra, raContent);

// RecruiterExplore.jsx
const re = 'src/pages/RecruiterExplore.jsx';
let reContent = fs.readFileSync(re, 'utf8');
reContent = reContent.replace(
    `{ credentials: 'include' }`,
    `{ headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` } }`
);
reContent = reContent.replace(
    `{ method: 'POST', credentials: 'include' }`,
    `{ method: 'POST', headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` } }`
);
fs.writeFileSync(re, reContent);

// RecruiterPost.jsx
const rp = 'src/pages/RecruiterPost.jsx';
let rpContent = fs.readFileSync(rp, 'utf8');
rpContent = rpContent.replace(
    `                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include'`,
    `                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` },
                body: JSON.stringify(payload)`
);
fs.writeFileSync(rp, rpContent);

// SavedProfiles.jsx
const sp = 'src/pages/SavedProfiles.jsx';
let spContent = fs.readFileSync(sp, 'utf8');
spContent = spContent.replace(
    `{ credentials: 'include' }`,
    `{ headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` } }`
);
spContent = spContent.replace(
    `                method: 'POST',
                credentials: 'include'`,
    `                method: 'POST',
                headers: { Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\` }`
);
fs.writeFileSync(sp, spContent);

// sarvamApi.js
const sa = 'src/utils/sarvamApi.js';
let saContent = fs.readFileSync(sa, 'utf8');
saContent = saContent.replace(
    `                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: textToTranslate, targetLang: 'hi' }),
                credentials: 'include'`,
    `                headers: {
                    'Content-Type': 'application/json',
                    Authorization: \`Bearer \${localStorage.getItem('scoutrix_token')}\`
                },
                body: JSON.stringify({ text: textToTranslate, targetLang: 'hi' })`
);
fs.writeFileSync(sa, saContent);

console.log('Update Complete!');
