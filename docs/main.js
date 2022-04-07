var wordlePossibleWords = wordleList.slice();
var extendedPossibleWords = extendedList.slice();
var dictionaryOfResultWords = wordlePossibleWords;

//popup
const togglePopup = () => {
    document.getElementById('popup-1').classList.toggle('active');
};
window.onload = togglePopup();
document.getElementById('close-btn').addEventListener('click', togglePopup); //za križec v popupu
document.getElementById('info-icon').addEventListener('click', togglePopup); //za info button

//dictionary
document.getElementById('dictionaryBtn').addEventListener('click', () => {
    let btn = document.getElementById('dictionaryBtn');

    if (btn.innerText === 'WORDLE DICTIONARY') {
        btn.innerText = 'EXTENDED DICTIONARY';
        dictionaryOfResultWords = extendedPossibleWords;
    } else if (btn.innerText === 'EXTENDED DICTIONARY') {
        btn.innerText = 'WORDLE DICTIONARY';
        dictionaryOfResultWords = wordlePossibleWords;
    }
});

//obnovitev list besed
const renewLists = () => {
    wordlePossibleWords = wordleList.slice();
    extendedPossibleWords = extendedList.slice();
};

//submit btn
document.getElementById('submitBtn').addEventListener('click', () => {
    renewLists(); //da so liste polne, ne pa že filtrirane od prej
    let isEmpty = true; //za preverjanje user inputa

    const resultsHtml = document.getElementById('results'); //za result worde
    const formData = Array.from(document.querySelectorAll('#input-form input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {}); //object

    //vrne vse besede ki se začnejo na...
    if (formData.firstLetter !== '') {
        dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
            return word.charAt(0) === formData.firstLetter;
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

    //dodajanje besed v result field
    if (isEmpty === true) {
        resultsHtml.innerText = 'Provide some information about the word first';
    } else if (isEmpty === false && dictionaryOfResultWords.length === 0) {
        resultsHtml.innerText = 'No words could be found';
    } else {
        const resultWords = dictionaryOfResultWords.join(', ');
        resultsHtml.innerText = resultWords;

        //če je height večji od width (mobile) -> smooth scroll do rezultatov
        if (window.innerHeight > window.innerWidth) {
            window.location = '#results';
        }
    }

    //reset liste besed
    if (document.getElementById('dictionaryBtn').innerText === 'WORDLE DICTIONARY') {
        dictionaryOfResultWords = wordleList.slice();
    } else {
        dictionaryOfResultWords = extendedList.slice();
    }
});

//čiščenje forma in result fielda
document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('input-form').reset();
    document.getElementById('results').innerText = '';
});
