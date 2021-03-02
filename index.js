//Settings
const express = require('express');
const app = express();
const Discord = require('discord.js');
const db = require('./database/db.js');


//const client = new Discord.Client();
//VAR
var usuarios = null;
var roles = {
  1: "Monje",
  2: "Hechicero",
  3: "Espadachín"
}
const root = 'https://res.cloudinary.com/dnbgxu47a/image/upload/v1612837856';
const estrellitas = [
  "0.png", "1.gif", "2.gif", "3.gif", "4.png", "1.gif", "3.gif" 
];


app.get('/', function (req, res) {
  let hoy = new Date();
  res.send('Hello World');

  //Buenos días +5hours 0dom
  if(hoy.getHours() === 13 && (hoy.getMinutes() >= 0 && hoy.getMinutes() <= 4)){
    let img = `${root}/estrellitas/${estrellitas[hoy.getDay()]}`;
    const myEmbed = {
      color: 0xECFF07,
      title: 'Buenos días estrellitas!',
      description: `La tierra les dice holaaaaa`,
      thumbnail: {
        url: `${root}/willy.jpg`,
      },
      image: {
        url: img,
      },
      timestamp: hoy,
    };

    client.channels.cache.get('752251099355938856').send({ embed: myEmbed }); 
    //Jueves
    if(hoy.getDay() == 4){
      const jEmbed = {
        color: 0xF14D00,
        title: 'Feliz Jueves!',
        image: {
          url: `${root}/asuka.gif`,
        },
        timestamp: new Date(),
      };

      client.channels.cache.get('752251099355938856').send({ embed: jEmbed });
    }
    //Viernes
    if(hoy.getDay() == 5){
      const exampleEmbed = {
        color: 0x0099ff,
        title: 'PREPARATE LA PUTA QUE TE RE PARIÓ',
        description: `**Porque Los viernes de la jungla serán a todo ojete**
        todo ojete todo ojete; ojete, ojete, ojete
        **Para vivir una noche con las mejores putas de la zona**
        No te la podes perder hijo de re mil, porque si no estás allí; andate a la concha de la lora
        **Te esperamos para que vivas una noche de la puta madre**`,
        image: {
          url: `${root}/viernes.gif`,
        },
        timestamp: new Date(),
      };

      client.channels.cache.get('752251099355938856').send({ embed: exampleEmbed });
    }
  }
})

/*app.get('/home/Botito/multimedia', function (req, res) {
  res.send('mult');
});*/

let port = process.env.PORT || 3000;
app.listen(port)

//BOT
/*const Discord = require('discord.js');
const client = new Discord.Client();*/
const { Client, Collection, MessageAttachment } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

//require('dotenv').config()
config({
    path: "/.env"
});
let prefix = process.env.prefix;

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

try{
    client.on('ready', () => {
      console.log(`${client.user.tag} está redi`);
      presence();
    });
}catch(error){
  console.error(error);
}

client.on('message', async message => {
    //Control de comandos
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    //Estructura del comando
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
    
    if(cmd !== ""){
      action(cmd, message); //135
    }

});

client.login(process.env.token);

//FUNCIONES

function presence(){
    client.user.setPresence({
        status: "online",
        activity: {
            name: "b!help",
            type: "PLAYING"
        }
    })
}

