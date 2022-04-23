var wordlePossibleWords = wordleList.slice();
var extendedPossibleWords = extendedList.slice().sort();
var dictionaryOfResultWords = wordlePossibleWords;
var advancedMode = false;

//color theme
const toggleColorTheme = () => {
    document.body.classList.toggle('dark-body');

    document.querySelectorAll('.inp').forEach((field) => {
        field.classList.toggle('dark-input-field');
    });

    document.querySelector('.fa-gear').classList.toggle('dark-settings-icon');

    document.querySelector('.content').classList.toggle('dark-popup');
    document.querySelector('.settings-content').classList.toggle('dark-popup');
    document.querySelectorAll('.p-bold').forEach((p) => {
        p.classList.toggle('dark-p-bold');
    });
    document.querySelectorAll('.close-btn , .settings-close-btn').forEach((btn) => {
        btn.classList.toggle('dark-close-btn');
    });

    document.querySelector('.dark-mode-label').classList.toggle('dark-dark-mode-label');
    document.querySelectorAll('.all-btn').forEach((btn) => {
        btn.classList.toggle('dark-mode-buttons-color');
    });

    document.querySelectorAll('.more-info-for-advanced-mode').forEach((item) => {
        item.classList.toggle('hidden');
    });
    document.querySelector('.toggle-dark-mode-text').classList.toggle('dark-p-bold'); //samo da bo text bele barve

    document.querySelectorAll('.text-border').forEach((item) => {
        item.classList.toggle('text-border-dark');
    });

    //defaultno je naštiman da so skrite slike od dark moda
    //v preverjanju če je local storage theme === dark odstrani ali pa pusti class hidden
    //v vsakem primeru imajo ene slike class hidden in to samo toggla katere
    document.querySelector('.images-light-mode').classList.toggle('hidden');
    document.querySelector('.images-dark-mode').classList.toggle('hidden');
};

if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'light');
    document.getElementById('darkModeCheckbox').checked = false;
}

if (localStorage.getItem('theme') === 'dark') {
    toggleColorTheme();
    //nastavi vrednost checkboxa
    document.getElementById('darkModeCheckbox').checked = true;

    const darkImages = document.querySelector('.images-dark-mode');
    if (darkImages.classList.contains('hidden')) {
        darkImages.classList.remove('hidden');
        document.querySelector('.images-light-mode').classList.add('hidden');
    }
}

document.getElementById('darkModeCheckbox').addEventListener('change', () => {
    if (document.getElementById('darkModeCheckbox').checked) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }

    toggleColorTheme();
});

//ADVANCED SEARCH MODE
if (localStorage.getItem('mode') === null) {
    localStorage.setItem('mode', 'normal');
    document.getElementById('advancedModeCheckbox').checked = false;

    document.querySelectorAll('.inp-main').forEach((input) => {
        input.maxLength = 1;
    });
}
if (localStorage.getItem('mode') === 'advanced') {
    document.getElementById('advancedModeCheckbox').checked = true;
    advancedMode = true;

    document.querySelectorAll('.inp-main').forEach((input) => {
        input.maxLength = 6;
    });
}

document.getElementById('advancedModeCheckbox').addEventListener('change', () => {
    if (document.getElementById('advancedModeCheckbox').checked) {
        localStorage.setItem('mode', 'advanced');
        advancedMode = true;

        document.querySelectorAll('.inp-main').forEach((input) => {
            input.maxLength = 6;
        });

        document.getElementById('input-form').reset();
        document.getElementById('results').innerText = '';
    } else {
        localStorage.setItem('mode', 'normal');
        advancedMode = false;

        document.querySelectorAll('.inp-main').forEach((input) => {
            input.maxLength = 1;
        });

        document.getElementById('input-form').reset();
        document.getElementById('results').innerText = '';
    }
});

//POPUP
const togglePopup = () => {
    document.getElementById('popup-1').classList.toggle('active');
};

const toggleSettings = () => {
    document.getElementById('settings-1').classList.toggle('active');
};

window.onload = togglePopup();
document.getElementById('close-btn').addEventListener('click', togglePopup); //za križec v popupu
document.querySelector('.popup .overlay').addEventListener('click', togglePopup); //ni treba kliknt križca *kot v wordlu*
document.getElementById('info-icon').addEventListener('click', togglePopup); //za info button
document.getElementById('settings-icon').addEventListener('click', toggleSettings);
document.getElementById('settings-close-btn').addEventListener('click', toggleSettings);

