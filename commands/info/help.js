const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    category: "info",
    description: "Muestra todos los comandos o un comando específico",
    usage: "[comando]",
    run: async (client, message, args) => {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
    }
}

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor("RANDOM")

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(" ");
    }

    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}:** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n\n" + category);

    return message.channel.send(
      embed
      .setTitle("Comandos")
      .setDescription(info)
    );
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    
    let info = `No hay información del comando **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `**Comando**: ${cmd.name}`;
    if (cmd.description) info += `\n**Descripción**: ${cmd.description}`;
    if (cmd.usage) {
      info += `\n**Uso**: ${cmd.usage}`;
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}