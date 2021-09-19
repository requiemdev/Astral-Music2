module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel',
    async execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to use this command!")

        let queue = await client.distube.getQueue(message);

        if(queue) {
            client.distube.stop(message)

            await message.channel.send('Stopped')
        } else if (!queue) {
            return
        };
    }
}