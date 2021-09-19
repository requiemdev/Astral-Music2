const Discord = require('discord.js');
const { prefix, token, emoji } = require('./config.json');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const DisTube = require('distube');
const queue = require('./commands/queue');


client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `${client.emotes.play} | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `${client.emotes.success} | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
    ))
    /*.on("initQueue", queue => {
        queue.autoplay = false;
    })
    */
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.aliases = new Discord.Collection()
client.emotes = emoji;

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})


client.login(token);