//MASTER
function action(comando, msg){

  //COMANDOS
  var comandos = {

    //Prueba DB
    "git" : function() {
      msg.channel.send('git is worked');
    },
    "insert": function(){
      let texto = msg.toString().split(" ");
      let name = texto[2];
      let description = texto[3];
      db.set(texto[1], {
        name,
        description
      })
        .then(() => {
          console.log("insertado");
          msg.channel.send(`insertado`);
        })
        .catch(err => {
          console.log(err);
        });
    },
    "delete": function(){
      db.delete("datos")
        .then(() => {
          console.log("eliminado")
        })
        .catch(err => {
          console.log(err);
        });
    },
    "list": function(){
      db.list()
        .then(keys => {
          console.log();
          msg.channel.send(`${keys}`);
        });
    },
    "myid": function(){
      msg.channel.send(msg.author.id);
    },
    "get": async function(){
      let texto = msg.toString().split(" ");
      let key = await db.get(texto[1]);
      console.log(key);
      console.log(texto[1])
      if(key === null){
        msg.channel.send("No existe ctmr");
      }else{
        key.then(key => {
          msg.channel.send(`Nombre: ${key.name}\nDescripción: ${key.description}`);
        })
      }
    },
    //Fin Prueba
    "suma" : function(){
      let error = false;
      let suma = 0;
      let s = msg.toString();
      let texto = s.split(" ");
      for(let i = 1; i < texto.length; i++){
        if(Number.isNaN(parseFloat(texto[i]))){
          error = true;
          break;
        }else{
          console.log("wtf xd")
          suma += parseFloat(texto[i]);
        }
        
      }
      if(error){
        msg.channel.send(`Error, parámetro no aceptado`);
      }else{
        msg.channel.send(`Suma: ${suma}`);
      }
      
    },

    "andrea" : function(){
        let opc;
        let texto = msg.toString().split(" ");
        if(texto[1] === undefined){
          opc = random(0, 4);
        }else{
          opc = parseInt(texto[1]) - 1;
          if(opc < 0) opc = 0;
          if(opc > 4) opc = 4;
        }
        let titles = [
          "A de Agárrame que me caigo!",
          "A de AHHHH! bájenle el nivel de wapura *~*",
          "Título? el contenido multimedia habla por si solo",
          "Do you wanna cortar fresas?",
          "A de Aguacate"
          //"A",
          //"A de Adelaida, Barbijo, Emperador, Juanito",
        ]
        let urls = [
          "https://www.youtube.com/watch?v=E8WZI7t9nu8",
          "https://www.youtube.com/watch?v=2mtsIInDebM",
          "https://www.youtube.com/watch?v=OzZpJtsBLMs",
          "https://www.youtube.com/watch?v=4KI0MpuKLOo",
          "https://www.youtube.com/watch?v=2di5sU3oigU"
        ]
        let photos = [
          "0.jpg",
          "1.png",
          "2.png",
          "3.gif",
          "4.png"
        ]
        const exampleEmbed = {
          color: "RANDOM",
          title: titles[opc],
          url: urls[opc],
          //description: 'Some description here',
          /*thumbnail: {
            url: `${root}/Andrea/osito.png`,
          },*/
          image: {
            url: `${root}/Andrea/${photos[opc]}`,
          },
          timestamp: new Date()
        };

        msg.channel.send({ embed: exampleEmbed });
    },

    "attack" : function(){
      let s = msg.toString();
      let texto = s.split(" ");
      msg.channel.send(`${texto[1]} muere rechuchatumare >:v`); 
    },
    "morning": function(){
      const exampleEmbed = {
          color: 0xECFF07,
          title: 'Buenos días estrellitas!',
          description: `La tierra les dice holaaaaa`,
          thumbnail: {
            url: `${root}/willy.jpg`,
          },
          image: {
            url: `${root}/estrellitas/${estrellitas[random(0, 4)]}`,
          },
          timestamp: new Date(),
        };

        msg.channel.send({ embed: exampleEmbed });
    },
    "jueves": function(){
      const exampleEmbed = {
          color: 0xF14D00,
          title: 'Feliz Jueves!',
          image: {
            url: `${root}/asuka.gif`,
          },
          timestamp: new Date(),
        };

        msg.channel.send({ embed: exampleEmbed });
    },
    "viernes": function(){
      const exampleEmbed = {
          color: 0x0099ff,
          title: 'PREPARATE LA PUTA QUE TE RE PARIÓ',
          description: `**Porque Los viernes de la jungla serán a todo ojete**
          todo ojete todo ojete; ojete, ojete, ojete
          **Para vivir una noche con las mejores putas de la zona**
          No te la podes perder hijo de re mil, porque si no estás allí; andate a la concha de la lora
          **Te esperamos para que vivas una noche de la puta madre**`,
          image: {
            url: `${root}/viernes.gif`,
          },
          timestamp: new Date(),
        };

        msg.channel.send({ embed: exampleEmbed });
    },
    "hola" : function(){
      msg.channel.send(`Hola ${msg.member.user} ^u^`);
    },

    "mention" : function(){
      console.log(msg.mentions.users)
    },

    "prom" : function(){
      let s = msg.toString();
      let texto = s.split(" ");
      if(texto[3] != undefined){
        let p = 0.2*parseFloat(texto[1]) + 0.6*parseFloat(texto[2]) + 0.2*parseFloat(texto[3]);
        msg.channel.send(`Tu promedio es ${p} mi king`);
      }
    },

    //LOCAL STORAGE
    "register" : function(){
      let s = msg.toString();
      let texto = s.split(" ");
      
      if(usuarios === null || usuarios[texto[1]] != undefined){
        let nombre, rol;
        msg.channel.send(`Registro de usuario ${msg.member.user}:`);
        msg.channel.send("Ingrese un nombre de usuario:");
        
        msg.channel.awaitMessages(m => m.author.id == msg.author.id, {max: 1, time: 30000}).
        then(collected => {
          /*if (collected.first().content.toLowerCase() == 'yes') {
                  msg.reply('Shutting down...');
          }else
                  msg.reply('Operation canceled.');
          */   
          if(collected.first().content.toLowerCase() === "cancel"){
            return msg.channel.send("Canceled!");
          }
          nombre = collected.first().content; 
          console.log(nombre)  

          msg.channel.send(`Seleccione un rol:
          1. Monje
          2. Hechicero
          3. Espadachín`);
          msg.channel.awaitMessages(m => m.author.id == msg.author.id, {max: 1, time: 30000}).
          then(collected => {
            /*if (collected.first().content.toLowerCase() == 'yes') {
                    msg.reply('Shutting down...');
            }else
                    msg.reply('Operation canceled.');
            */   
            if(collected.first().content.toLowerCase() === "cancel"){
              return msg.channel.send("Canceled!");
            }
            rol = roles[collected.first().content];
            console.log(rol)
            let sen = {
              "nombre": nombre,
              "rol": rol
            }
            usuarios[msg.member.user] = sen;
            guardarDB();
          }).
          catch(() => {
            msg.channel.send("Tiempo límite de respuesta superado");
          });
        }).
        catch(() => {
          msg.channel.send("Tiempo límite de respuesta superado");
        });
      }else{
        msg.reply("Ya está registrado");
      }
    },

    //EMBEDS
    "embed1" : function(){
        const exampleEmbed = {
          color: 0x0099ff,
          title: 'Some title',
          url: 'https://discord.js.org',
          author: {
            name: 'Some name',
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
            url: 'https://discord.js.org',
          },
          description: 'Some description here',
          thumbnail: {
            url: 'https://i.imgur.com/wSTFkRM.png',
          },
          fields: [
            {
              name: 'Regular field title',
              value: 'Some value here',
            },
            {
              name: '\u200b',
              value: '\u200b',
              inline: false,
            },
            {
              name: 'Inline field title',
              value: 'Some value here',
              inline: true,
            },
            {
              name: 'Inline field title',
              value: 'Some value here',
              inline: true,
            },
            {
              name: 'Inline field title',
              value: 'Some value here',
              inline: true,
            },
          ],
          image: {
            url: 'https://i.imgur.com/wSTFkRM.png',
          },
          timestamp: new Date(),
          footer: {
            text: 'Some footer text here',
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
          },
        };

        msg.channel.send({ embed: exampleEmbed });
    },

    "info" : function(){
        const exampleEmbed = {
          color: 0xFF2D00,
          title: 'Información del Servidor',
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL(),
          },
          thumbnail: {
            url: 'https://miro.medium.com/max/768/1*YyDB9Hf4yD44RseexnTJdA.png',
          },
          fields: [
            {
              name: 'Nombre:',
              value: msg.guild.name,
            },
            {
              name: 'Descripción:',
              value: 'Sáquenme de Latinoamérica, esto es no es una descripción',
            },
            {
              name: 'Miembros:',
              value: `${msg.guild.memberCount} miembros recontra activos`,
            },
            {
              name: 'Admin:',
              value: 'Mágic0',
              inline: true,
            },
            {
              name: 'Esclavo:',
              value: 'Ludwig',
              inline: true,
            },
          ],
          image: {
            url: 'https://i.kym-cdn.com/photos/images/facebook/001/456/420/c1b.png',
          }
        };

        msg.channel.send({ embed: exampleEmbed });
    },

    "examplembed" : function(){
        const embed = new Discord.MessageEmbed()
            .setTitle("Título")
            .setColor(0x5E9DE4) //color barra izquierda
            .setDescription("descipción")
            .addField("Field en una línea", "Contenido del field")
            .addField("Field en media línea", "content1", true).addField("Field en media línea", "content2", true)
            .setAuthor(msg.member.displayName, msg.author.avatarURL()) //apodo
            //.setAuthor(client.user.username, client.user.avatarURL()) //bot
            .setThumbnail("https://media.giphy.com/media/euMGM3uD3NHva/giphy.gif")
            .setImage("https://media.giphy.com/media/euMGM3uD3NHva/giphy.gif")
            .setFooter(`Solicitado por: ${msg.member.displayName}`, msg.author.avatarURL())
            .setTimestamp()
            
        msg.channel.send(embed);
    }

    /*
    GUÍA COMANDOS
        msg.reply('message') -> @user, message
        message.channel.send("message") -> message
    */
  };

  if (typeof comandos[comando] !== 'function') {
    return 'default';
  }


  return comandos[comando]();
}


function random(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
/*
  //Prueba 5min
  if(hoy.getHours() === 19 && (hoy.getMinutes() >= 50 && hoy.getMinutes() <= 54)){
      client.channels.cache.get('690661067231068244').send(`Prueba 5min ${hoy.getHours()} ${hoy.getMinutes()}`);
  }
  */
  /*
  //Prueba rol chat gmi2 gamer
  const myGuild = client.guilds.cache.get('751588427098619924');
  const myRole = myGuild.roles.cache.find(role => role.name === 'Travelers');
  if(hoy.getHours() === 19 && hoy.getMinutes() === 17){
    client.channels.cache.get('752251099355938856').send(`Go lobito ${myRole}`); 
  }
  */
  /* 
  //Prueba chat general
  client.channels.cache.get('690661067231068244').send(`${hoy.getHours()} ${hoy.getMinutes()}`);
  */
  /*
  //user by message
  let user = client.guild.members.cache.get('569190606224621568')
  */
  /*
  //Prueba holi @Vicubot
  let user = client.users.cache.find(user => user.id === '569190606224621568')
  if(hoy.getHours() === 18 && hoy.getMinutes() === 59)
  client.channels.cache.get('752251099355938856').send(`holi ${user}`);
  */