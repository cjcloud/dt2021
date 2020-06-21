/* This App scrapes the website and creates two files:
  playerData.json in the node directory for use with the web project and;
  data.json in the googledrive/dreamteam/dataJSON folder for use with the
  master spreadsheet
*/

const fs = require("fs");
const dummyContent = {
  playerId: 11345,
  playerDetails: {
    playerName: "There was a problem with Player Data",
    playerClub: "Pub",
  },
  playerData: [{ gwNumber: 1, gwPts: 2, gwTotalPts: 100 }],
};

// Set up puppeteer
const puppeteer = require("puppeteer");

//the playerStatsUrl is the location of the player data
let playerStatsUrl = "https://www.dreamteamfc.com/g/#season/stats-centre-stats";

//try to offset tests for bots by providing the userAgent
const preparePageForTests = async (page) => {
  // Pass the User-Agent Test.
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
  await page.setUserAgent(userAgent);
};

//const newLocal = "playersDataString[f].playerId= ";
//getData is the function that scrapes and parses the html for two pages
//matchcentre has the game week
//playerStats has the player detail and game week data

async function getData() {
  // launch browser visbly to allow console.log debugging or set to headless: true when app stable
  const browser = await puppeteer.launch({ headless: true, devtools: true });

  let playersData = fs.readFileSync("./playerData.json", "utf8");

  // the player data is
  let playersDataString = playersData;

  // set the scraped Result variable as a global within the getdata function
  let scrapedResult;

  /*==============================================================================/*/

  //scrape for the GW first

  const matchCentre = "https://www.dreamteamfc.com/g/#season/match-centre";
  const page2 = await browser.newPage();
  await preparePageForTests(page2);
  await page2.setDefaultNavigationTimeout(140000);
  await page2.setViewport({ width: 1920, height: 926 });
  await page2.goto(matchCentre);

  console.log(" Page 2 Loaded ");

  // return page2;

  //-------------------------------------------------------------
  // onthe match centre page there is a selected dropdown displaying the current gameweek according to the site
  // in order to get the Game Week Number
  // look for the selected option which will be the current GW.

  const thisGW = await page2.evaluate(() => {
    let a = 0; // a is a global variable to pass state between functions

    console.log(document.URL);
    let elt = document.querySelectorAll("select")[1];
    let options = elt.options;
    console.table(options);
    let value = elt.options[elt.selectedIndex].value;
    let text = elt.options[elt.selectedIndex].text;
    a = text; // a allows the state to be updated/passed outside of this local scope
    console.log("#value of selected option = " + value);
    console.log("text of GW index = " + text);
    console.log("elt.length  = " + options.length);
    console.log("Options[0]  = " + options[0]);
    //  a = value;

    console.log("a =  " + a);

    // the scrpaed text has GW in format of the number and may have spaces and other non text characters
    // so these need removing leave the trimValue

    let trimValue = a.trim().replace(/&nbsp;/g, "");
    console.log("This week is " + trimValue);

    let GWnumbertext = trimValue.split(" ");
    console.log(" GWnumbertext - " + GWnumbertext);
    let t = GWnumbertext[1];
    let GWvalueNumber;
    if (t.isNaN || !t) {
      console.log("t is NaN @ 90");
      GWvalueNumber = 222;
    } else {
      GWvalueNumber = parseInt(t, 10);
    }
    return GWvalueNumber;
  });

  /*===========================================================================*/
  console.log("This is the GW scraped1  =  " + thisGW);
  // open new page and scrape for player details and gameweek data

  const page = await browser.newPage();
  await preparePageForTests(page);
  await page.setDefaultNavigationTimeout(140000);
  await page.setViewport({ width: 1920, height: 926 });
  await page.goto(playerStatsUrl);
  await preparePageForTests(page);

  console.log(" Page Loaded ");
  console.log("This is the GW scraped1  =  " + thisGW);

  const playerData = await page.evaluate(
    (playersDataString, thisGW) => {
      //   console.log("playersDataString @ 181 =  " + playersDataString);
      //   console.log("players set");

      let playersDataObj;
      playersDataObj = JSON.parse(playersDataString);
      // get the static player elements
      let playerDTElms = document.querySelectorAll(".table-player");
      // console.log("playerDTElms.length = " + playerDTElms.length);

      if (!playerDTElms.length) {
        // If array does not exist, is not an array, or is empty
        // ⇒ do not attempt to process array
        console.log("playerDTElms is EMPTY");
        //     let typeofPlayerDTElms = typeof playerDTElms;
        //    console.log("Type of playerDTElms is : " + typeofPlayerDTElms);
        //    console.log("playerDTElms.length" + playerDTElms.length);
      } else {
        playerDTElms.forEach((playerelement, index) => {
          let playerDataTP = {};

          //-------------------------------------------------------------
          //  Get the playerID
          //  put it into playerDataTP (TP stands for Table-Player elements)

          let Pid2 = playerelement.querySelector(".js-player-modal-season");

          console.log("playerID ==  " + Pid2.dataset.player_id);

          let playerIdAsText = Pid2.dataset.player_id;

          playerDataTP.playerId = parseInt(playerIdAsText, 10);

          //---------------------------------------------------------------

          //  Get the playerName
          //  put it into playerDataTP (TP stands for Table-Player elements)
          let playerCheck = playerelement.querySelector(".player-name")
            .innerText;

          if (playerCheck === ".. Bernardo") {
            playerDataTP.playerName = "B. Silva";
          } else {
            playerDataTP.playerName = playerCheck;
          }

          console.log(" playerName =" + playerDataTP.playerName);

          /*//---------------------------------------------------------------
          //  Get the playerClub
          //  put it into playerDataTP (TP stands for Table-Player elements) */

          let clubText = playerelement.querySelectorAll("p")[1].innerText;

          //the player club text will be in the format of [position, club]... need to strip club out of array and
          // leave club name as one or two strings

          // The club names can have one or two words e.g. Arsenal and Man City
          // need to parse the club text and test accordingly

          //split the text using spaces
          let club = clubText.split(" ", 4);

          // remove the first item i.e. the text relating to position which sits
          // at position 0 after splitting the text
          club.splice(0, 1);

          // console.log(club);

          // test to see if clubname has more than one word or not and tidy up

          if (club.length > 1) {
            //make the first letters of two words capital letters
            club[0] = club[0].toLowerCase();
            club[0] = club[0].replace(/^\w/, (c) => c.toUpperCase());

            club[1] = club[1].toLowerCase();
            club[1] = club[1].replace(/^\w/, (c) => c.toUpperCase());

            let clubcheck = false;

            /* Check to see if club name is Leicester City because site mixes
              Leicester and Leicester City as club name */

            clubcheck = club[0] === "Leicester" ? true : false;

            if (!clubcheck) {
              club[0] = club[0] + " " + club[1];
            }

            club.pop();
            club = club.toString();
          } else {
            club[0] = club[0].toLowerCase();
            club[0] = club[0].replace(/^\w/, (c) => c.toUpperCase());
            club = club.toString();
          }

          /* ST is short for second table. The site uses two tables. One with playerdetails and one with player data.
            get the playerST data... This contains the Game Week Points and the Total Points */

          let playerSTElms = document.querySelectorAll(".second-table tr td");

          //set the base values to empty arrays
          let playerGWPts = [];
          let playerPts = [];
          let playerValue = [];

          for (let j = 0; j < playerSTElms.length; j++) {
            if (j % 5 === 0) {
              //this chooses the first element  of array containing player value ,
              //and every fifth element thereafter
              let b = playerSTElms[j].textContent;
              b = b.replace(/(\r\n|\n|\r)/gm, "");
              b = b.replace(/^\s+|\s+$/g, "");
              if (b === null || b === "") {
                b = 0;
              }

              playerValue = [...playerValue, b];
              // playerGWPts = c for each player
            } else if ((j > 0) & ((j - 1) % 5 === 0)) {
              //this chooses the second element containing GW points,
              //and every fifth element thereafter

              let c = playerSTElms[j].textContent;
              c = c.replace(/(\r\n|\n|\r)/gm, "");
              c = c.replace(/^\s+|\s+$/g, "");
              c = Number(c);

              if (isNaN(c)) {
                // this gets rid of the any text such as DNP(did not play)
                // Zero is substituted for DNP
                let g = 0;
                c = g;
              } else {
                c = Number(c);
              }

              playerGWPts = [...playerGWPts, c];
              // playerGWPts = c for each player
            } else if ((j - 3) % 5 === 0) {
              //  this chooses the 4th element and every 5th
              //  element after that for Total Pts
              let d = playerSTElms[j].textContent;
              d = d.replace(/(\r\n|\n|\r)/gm, "");
              d = d.replace(/^\s+|\s+$/g, "");
              d = Number(d);

              playerPts = [...playerPts, d];
              // playerPts = d for each player
            }
          }

          //----------------------------------------------------------------------

          // add the new player data to players as object

          let player = {
            playerId: playerDataTP.playerId,
            playerDetails: {
              playerName: playerDataTP.playerName,
              playerClub: club,
            },
            gwData: {
              gwNumber: thisGW,
              playerValue: playerValue[index],
              gwPts: playerGWPts[index],
              gwTotalPts: playerPts[index],
            },
          };

          let currentPlayerId = player.playerId;
          // let f = Number;
          //   let gwExists = false;

          /* Define function to search obj for key and return the value of  */

          function findByKey(key, value) {
            return (item) => item[key] === value;
          }

          /* ---------------------------------------------*/

          //find index of item that matches playerId

          let findParams = findByKey("playerId", currentPlayerId);
          let idx = playersDataObj.findIndex(findParams);

          console.log("idx = " + idx);

          /* ---------------------------------------------*/

          if (
            playersDataString === undefined ||
            playersDataString.length === 0
          ) {
            playersDataObj = [...player];
          } else {
            let found = idx;

            if (found > -1) {
              playersDataObj[found].gwData = player.gwData;
            } else {
              playersDataObj.push(player);
            }

            console.log("THIS GW NUMBER IS = " + thisGW);

            let playerGW = {
              gwData: {
                gwNumber: thisGW,
                playerValue: playerValue[index],
                gwPts: playerGWPts[index],
                gwTotalPts: playerPts[index],
              },
            };

            if (playersDataObj[found]) {
              playersDataObj[found].gwData.gwTotalPts =
                playerGW.gwData.gwTotalPts;
              playersDataObj[found].gwData.gwPts = playerGW.gwData.gwPts;
              playersDataObj[found].gwData.gwNumber = playerGW.gwData.gwNumber;
              playersDataObj[found].gwData.playerValue =
                playerGW.gwData.playerValue;
            } else {
              console.log("playersDataObj[found] NOT FOUND @ 333");
            }
          }
        });
      }

      return playersDataObj;
    },
    playersDataString,
    thisGW
  );

  await browser.close();

  console.log("thisGW = " + thisGW);

  scrapedResult = JSON.stringify(playerData, null, "\t");
  if (!scrapedResult) {
    console.log("problems @ 365");
  } else {
    console.log("playerData @ 365= " + "scrapedResult");
  }
  return scrapedResult;
}

