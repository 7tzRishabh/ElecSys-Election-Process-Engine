import https from 'https';

const titles = [
  'File:Election commission of India, Election certificate.jpg',
  'File:Election commission of india voter helpline 1950.jpg',
  'File:A voter in India General Elections 2014.jpg'
];

const titlesParam = titles.map(t => encodeURIComponent(t)).join('|');

const options = {
  hostname: 'commons.wikimedia.org',
  path: `/w/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=${titlesParam}`,
  headers: {
    'User-Agent': 'MyApp/1.0'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    Object.values(json.query.pages).forEach(p => console.log(p.imageinfo[0].url));
  });
});
