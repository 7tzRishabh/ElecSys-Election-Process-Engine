import https from 'https';

const options = {
  hostname: 'en.wikipedia.org',
  path: '/w/api.php?action=query&list=search&srsearch=Election%20counting%20filetype:bitmap&format=json',
  headers: {
    'User-Agent': 'MyApp/1.0 (someuser@example.com)'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data);
  });
});
