const { execute } = require("./queue");

module.exports = {
    name: 'skip',
    description: 'skip',
    async execute(client, message, args){
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to use this command!")
        let queue = await client.distube.getQueue(message);

        if(queue) {
            client.distube.skip(message)

            await message.channel.send('Skipped')
        } else if (!queue) {
            return
        };
    }
};
