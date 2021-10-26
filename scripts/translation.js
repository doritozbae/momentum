// console.log('lsdkfmv')
const settingLanguage = document.querySelectorAll('.language-settings input[name="language"]');

document.addEventListener('DOMContentLoaded', () => {
   if (pageOption.lang === 'EN') {
       setEN();
       

   } else if (pageOption.lang === 'RU') {
       setRU();
       
   }
   settingLanguage.forEach(e => {
   setSetting(e, 'lang');
   });
//    getQuote();
});


function setSetting(e, type) {
   e.checked = false;
   e.disabled = false;
   if (e.id === localStorage.getItem(type)) {
       e.checked = true;
       e.disabled = true;
   }
   if (type === 'lang') {
       if (!localStorage.getItem('lang')) {
          settingLanguage[0].checked = true;
       }

       e.addEventListener('click', () => {
           if (e.disabled) return;
           if (e.id === 'RU') {
               setRU();
           } 
           else if (e.id === 'EN') {
               setEN();
           }

           settingLanguage.forEach(item => item.disabled = false);
           e.disabled = true;
           pageOption.lang = e.id;
           localStorage.setItem('lang', e.id);
       });
   }
}
// })

const settingText = document.querySelector('.settings-text');
const timeSet = document.querySelector('.set-time');
const dateSet = document.querySelector('.set-date');
const greetSet = document.querySelector('.set-greet');
const weathSet = document.querySelector('.set-weather');
const playerSet = document.querySelector('.set-player');
const nameApi = document.querySelector('.imAp');
const tagSet = document.querySelector('.tagSet');
const langSet = document.querySelector('.langSet');

function setEN() {
   username.placeholder = '[Enter name]';
   currentCity.placeholder = '[Enter city]';
   settingText.textContent = 'Settings';
   timeSet.textContent = 'Time';
   dateSet.textContent = 'Date';
   greetSet.textContent = 'Greeting:';
   weathSet.textContent = 'Weather';
   playerSet.textContent = 'Player';
   nameApi.textContent = 'Image API';
   todoValue.placeholder = 'Tasks to do...';
   tagSet.textContent = 'Tags';
   langSet.textContent = 'Language';
   tagSet.textContent = 'Tags';
   langSet.textContent = 'Language';
   getQuote();
}

function setRU() {
   username.placeholder = '[Введите имя]';
   currentCity.placeholder = '[Введите город]';
   settingText.textContent = 'Настройки';
   timeSet.textContent = 'Время';
   dateSet.textContent = 'Дата';
   greetSet.textContent = 'Приветствие:';
   weathSet.textContent = 'Погода';
   playerSet.textContent = 'Плеер';
   nameApi.textContent = 'Выбор API';
   todoValue.placeholder = 'Список дел...';
   tagSet.textContent = 'Тэги';
   langSet.textContent = 'Язык';

const quotesRU = [
    {      
      quote: 'Начинать всегда стоит с того, что сеет сомнения.',
      author: 'Борис Стругацкий',
    },  
    {      
       quote: 'Вы никогда не пересечете океан, если не наберетесь мужества потерять берег из виду.',
       author: 'Христофор Колумб',
    },
    {
       quote: 'Лучшая месть – огромный успех.',
       author: 'Фрэнк Синатра',
    },
    {
       quote: '  Если внутренний голос говорит вам, что вы не можете рисовать – рисуйте как можно больше, тогда этот голос затихнет.',
       author: 'Ван Гог',
    },
    {
       quote: ' Есть только один способ избежать критики: ничего не делайте, ничего не говорите и будьте никем.',
       author: 'Аристотель',
    }
  ]

 quote.textContent = `${quotesRU[num].quote}`;
 author.textContent =  `${quotesRU[num].author}`;
 rand(first, second);

 
}