//Once all scraping  done put data in file : data.json
const newScrape = async () =>
  await getData()
    .then((value) => {
      //write data to file data.json
      let contentData = value;
      if (contentData === undefined || contentData.length === 0) {
        contentData = dummyContent;
      } else {
        // console.log("This is value" + contentData);
        fs.writeFile(
          "../srcData/scrapedData/playerData.json",
          contentData,
          (err) => {
            if (err) {
              console.error(err);
            }
            console.log("File: playerDataJSON has been created");
            // This file is used by Excel program
          }
        );
        fs.writeFile("../srcData/scrapedData/data.json", contentData, (err) => {
          if (err) {
            console.error(err);
          }
          console.log("File: data.json has been created");
        });
        let today = new Date();
        let timeUpdated = Date().slice(16, 21);
        let dd = today.getDate();

        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        const dateUpdated = dd + "/" + mm + "/" + yyyy + " at: " + timeUpdated;
        console.log(dateUpdated);
        let dateLastUpdated = [{ dateLastUpdated: dateUpdated }];
        dateLastUpdatedJSON = JSON.stringify(dateLastUpdated);
        const uPathName = "./dateLastUpdated.json";

        fs.writeFile(uPathName, dateLastUpdatedJSON, (err) => {
          if (err) {
            console.error(err);
          }
          console.log("File: dateLastUpdated.json has been created in DTFB");
        });
      }
    })
    .catch((err) => console.log(err));

export default newScrape;
