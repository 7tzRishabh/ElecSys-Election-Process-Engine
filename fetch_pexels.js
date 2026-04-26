import https from 'https';

https.get('https://www.pexels.com/search/voting/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/https:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.jpeg/g);
    if(matches) {
       const unique = [...new Set(matches)];
       console.log('VOTING:', unique.slice(0, 5));
    }
  });
});
https.get('https://www.pexels.com/search/election/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/https:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.jpeg/g);
    if(matches) {
       const unique = [...new Set(matches)];
       console.log('ELECTION:', unique.slice(0, 5));
    }
  });
});
