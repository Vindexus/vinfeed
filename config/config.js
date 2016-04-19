var config = {
  feedCheckInterval: 600000, //How often to go through all the feeds and run API fetches with them (ms)
  followsNumDisplay: 30, //How many follows to show in the output at one time
  followsDisplayTime: 10000, //Minimum MS to show each follow item for before trying to find the next one
  followsInitialBuffer: 10 //How many follows to skip on initial load. This creates a sort of artifical backlog for the feed to cycle through, even if no new follows are coming in
};
module.exports = config;