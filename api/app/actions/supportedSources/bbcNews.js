const Parser = require('rss-parser');

const parser = new Parser();

module.exports = {
  name: 'BBC News',
  working: true,
  url: 'https://bbc.co.uk',
  priority: 30,
  banner: {
    text: 'BBC News',
    byline: 'Powered by',
    color: '#BB1919',
  },
  getData: () =>
    parser
      .parseURL('http://feeds.bbci.co.uk/news/rss.xml')
      .then(({ items }) => {
        let id = 0;

        return items
          .reduce((acc, { title, link: url }) => {
            if (!url) {
              return acc;
            }

            // eslint-disable-next-line no-plusplus
            acc.push({ id: id++, title, url });
            return acc;
          }, [])
          .slice(0, 10);
      })
      .catch(err => console.log(err)),
};
