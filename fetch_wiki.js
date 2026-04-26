import https from 'https';

const options = {
  hostname: 'en.wikipedia.org',
  path: '/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=Elections_in_India|Electronic_voting_in_India|Election_Commission_of_India|Voter-verified_paper_audit_trail',
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
