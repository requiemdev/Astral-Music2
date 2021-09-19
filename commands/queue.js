module.exports = {
    name: 'queue',
    description: 'view the queue',
    async execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to use this command!")
        let queue = client.distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }
}