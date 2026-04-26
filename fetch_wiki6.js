import https from 'https';

const options = {
  hostname: 'commons.wikimedia.org',
  path: '/w/api.php?action=query&list=search&srsearch=India%20voter&format=json',
  headers: {
    'User-Agent': 'MyApp/1.0'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data.slice(0, 500));
  });
});