//DICTIONARY
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
    extendedPossibleWords = extendedList.slice().sort();
};

//SUBMIT BUTTON
document.getElementById('submitBtn').addEventListener('click', () => {
    renewLists(); //da so liste polne, ne pa že filtrirane od prej
    let isEmpty = true; //za preverjanje user inputa
    let isInvalid = false;
    let knownLetters = [];
    let includingLettersAfterSlash = [];

    const resultsHtml = document.getElementById('results'); //za result worde
    const formData = Array.from(document.querySelectorAll('#input-form input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {}); //object

    //vrne vse besede ki se začnejo na...
    if (formData.firstLetter !== '') {
        const inputLetterWord = formData.firstLetter;

        if (advancedMode === true) {
            //če je en character in to je črka, ki je v besedi na prvem mestu
            if (inputLetterWord.length === 1) {
                dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                    return word.charAt(0) === inputLetterWord.toLowerCase();
                });
                isEmpty = false;
                knownLetters.push(inputLetterWord);
                //če je dolžina večja od ena ampak na prvem mestu ni /
            } else if (inputLetterWord.length > 1 && inputLetterWord[0] !== '/') {
                isInvalid = true;
                //odstrani vse besede ki imajo na x mestu y črko
            } else if (inputLetterWord[0] === '/') {
                let lettersNotInThisPos = Array.from(inputLetterWord.slice(1));
                lettersNotInThisPos.forEach((char) => {
                    includingLettersAfterSlash.push(char);
                });
                dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                    //vrne besede ki na prvem mestu nimajo ene od črk za / -om
                    return !lettersNotInThisPos.includes(word[0]);
                });
                isEmpty = false;
            }
            //če advanced mode ni true
        } else {
            dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                return word.charAt(0) === inputLetterWord.toLowerCase();
            });
            isEmpty = false;
            knownLetters.push(inputLetterWord);
        }
    }
    //vrne vse besede ki imajo drugo črko...
    if (formData.secondLetter !== '') {
        const inputLetterWord = formData.secondLetter; //SPREMENI

        if (advancedMode === true) {
            //če je en character in to je črka, ki je v besedi na prvem mestu
            if (inputLetterWord.length === 1) {
                dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                    return word.charAt(1) === inputLetterWord.toLowerCase();
                });
                isEmpty = false;
                knownLetters.push(inputLetterWord);
                //
            } else if (inputLetterWord.length > 1 && inputLetterWord[0] !== '/') {
                isInvalid = true;
                //
            } else if (inputLetterWord[0] === '/') {
                let lettersNotInThisPos = Array.from(inputLetterWord.slice(1));
                lettersNotInThisPos.forEach((char) => {
                    includingLettersAfterSlash.push(char);
                });
                dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                    //vrne besede ki na prvem mestu nimajo ene od črk za / -om
                    return !lettersNotInThisPos.includes(word[1]);
                });
                isEmpty = false;
            }
            //če advanced mode ni true
        } else {
            dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                return word.charAt(1) === inputLetterWord.toLowerCase();
            });
            isEmpty = false;
            knownLetters.push(inputLetterWord);
        }
    }
    //vrne vse besede ki imajo tretjo črko...
    if (formData.thirdLetter !== '') {
        const inputLetterWord = formData.thirdLetter; //SPREMENI

        if (advancedMode === true) {
            //če je en character in to je črka, ki je v besedi na prvem mestu
            if (inputLetterWord.length === 1) {
                dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                    return word.charAt(2) === inputLetterWord.toLowerCase();
                });
                isEmpty = false;
                knownLetters.push(inputLetterWord);
                //
            } else if (inputLetterWord.length > 1 && inputLetterWord[0] !== '/') {
                isInvalid = true;
                //
            } else if (inputLetterWord[0] === '/') {
                let lettersNotInThisPos = Array.from(inputLetterWord.slice(1));
                lettersNotInThisPos.forEach((char) => {
                    includingLettersAfterSlash.push(char);
                });
                dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                    //vrne besede ki na prvem mestu nimajo ene od črk za / -om
                    return !lettersNotInThisPos.includes(word[2]);
                });
                isEmpty = false;
            }
            //če advanced mode ni true
        } else {
            dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                return word.charAt(2) === inputLetterWord.toLowerCase();
            });
            isEmpty = false;
            knownLetters.push(inputLetterWord);
        }
    }
    //vrne vse besede ki imajo četrto črko...
    if (formData.fourthLetter !== '') {
        const inputLetterWord = formData.fourthLetter; //SPREMENI

        if (advancedMode === true) {
            //če je en character in to je črka, ki je v besedi na prvem mestu
            if (inputLetterWord.length === 1) {
                dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                    return word.charAt(3) === inputLetterWord.toLowerCase();
                });
                isEmpty = false;
                knownLetters.push(inputLetterWord);
                //
            } else if (inputLetterWord.length > 1 && inputLetterWord[0] !== '/') {
                isInvalid = true;
            } else if (inputLetterWord[0] === '/') {
                let lettersNotInThisPos = Array.from(inputLetterWord.slice(1));
                lettersNotInThisPos.forEach((char) => {
                    includingLettersAfterSlash.push(char);
                });
                dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                    //vrne besede ki na prvem mestu nimajo ene od črk za / -om
                    return !lettersNotInThisPos.includes(word[3]);
                });
                isEmpty = false;
            }
            //če advanced mode ni true
        } else {
            dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                return word.charAt(3) === inputLetterWord.toLowerCase();
            });
            isEmpty = false;
            knownLetters.push(inputLetterWord);
        }
    }
    //vrne vse besede ki imajo peto črko...
    if (formData.fifthLetter !== '') {
        const inputLetterWord = formData.fifthLetter; //SPREMENI

        if (advancedMode === true) {
            //če je en character in to je črka, ki je v besedi na prvem mestu
            if (inputLetterWord.length === 1) {
                dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                    return word.charAt(4) === inputLetterWord.toLowerCase();
                });
                isEmpty = false;
                knownLetters.push(inputLetterWord);
                //
            } else if (inputLetterWord.length > 1 && inputLetterWord[0] !== '/') {
                isInvalid = true;
            } else if (inputLetterWord[0] === '/') {
                let lettersNotInThisPos = Array.from(inputLetterWord.slice(1));
                lettersNotInThisPos.forEach((char) => {
                    includingLettersAfterSlash.push(char);
                });
                dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                    //vrne besede ki na prvem mestu nimajo ene od črk za / -om
                    return !lettersNotInThisPos.includes(word[4]);
                });
                isEmpty = false;
            }
            //če advanced mode ni true
        } else {
            dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                return word.charAt(4) === inputLetterWord.toLowerCase();
            });
            isEmpty = false;
            knownLetters.push(inputLetterWord);
        }
    }
    //vrne vse besede ki vsebujejo 'including letters'
    if (formData.includesLetter !== '' || includingLettersAfterSlash.length !== 0) {
        //
        const lettersInput = Array.from(formData.includesLetter);
        const letters = [...lettersInput, ...includingLettersAfterSlash];

        letters.forEach((char) => {
            dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                return word.includes(char.toLowerCase());
            });

            knownLetters.push(char);
        });
        isEmpty = false;

        //da izpiše še črke v polje includes letters
        const field = document.querySelector('#includesLetter');
        field.value = '';
        field.value += Array.from(new Set(letters)).join('');
    }

    //vrne vse besede ki ne vsebujejo določenih črk
    if (formData.doesntInclude !== '') {
        let letters = Array.from(formData.doesntInclude);
        letters.forEach((char) => {
            if (!knownLetters.includes(char)) {
                dictionaryOfResultWords = dictionaryOfResultWords.filter((word) => {
                    return !word.includes(char.toLowerCase());
                });
            }
        });
        isEmpty = false;
    }

    //dodajanje besed v result field
    if (isInvalid === true) {
        resultsHtml.innerText = 'Invalid input';
    } else if (isEmpty === true) {
        resultsHtml.innerText = 'Provide some info about the word';
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

const resetForm = () => {
    document.getElementById('results').innerText = '';
    document.getElementById('input-form').reset();
};
//čiščenje forma in result fielda
document.getElementById('resetBtn').addEventListener('click', resetForm);

//escape resetira form
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        resetForm();
    }
});
