import https from 'https';

const options = {
  hostname: 'en.wikipedia.org',
  path: '/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=Political_rally|Indian_voter_ID_card|Ballot_box|Counting_station|Political_campaign',
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
