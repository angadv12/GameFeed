const puppeteer = require('puppeteer');
const asyncHandler = require('express-async-handler');

const getScores = asyncHandler(async (req, res) => {
  try {
    let dateParam = req.query.date
    if (!dateParam) {
      let d = new Date();
      dateParam = d.toLocaleDateString('en-GB').split('/').reverse().join('-');
    }
    const url = `https://www.nba.com/games?date=${dateParam}`;

    const browser = await puppeteer.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const gameCardsExists = await page.$('.GamesView_gameCardsContainer__c_9fB')
    if(gameCardsExists) {
      const scores = await page.evaluate(() => {
        const games = [];
        const gameElements = document.querySelectorAll('section.GameCard_gcMain__q1lUW');

        gameElements.forEach(gameElement => {
          const gameLink = gameElement.querySelector('a');
          const gameId = gameLink.getAttribute('href').split('-').pop();
          const gameStatus = gameElement.querySelector('.GameCardMatchupStatusText_gcsText__PcQUX');
          const teams = gameElement.querySelectorAll('.MatchupCardTeamName_teamName__9YaBA');
          const scores = gameElement.querySelectorAll('.MatchupCardScore_p__dfNvc');
          const teamIdDivs = gameElement.querySelectorAll('.MatchupCardTeamName_base__PBkuX');
          const teamIds = []
          teamIdDivs.forEach(div => {
            teamIds.push(div.getAttribute('data-team-id'))
          })

          const setTeam = (index) => {
              return {
                name: teams[index].textContent.trim(),
                score: scores[index] ? scores[index].textContent.trim() : '',
                logo: `https://cdn.nba.com/logos/nba/${teamIds[index]}/global/L/logo.svg`
              };
          };

          const seriesInfo = gameElement.querySelector('.GameCardMatchup_gameSeriesText__zqvUF');
          let seriesInfoText = ""
          if (seriesInfo) {
            seriesInfoSpans = seriesInfo.querySelectorAll('span');
            seriesInfoSpans.forEach(span => {
              seriesInfoText += span.textContent.trim() + " "
            })
            seriesInfoText = seriesInfoText.trim()
          }

          const awayTeam = setTeam(0);
          const homeTeam = setTeam(1);

          games.push({
            gameId,
            gameStatus: gameStatus ? gameStatus.textContent.trim() : 'no game status',
            seriesInfo: seriesInfoText ? seriesInfoText : 'no series info',
            awayTeam,
            homeTeam
          });
        });

        return games;
      });
      await browser.close();

      if (scores.length > 0) {
        return res.json(scores)
      } else {
        return res.status(404).json([]) //if no scores are available
      }

    } else {
      await browser.close()
      return res.status(404).json([]) //if no gameCards exists
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching scores from NBA" })
  }
});

const getGameDetails = asyncHandler(async (req, res) => {
  const { gameId } = req.params;
  const boxScoreUrl = `https://www.nba.com/game/${gameId}/box-score/`
  const gameUrl = `https://www.nba.com/game/${gameId}`
  const browser = await puppeteer.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const page = await browser.newPage();

  await page.goto(boxScoreUrl, { waitUntil: 'networkidle2' });

  const boxScoreExists = await page.evaluate(() => {
    return (document.querySelectorAll('div.StatsTable_st__g2iuW table').length > 0);
  })

  if(boxScoreExists) {
    const gameDetails = await page.evaluate(() => {
      const teams = {
        away: [],
        home: []
      };
  
      const awayTeamRows = document.querySelectorAll('div.StatsTable_st__g2iuW table')[0].querySelectorAll('tbody tr');
      const homeTeamRows = document.querySelectorAll('div.StatsTable_st__g2iuW table')[1].querySelectorAll('tbody tr');
      const teamNames = document.querySelectorAll('.GameBoxscoreTeamHeader_gbt__b9B6g div');
  
      const processRows = (rows, team) => {
        rows.forEach(row => {
          const playerNameCell = row.querySelector('.GameBoxscoreTablePlayer_gbpNameShort__hjcGB');
          if (playerNameCell) {
            const playerName = playerNameCell.innerText.trim();
            const playerCell = row.querySelector('.GameBoxscoreTablePlayer_gbp__mPF20');
            if (playerCell) {
              const playerLink = playerCell.querySelector('a.Anchor_anchor__cSc3P.GameBoxscoreTablePlayer_link___fXjS')
              const playerId = playerLink.getAttribute('href').split('/')[2];
              const commentCell = row.querySelector('.GameBoxscoreTable_comment__J_Da_');
              if (commentCell) {
                // Handle DNP row
                const comment = commentCell.innerText.trim();
                const playerStats = {
                  face: `https://cdn.nba.com/headshots/nba/latest/260x190/${playerId}.png`,
                  player: playerName,
                  comment: comment
                };
                team.push(playerStats);
              } else {
                const cols = row.querySelectorAll('.GameBoxscoreTable_stat__jWIuU');
                const getStatValue = (col) => {
                  const link = col.querySelector('a');
                  return link ? link.innerText.trim() : col.innerText.trim();
                };
  
                if (cols.length === 20) { // Adjusting to 20 as position is part of player column
                  const playerStats = {
                    face: `https://cdn.nba.com/headshots/nba/latest/260x190/${playerId}.png`,
                    player: playerName,
                    MIN: getStatValue(cols[0]),
                    FGM: parseInt(getStatValue(cols[1]), 10) || 0,
                    FGA: parseInt(getStatValue(cols[2]), 10) || 0,
                    'FG%': parseFloat(getStatValue(cols[3])) || 0,
                    '3PM': parseInt(getStatValue(cols[4]), 10) || 0,
                    '3PA': parseInt(getStatValue(cols[5]), 10) || 0,
                    '3P%': parseFloat(getStatValue(cols[6])) || 0,
                    FTM: parseInt(getStatValue(cols[7]), 10) || 0,
                    FTA: parseInt(getStatValue(cols[8]), 10) || 0,
                    'FT%': parseFloat(getStatValue(cols[9])) || 0,
                    OREB: parseInt(getStatValue(cols[10]), 10) || 0,
                    DREB: parseInt(getStatValue(cols[11]), 10) || 0,
                    REB: parseInt(getStatValue(cols[12]), 10) || 0,
                    AST: parseInt(getStatValue(cols[13]), 10) || 0,
                    STL: parseInt(getStatValue(cols[14]), 10) || 0,
                    BLK: parseInt(getStatValue(cols[15]), 10) || 0,
                    TO: parseInt(getStatValue(cols[16]), 10) || 0,
                    PF: parseInt(getStatValue(cols[17]), 10) || 0,
                    PTS: parseInt(getStatValue(cols[18]), 10) || 0,
                    '+/-': parseInt(getStatValue(cols[19]), 10) || 0
                  };
                  team.push(playerStats);
                }
              }
            }
          }
        });
      };
  
      processRows(awayTeamRows, teams.away);
      processRows(homeTeamRows, teams.home);
      return {
        awayTeam: teamNames[0].textContent.trim(),
        homeTeam: teamNames[1].textContent.trim(),
        away: teams.away,
        home: teams.home
      };
    })

    await browser.close();

    res.json(gameDetails);
  } else {
    await page.goto(gameUrl, { waitUntil: 'networkidle2' });

    const gameDetails = await page.evaluate(() => {
      const games = []
      const prevGames = document.querySelectorAll('.SeriesHubMatchups_seriesMatchup__CfB7M')
      if (prevGames.length > 0) {
        prevGames.forEach(game => {
          const scoreContainer = game.querySelector('.SeriesHubGameStatus_gameOutcomeContainer__ZEFtD')
          if(scoreContainer) {
            const scores = scoreContainer.querySelectorAll('.SeriesHubGameStatus_score__7VP2T p')
            if (scores.length === 2) {
              const awayScore = scores[0].textContent.trim()
              const homeScore = scores[1].textContent.trim()
              const gameInfo = game.querySelector('.SeriesHubMatchups_seriesRecordStatus__sy2TL')
              const gameInfoSpans = gameInfo.querySelectorAll('span')
              const infoFinal = gameInfoSpans[0].textContent.trim() + ": " + gameInfoSpans[1].textContent.trim()
              const gameLink = game.querySelector('a');
              const gameId = gameLink.getAttribute('href').split('-').pop();
              const logos = game.querySelectorAll('img.TeamLogo_logo__PclAJ')
              games.push({
                gameId,
                awayTeam: {
                  score: awayScore,
                  team: (logos[0].getAttribute('title')).substring(0, 3)
                },
                homeTeam: {
                  score: homeScore,
                  team: (logos[1].getAttribute('title')).substring(0, 3)
                },
                gameStatus: infoFinal
              })
            }
          }
        })

        return games;
      } else {
        return [] // no prev games available
      }
    })

    await browser.close();
    res.json(gameDetails.length > 0 ? gameDetails : [])
  }
});

module.exports = { getScores, getGameDetails };
