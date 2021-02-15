
const englishInput = document.getElementById('input-eng');
const russianInput = document.getElementById('input-rus');
const input = document.querySelectorAll('input');
const saveButton = document.getElementById('btn');
const table = document.getElementById('table');
const remove = document.getElementsByClassName('remove-btn');



let words;
localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

let addWordToTable = index => {
    table.innerHTML += `
    <tr>
        <td>${words[index].translate}</td>
        <td>${words[index].russian}</td>
        <td><button type='button' class='remove-btn'>X</button></td>
    </tr>`
}




document.addEventListener("DOMContentLoaded", function () {

    let removeWord = event => {
        
        words.forEach(({ translate }, index) => {
            translate === event.target.parentNode.parentNode.childNodes[1].innerHTML ? words.splice(index, 1) : false;
        });
        event.target.parentNode.parentNode.innerHTML = '';
        localStorage.setItem('words', JSON.stringify(words));

    }
    for (let i = 0; i < remove.length; i++) {
        remove[i].addEventListener('click', removeWord);
    }
})




words.forEach((element, i) => {
    addWordToTable(i);
})

class CreateWord {
    constructor(translate, russian) {
        this.translate = translate;
        this.russian = russian;
    }
}

saveButton.addEventListener('click', () => {
    if (englishInput.value.length < 1 || russianInput.value.length < 1 || !isNaN(englishInput.value) || !isNaN(russianInput.value)) {
        for (let key of input) {
            key.classList.add('error');
        }
    } else {
        for (let key of input) {
            key.classList.remove('error');
        }
        words.push(new CreateWord(englishInput.value, russianInput.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);
    }
})



