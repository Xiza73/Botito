const WhatsAppWeb = require('baileys')
const cli = new WhatsAppWeb()

module.exports = {
  name: "whatsapp",
  category: "utility",
  description: "send a wsp message",
  usage: "<number> <message>",
  run: async (client, msg, args) => {
    if(args[0] && args[1]){
      msg.channel.send('Espere el código QR para la autenticación')

      const author = msg.author.id;

      const colector = msg.channel.createMessageCollector(message => author === message.author.id && message.content.toLowerCase() === "ok")

      try{
        cli.connect()
        .then(([user, chats, contacts, unread]) => {
          msg.channel.send('Autenticación exitosa, confirme el envío con un "ok"')
        })
        .catch(err => {
          console.log(err);
          return;
        })
        const options = {
          quoted: null,
          timestap: new Date()
        }
      }catch(error){
        msg.channel.send(`Error: ${error}`)
      }

      colector.on('collect', message  => { 
        const options = {
          quoted: null,
          timestamp: new Date()
        }
        cli.sendTextMessage(`${args[0].toString()}@s.whatsapp.net`, args[1].toString(), options)
        .then(() => {
          msg.channel.send('Mensaje enviado!');
          return;
        })
        .catch(err => msg.channel.send(`Error al enviar mensaje: ${err}`))
      })
    }else{
      msg.channel.send(`Error: Bad Syntax, please set a phone number and message`);
    }
  }
}