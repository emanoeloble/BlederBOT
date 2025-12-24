const Discord = require("discord.js");

exports.run = async (client, interaction) => {
return await interaction.reply({content: 'O comando está funcionando!'}).catch(err => {
return console.log(err)
})
}
