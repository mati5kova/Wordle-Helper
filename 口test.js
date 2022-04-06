let arr = [
    'aback',
    'abase',
    'abate',
    'abbey',
    'abbot',
    'abhor',
    'abide',
    'abled',
    'abode',
    'abort',
    'about',
    'above',
    'abuse',
    'abyss',
    'acorn',
    'acrid',
    'actor',
    'acute',
    'adage',
    'adapt',
    'adept',
    'admin',
    'admit',
    'adobe',
    'adopt',
    'adore',
    'adorn',
    'adult',
    'affix',
    'afire',
    'afoot',
    'afoul',
    'after',
    'again',
    'agape',
    'agate',
    'agent',
    'agile',
    'aging',
    'aglow',
    'agony',
    'agora',
    'agree',
    'ahead',
    'aider',
    'aisle',
    'alarm',
    'album',
    'alert',
    'algae',
    'alibi',
    'alien',
    'align',
    'alike',
    'alive',
    'allay',
    'alley',
    'allot',
    'allow',
    'alloy',
    'aloft',
    'alone',
    'along',
    'aloof',
    'aloud',
    'alpha',
    'altar',
    'alter',
    'amass',
    'amaze',
    'amber',
    'amble',
    'amend',
    'amiss',
    'amity',
];

arr = arr.filter((word) => {
    return word.indexOf('a') === 0;
});
arr = arr.filter((word) => {
    return word.indexOf('b') === 1;
});
arr = arr.filter((word) => {
    return word.indexOf('a') === 2;
});
console.log(arr);

/*--*/
let ar = ['one', 'two', 'three', 'four'];
const str = Array.from('wu');
ar.forEach((word) => {
    str.forEach((char) => {
        if (word.includes(char)) {
            return ar.splice(ar.indexOf(word) - 1, 1);
        }
    });
});
console.log(ar);
