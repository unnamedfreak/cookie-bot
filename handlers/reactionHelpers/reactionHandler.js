module.exports = async (embed, info) => {
    const reactionArr = ["🍪", "☠️", "📚", "🥞", "🎹", "🍜", "691006062446379080"];

    for(let reaction in reactionArr) {
        if(info.type === 'sub' && reactionArr[reaction] === '691006062446379080') {
            await embed.react("🐱");
        } else {
            await embed.react(reactionArr[reaction]);
        }
    }
}