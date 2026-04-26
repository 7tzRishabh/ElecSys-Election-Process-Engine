import https from 'https';

const options = {
  hostname: 'commons.wikimedia.org',
  path: '/w/api.php?action=query&list=search&srsearch=filetype:bitmap%20India%20election&srnamespace=6&format=json',
  headers: {
    'User-Agent': 'MyApp/1.0'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    const titles = json.query.search.map(s => s.title);
    console.log(titles);
  });
});
