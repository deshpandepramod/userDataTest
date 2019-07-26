function absent(arr) {
  var mia = [], min = Math.min.apply('', arr), max = Math.max.apply('', arr);
  while (min < max) {
    if (arr.indexOf(++min) == -1) mia.push(min);
  }
  return mia;
}
exports.absent = absent;