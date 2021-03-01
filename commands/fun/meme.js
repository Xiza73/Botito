const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Envía un momito",
    usage: "[category]",
    run: async (client, message, args) => {
        const subReddits = [
          "meme", 
          "me_irl",
          "memes", 
          "wholesomememes"
        ];
        const animeReddits = [
          "wholesomeanimemes"
        ]

        let random = "";

        if(args[0] === "anime"){
          random = animeReddits[Math.floor(Math.random() * animeReddits.length)];
        }else if(args[0] === "tinder"){
          random = "Tinder";
        }else{
          random = subReddits[Math.floor(Math.random() * subReddits.length)];
        }
        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setImage(img)
          .setTitle(`From /r/${random}`)
          .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
    }
}