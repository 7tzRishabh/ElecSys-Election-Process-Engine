import https from 'https';

const options = {
  hostname: 'en.wikipedia.org',
  path: '/w/api.php?action=query&list=search&srsearch=India%20election&format=json',
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
