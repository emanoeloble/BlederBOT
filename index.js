const express = require('express');
const app = express();
app.get("/", (request, response) => {
const ping = new Date();
ping.setHours(ping.getHours() - 3);
console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client({intents: [34707], partials: ['MESSAGE', 'CHANNEL', 'REACTION']}); //Criação de um novo Client
//slash commands
client.on('interactionCreate', async (interaction)=> {
if(interaction.partial) await interaction.fetch();
  
if(!interaction.isCommand()) return;
  
if(interaction.user.bot || !interaction.guild) return;

    try {    
  const commandFile = require(`./comandos/${interaction.commandName}.js`)
  commandFile.run(client, interaction);
    } catch (err) {   
      
  return console.error('Achamos um erro:' + err);

  }
})

client.on("ready", () => {
client.user.setPresence({
  activities: [{ name: "Discord.js V14", type: 5 }],
  status: "online",
});

console.log("Estou Online!")
})
client.login(process.env.TOKEN); //Ligando o Bot
