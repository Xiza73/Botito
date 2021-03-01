module.exports = {
    name: "syntax",
    category: "info",
    description: "Sintaxis de los comandos",
    run: async (client, message, args) => {
      let s = ""
      s += `\`<>\` : obligatorio
      \`[]\` : opcional
      \`(+)\` : 1 a más
      \`(*)\` : 0 a más`
      s += "\n"
      const exampleEmbed = {
        color: 0x0099ff,
        title: `Sintaxis`,
        description: s
      }
      message.channel.send({ embed: exampleEmbed });
    }
}