const { config } = require('./config');
const { roleList } = require('./roleConfig');

const reactionHandler = async (embed, info) => {
    const reactionArr = ["🍪", "☠️", "📚", "🥞", "🎹", "🍜", "691006062446379080"];

    for(let reaction in reactionArr) {
        if(info.type === 'sub' && reactionArr[reaction] === '691006062446379080') {
            await embed.react("🐱");
        } else {
            await embed.react(reactionArr[reaction]);
        }
    }
}

const roleReactionHandler = async (reaction, user) => {
    if(reaction.partial) {
        try {
            await reaction.fetch();
        } catch (err) {
            console.log('[Error while fetching message]: ', error);
            return;
        }
    }
    if(![config.mainEmbedId, config.subEmbedId].includes(reaction.message.id)) return;

    let currUser = await reaction.message.guild.members.fetch(user);
    let roleType = reaction.message.id;
    let roleEmote = reaction.emoji.name;
    let desiredRole = roleList[roleType][roleEmote];

    return { currUser, desiredRole };
}

exports.reactionHandler = reactionHandler;
exports.roleReactionHandler = roleReactionHandler;