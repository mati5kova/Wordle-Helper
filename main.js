import { wordleList, extendedList } from './modules/dictionary.js';
console.log(wordleList, extendedList);

var wordlePossibleWords = wordleList.slice();
var extendedPossibleWords = extendedList.slice();

var dictionaryOfResultWords = wordlePossibleWords;

const renewLists = () => {
    wordlePossibleWords = wordleList.slice();
    extendedPossibleWords = extendedList.slice();
};

//popup
const togglePopup = () => {
    document.getElementById('popup-1').classList.toggle('active');
};
window.onload = togglePopup();
document.getElementById('close-btn').addEventListener('click', togglePopup);

/* ----dictionary---- */
document.getElementById('dictionaryBtn').addEventListener('click', () => {
    let btn = document.getElementById('dictionaryBtn');

    if (btn.innerText === 'WORDLE DICTIONARY') {
        btn.innerText = 'EXTENDED DICTIONARY';
        dictionaryOfResultWords = extendedPossibleWords;
    } else if (btn.innerText === 'EXTENDED DICTIONARY') {
        btn.innerText = 'WORDLE DICTIONARY';
        dictionaryOfResultWords = wordlePossibleWords;
    } // prostor za še slovenski slovar ??
});

/* ----main---- */
document.getElementById('submitBtn').addEventListener('click', () => {
    renewLists(); //da so liste polne, ne pa že filtrirane od prej
    let isEmpty = true;
    const resultsHtml = document.getElementById('results').innerText;

    const formData = Array.from(document.querySelectorAll('#input-form input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {}); //object
    //formData.firstLetter      secondLetter    thirdLetter     fourthLetter    fifthLetter     includesLetter      doesntInclude

    //vrne vse besede ki se začnejo na...
    if (formData.firstLetter !== '') {
        dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
            return word.charAt(0) === formData.firstLetter;
            //return word.indexOf(formData.firstLetter) === 0; //ne deluje-> exepction: dve isti črki
        });
        isEmpty = false;
    }
    //vrne vse besede ki imajo drugo črko...
    if (formData.secondLetter !== '') {
        dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
            return word.charAt(1) === formData.secondLetter;
        });
        isEmpty = false;
    }
    //vrne vse besede ki imajo tretjo črko...
    if (formData.thirdLetter !== '') {
        dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
            return word.charAt(2) === formData.thirdLetter;
        });
        isEmpty = false;
    }
    //vrne vse besede ki imajo četrto črko...
    if (formData.fourthLetter !== '') {
        dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
            return word.charAt(3) === formData.fourthLetter;
        });
        isEmpty = false;
    }
    //vrne vse besede ki imajo peto črko...
    if (formData.fifthLetter !== '') {
        dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
            return word.charAt(4) === formData.fifthLetter;
        });
        isEmpty = false;
    }
    //vrne vse besede ki vsebujejo 'including letters'
    if (formData.includesLetter !== '') {
        //spremenimo input str in array
        let letters = Array.from(formData.includesLetter);
        letters.forEach((char) => {
            dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                return word.includes(char);
            });
        });
        isEmpty = false;
    }
    //vrne vse besede ki ne vsebujejo določenih črk
    if (formData.doesntInclude !== '') {
        let letters = Array.from(formData.doesntInclude);
        letters.forEach((char) => {
            dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                return !word.includes(char);
            });
        });
        isEmpty = false;
    }

    //console.log(dictionaryOfResultWords);

    //isEmpty === true ? console.log('empty') : console.log('not empty');
    const text = dictionaryOfResultWords.join(', ');
    isEmpty === true ? (resultsHtml = 'Provide some information about the word first') : (resultsHtml = text); //.innerText

    //reset slovarja z vsemi možnimi besedami
    if (document.getElementById('dictionaryBtn').innerText === 'WORDLE DICTIONARY') {
        dictionaryOfResultWords = wordleList.slice();
    } else {
        dictionaryOfResultWords = extendedList.slice();
    }
});
