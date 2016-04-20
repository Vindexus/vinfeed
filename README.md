# Vinfeed
Feed of social media subscribers/followers to display on Twitch stream.

# Preview

![Preview of Capture](http://i.imgur.com/LxoAa3x.png)

# Prerequisities

    1. Node.js
    2. MongoDB
    3. Twitter API keys - [Register a Twitter App here](https://apps.twitter.com/)

# Installation
This app is meant to be used locally on the machine that is doing the Twitch streaming, but it doesn't need to be.

Clone the app into the directory you wish to run it in.

    git clone vinfeed git@github.com:Vindexus/vinfeed.git
    
Install the node dependencies.

    npm install
    
Install MongoDB (done separately) then set the URI in your ENV variables. For localhost you can use mongodb://localhost/vinfeed

    set MONGODB_URI={your_mongo_uri}
    
Run the app

    node app.js
    
Add feeds at http://localhost:3000/feeds
    
Run the watch script. This is what periodically fetches the followers based on the feeds you have created.

    node watch.js
    
Capture the page at http://localhost:3000/follows/capture into OBS or Xsplit, either a CLR browser plugin or a screen capture of Chrome
