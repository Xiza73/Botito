const WhatsAppWeb = require('baileys')
const cli = new WhatsAppWeb()

module.exports = {
    name: "connectwsp",
    //category: "utility",
    description: "connect your wsp account to send messages",
    usage: "[<'me'>]",
    run: async (client, msg, args) => {
      cli.connect()
      .then(([user, chats, contacts, unread]) => {
        console.log({mensaje: 'Autenticación exitosa'});
        msg.channel.send('Autenticación exitosa')
      })
      .catch(err => console.log(err))
    }
}