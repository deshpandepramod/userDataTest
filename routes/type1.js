var even = [];
var odd = [];
var result = [];
var lengthResult;
var oddEvenSort = function oddEvenSort(a){
    for (var i in a) {
        if (a[i] % 2 == 0) {
            even.push(a[i]);
        } else {
            odd.push(a[i]);
        }
    }
    even.sort(function(a, b) {
        return a - b;
    });
    odd.sort();
    odd.reverse();
    
    if (odd.length > even.length) {
        lengthResult = odd.length;
    } else {
        lengthResult = even.length;
    }
    for (var i = 0; i < lengthResult; i++) {
        if (odd[i])
            result.push(odd[i]);
        if (even[i])
            result.push(even[i]);
    }
    console.log(result);
    return result;
}

//console.log(oddEvenSort([31, 32, 43, 23, 4, 8, 15]));
exports.oddEvenSort = oddEvenSort;