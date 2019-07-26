var reverse = function (str) {
    var r = str.length - 1;
    var l = 0;
    while ((l < r)) {
        {
            if (!/[a-zA-Z]/.test(str[l][0]))
                l++;
            else if (!/[a-zA-Z]/.test(str[r][0]))
                r--;
            else {
                var tmp = str[l];
                str[l] = str[r];
                str[r] = tmp;
                l++;
                r--;
            }
        }
    }
};
exports.reverse = reverse;