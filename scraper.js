const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

async function scrapeData(userName) {
        const url = "https://euw.op.gg/summoners/euw/" +  userName ;

        var summonerInfo = {
                summonerName: "",
                mostPlayed: "",
                mostPlayedWin: "",
                rank: "",
                winPercentage: "",
                wr: "",
                lp: "",
                nameForLink: "",
            }

        await axios(url)
            .then(response => {
                const htmlData = response.data;
                const $ = cheerio.load(htmlData);

                summonerInfo.summonerName = $('[class=summoner-name]').text();

                summonerInfo.mostPlayed = $('.css-e9xk5o>div .champion-box .info .name').first().text();
                summonerInfo.mostPlayedWin = $('[class=played]').children("div").first().text();
                summonerInfo.mostPlayedWin = summonerInfo.mostPlayedWin.substring(summonerInfo.mostPlayedWin.length - 3);

                summonerInfo.rank = $('[class=tier]').first().text();

                summonerInfo.wr = $('[class=win-lose]').first().text();
                summonerInfo.lp = $('[class=lp]').first().text();

                summonerInfo.nameForLink = summonerInfo.summonerName.replace(' ', '%20');
                summonerInfo.nameForLink = summonerInfo.nameForLink.replace(' ', '%20');    
            })
            .catch(console.error);

    return summonerInfo;
}

module.exports.scrapeData = scrapeData;