module.exports.cmds = {
    ping: require('./ping'),
    rolesMain: require('./rolesMain'),
    rolesSub: require('./rolesSub'),
    echo: require('./echoFn'),
    relay: require('./relay'),
    setInvite: require('./statCmds/setInvite'),
    updateStats: require('./statCmds/updateStats'),
    setPresence: require('./setPresence'),
    listMembers: require('./listMembers'),
    bake: require('./bake'),
    profile: require('./profile'),
    devMode: require('./devMode'),
}

try {
    const local = require('../ignoredFiles/local');
    module.exports.cmds.local = local;
} catch {
    return;
}