module.exports.cmds = {
    ping: require('./pingFn'),
    rolesMain: require('./rolesMainFn'),
    rolesSub: require('./rolesSubFn'),
    echo: require('./echoFn'),
    relay: require('./relayFn')
}

try {
    const local = require('./localFn');
    module.exports.cmds.local = local;
} catch {
    return;
}