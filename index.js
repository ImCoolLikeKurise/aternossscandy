const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 1. Web Server for Render
app.get('/', (req, res) => res.send('Bot is Online!'));
app.listen(3000, () => console.log('Web server ready.'));

// 2. Bot Configuration
const botArgs = {
    host: 'YOUR_SERVER_IP.aternos.me',
    port: 25565,
    username: 'ScoutBot',
    version: '1.20.1' // Change to match your server
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log("Bot spawned. Starting Anti-AFK.");
        // Makes the bot jump every 30 seconds to stay active
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('end', () => {
        console.log("Disconnected. Reconnecting...");
        setTimeout(createBot, 5000);
    });
}

createBot();
