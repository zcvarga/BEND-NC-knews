const { formatDate } = require('../utils/index');
const { expect } = require('chai');


describe('formatData', () => {
  it('returns the object with the data in the required format instead of the timestamp', () => {
    const input = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
                    'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389,
      },
    ];
    const actual = formatDate(input);
    const expected = [{
      title: 'Running a Node App',
      topic: 'coding',
      author: 'jessjelly',
      body:
                'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
      created_at: '2016-08-18',
    }];
    expect(actual).to.eql(expected);
  });
  it('returns the object with the data in the required format instead of the timestamp', () => {
    const input = [
      {
        body:
                    'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
                    'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932,
      },

    ];
    const actual = formatDate(input);
    const expected = [{
      body:
                'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      belongs_to:
                'The People Tracking Every Touch, Pass And Tackle in the World Cup',
      created_by: 'tickle122',
      votes: -1,
      created_at: '2016-07-09',
    }];
    expect(actual).to.eql(expected);
  });
});
