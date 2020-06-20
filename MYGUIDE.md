## Guide to 2019/2020 Dreamscraper

node directory runs dreamscrape app
C:\Users\User\Google Drive\DreamTeam\Node\

In the terminal:

1. type 'node app.js'
   C:\Users\User\Google Drive\DreamTeam\Node\app.js

this delivers base info and the date last updated file to DTFB

2. type 'node updateAllTeamsFirebase'
   C:\Users\User\Google Drive\DreamTeam\Node\updateAllteamsFirebase.js
   This calculates manager data for the GW and outputs the files to DTFB forming the data to build the updated web app with the new GW data

## Building web app with new data

Over to DTFB
C:\Users\User\OneDrive\DTFB\dt-appx-up\

In the terminal:

1. run 'yarn build'
2. 'firebase serve ' enables you to see that all is ok
3. 'firebase deploy' updates firebase with new build
