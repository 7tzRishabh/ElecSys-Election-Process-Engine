import https from 'https';

const options = {
  hostname: 'commons.wikimedia.org',
  path: '/w/api.php?action=query&list=search&srsearch=filetype:bitmap%20India%20rally&srnamespace=6&format=json',
  headers: {
    'User-Agent': 'MyApp/1.0'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    const titlesParam = json.query.search.map(s => encodeURIComponent(s.title)).join('|');
    https.get({
        hostname: 'commons.wikimedia.org',
        path: `/w/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=${titlesParam}`,
        headers: { 'User-Agent': 'MyApp/1.0' }
    }, (res) => {
        let d2 = '';
        res.on('data', chunk => d2 += chunk);
        res.on('end', () => {
             const j2 = JSON.parse(d2);
             Object.values(j2.query.pages).forEach(p => {
                 if(p.imageinfo) console.log(p.imageinfo[0].url);
             });
        });
    });
  });
});
