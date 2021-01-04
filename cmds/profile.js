const { createCanvas, loadImage } = require('canvas');

const LEVEL_LIMIT = 20;

const generateCanvas = async (data) => {
    const WIDTH = 1024;
    const HEIGHT = 500;

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    const { avatar, tag, uLevel, uXp, bgImg } = data;

    // Background Image
    const img = await loadImage(bgImg);
    ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);

    // Gradient
    const grd = ctx.createLinearGradient(WIDTH/2, HEIGHT*0.52, WIDTH/2, HEIGHT);
    grd.addColorStop(0, 'rgba(0,0,0,0)');
    grd.addColorStop(1, 'black');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // User Info
    ctx.fillStyle = '#F3F3F3';
    ctx.font = 'regular 44pt Roboto';
    ctx.fillText(tag, 246, 363);
    ctx.font = 'regular 30pt Roboto';
    ctx.fillText(`Level ${uLevel}`, 246, 420);

    ctx.fillStyle = 'rgba(63,154,62,0.8)';
    ctx.fillRect(246, 448, 600, 10);
    ctx.fillStyle = '#1ED41B';
    let xpW = Math.round(600 * (uXp / ((uLevel + 1) * LEVEL_LIMIT)));
    ctx.fillRect(246, 448, xpW, 10);

    ctx.beginPath();
    ctx.arc(138, 389, 74, 0, 2*Math.PI);
    ctx.clip();

    const uAvatar = await loadImage(avatar);
    ctx.drawImage(uAvatar, 64, 315, 148, 148);

    return new Promise((resolve, reject) => {
        resolve(canvas.toBuffer('image/png'));
    })
    
}

module.exports.run = async (client, message, args, db) => {
    let msg = await message.channel.send('Generating Profile Card...');
    
    const uid = message.author.id;
    const user = await db.collection('ranks').doc(uid).get();
    const data = {
        avatar: message.author.displayAvatarURL({format: "png", size: 256}),
        tag: message.author.tag,
        uLevel: user.data().level,
        uXp: user.data().xp,
        bgImg: 'https://cdn.discordapp.com/attachments/691005081159598230/795708595424985092/unknown.png'
    }

    try {
        const buffer = await generateCanvas(data);
        msg.delete();

        message.channel.send(`<@${uid}>`, {
            files: [{
                attachment: buffer,
                name: `${message.author.id}.png`
            }]
        })
    } catch (err) {
        message.channel.send('An Error Occurred!');
        console.log(err);
    }
}

module.exports.list = {
    name: 'profile',
    desc: "Displays a User's Profile for the Server."
}