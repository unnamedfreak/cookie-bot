const roleReactionHandler = require('./reactionHelpers/roleReactionHandler');
const { stores } = require('../stores/');
const roleDefs = stores.roleDefs;

module.exports = async (reaction, user, action) => {
    const roleEmotes = ['🍪', '☠️', '📚', '🥞', '🎹', '🍜', 'idleblob', '🐱'];
    
    if(!roleEmotes.includes(reaction.emoji.name)) return;
    let { currUser, desiredRole } = (await roleReactionHandler(reaction, user));
    let resp;

    if(desiredRole) {
        switch(action) {
            case "addRole":
                currUser.roles.add(desiredRole);
                resp = await reaction.message.channel.send(`<@${user.id}> Role Added: \`${roleDefs[desiredRole]}\``);
                setTimeout(() => { resp.delete() }, 5000);
                break;
            case "removeRole":
                currUser.roles.remove(desiredRole);
                resp = await reaction.message.channel.send(`<@${user.id}> Role Removed: \`${roleDefs[desiredRole]}\``);
                setTimeout(() => { resp.delete() }, 5000);
                break;
            default:
                console.log("[roleReactionToggle] Error: No action specified.")
                return;
        }
    }
}