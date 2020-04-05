const Parser = require('rss-parser');

const parser = new Parser({
  customFields: {
    item: [['media:thumbnail', 'media:thumbnail', { keepArray: false }]],
  },
});

module.exports = {
  name: 'Daily Mail',
  working: true,
  url: 'https://dailymail.co.uk/',
  priority: 200,
  banner: {
    text: 'Daily Mail',
    byline: 'Powered by the',
    color: '#1D4DB3',
  },
  getData: () =>
    parser
      .parseURL('https://www.dailymail.co.uk/news/index.rss')
      .then(({ items }) => {
        let id = 0;

        return items
          .reduce((acc, { title, link: url, ...rest }) => {
            if (!url) {
              return acc;
            }

            const thumbnail = rest['media:thumbnail'].$.url;

            // eslint-disable-next-line no-plusplus
            acc.push({ id: id++, title, url, thumbnail });
            return acc;
          }, [])
          .slice(0, 10);
      })
      .catch(err => console.log(err)),
};
