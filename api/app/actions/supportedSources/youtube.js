const { get } = require('axios');

module.exports = {
  name: 'YouTube',
  working: true,
  imgName: 'youtube.png',
  url: 'https://youtube.com/',
  priority: 120,
  getData: () =>
    get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=${
        process.env.API_KEY_YOUTUBE
      }`,
    )
      .then(({ data: { items } }) => {
        let id = 0;

        return items
          .reduce(
            (
              acc,
              {
                id: videoId,
                snippet: {
                  title,
                  thumbnails: {
                    default: { url: thumbnail },
                  },
                },
              },
            ) => {
              if (!videoId) {
                return acc;
              }

              acc.push({
                // eslint-disable-next-line no-plusplus
                id: id++,
                title,
                url: `https://www.youtube.com/watch?v=${videoId}`,
                thumbnail,
              });
              return acc;
            },
            [],
          )
          .slice(0, 10);
      })
      .catch(err => console.log(err)),
  attributionLink: {
    text: "YouTube's TOS",
    link: 'https://www.youtube.com/t/terms/',
  },
};
