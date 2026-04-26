const https = require('https');

https.get('https://unsplash.com/s/photos/voting', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
    const unique = [...new Set(matches)];
    console.log("VOTING:");
    console.log(unique.slice(0, 5).join('\n'));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

https.get('https://unsplash.com/s/photos/election-rally', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
    const unique = [...new Set(matches)];
    console.log("RALLY:");
    console.log(unique.slice(0, 5).join('\n'));
  });
});
