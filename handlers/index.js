module.exports.handlers = {
    reactionHandler: require('./reactionHelpers/reactionHandler'),
    roleReactionHandler: require('./reactionHelpers/roleReactionHandler'),
    roleReactionToggle: require('./roleReactionToggle'),
    starHandler: require('./starHandler'),
    memberCountHandler: require('./statsHandlers/memberCountHandler'),
    serverAgeHandler: require('./statsHandlers/serverAgeHandler')
}