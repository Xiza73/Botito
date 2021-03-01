module.exports = {
    name: "love",
    category: "fun",
    description: "Shipea >w<!",
    usage: "<user1> <user2>",
    run: async (client, msg, args) => {
        msg.delete({ timeout: 1000 })
        .then(msg => console.log(`Deleted message from ${msg.author.username} after 5 seconds`))
        .catch(console.error);
        let s = msg.toString();
        let texto = s.split(" ");
        msg.channel.send(`${texto[1]} y ${texto[2]} se  quieren, se besan :3 <3`); 
    }
}