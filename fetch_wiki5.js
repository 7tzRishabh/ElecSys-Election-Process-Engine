import https from 'https';

const url = 'https://en.wikipedia.org/w/api.php?action=query&list=allimages&aiprop=url&aiprefix=Election_in_India&format=json';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data);
  });
});
