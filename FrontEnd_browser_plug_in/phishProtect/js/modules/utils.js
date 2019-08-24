//判断是否是
function isPrivateIp(ip) {
    return (
        /^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/.test(ip) ||
        /^172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/.test(ip) ||
        /^192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/.test(ip) ||
        /^10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/.test(ip) ||
        /^169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/.test(ip) ||
        /^localhost$/.test(ip) ||
        /^$/.test(ip) ||
        /^about:blank$/.test(ip)
    )
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var extractHostname = function(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
};

var isUnicode = function(str) {
    for (var i = 0, n = str.length; i < n; i++) {
        if (str.charCodeAt( i ) > 255) { return true; }
    }
    return false;
};

var isPageBlockedUrl = function(url) {
    var re = [/^chrome-extension:.*page_blocked.html#?$/,
              /^moz-extension:.*page_blocked.html#?$/]
    for (var i = 0; i < re.length; i++) {
        if (re[i].test(url)) {
            return true;
        }
    }
    return false;
};

var isDomainIDN = function(domain) {
    return (domain.startsWith('xn--') || domain.startsWith('www.xn--') || isUnicode(domain));
};

var isSystemUrl = function(url) {
    var re = [/^chrome-extension:/, /^chrome:/]
    for (var i = 0; i < re.length; i++) {
        if (re[i].test(url)) {
            return true;
        }
    }
    return false;
};