module.exports = {
    validateIP(ip) {
        if (typeof (ip) !== 'string')
            return false;
        if (!ip.match(/(\d{1,3}\.?){4,4}/)) {
            return false;
        }
        return ip.split('.').filter(octect => octect >= 0 && octect <= 255).length === 4;
    },
    validateSGName (sgName) {
        return sgName.match(/[\w\d_]{1,255}/) && !sgName.match(/^sg\-.*/i);
    }
}