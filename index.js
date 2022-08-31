const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const { scrapeData, summonerInfo } = require('./scraper');


const client = new Client ({
    intents: 
    [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ],    
});


client.once('ready', () => {
    console.log("Ready!");
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    let summonerInfo;
    const { commandName } = interaction;

    if(commandName === 'summoner') {
        const user = interaction.options.getString('name');

        summonerInfo = await scrapeData(user);

        const summonerEmbed = new EmbedBuilder()
            .setTitle('Summoner lookup')
            .addFields(
                { name: 'Searched summoner name', value: user },
                { name: '\u200B', value: '\u200B' },
                { name: 'Summoner found', value: '[' + summonerInfo.summonerName + '](https://euw.op.gg/summoners/euw/' + summonerInfo.nameForLink + ')' },
                { name: 'Rank', value: summonerInfo.rank.toUpperCase() + " - " + summonerInfo.lp },
                { name: 'Games played', value: summonerInfo.wr },
                { name: 'Most played', value: summonerInfo.mostPlayed  + " - " + summonerInfo.mostPlayedWin + " Win" },
            )
            .setImage('https://opgg-static.akamaized.net/images/lol/champion/' + summonerInfo.mostPlayed +'.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_auto&v=1661751970709')

        await interaction.reply({ embeds: [summonerEmbed]});
    }
});

client.login(token);