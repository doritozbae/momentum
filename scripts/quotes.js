const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
 
let first = 0;
let second = 4;
let num = 0;

function rand(first, second) {
         let min = Math.ceil(first);
         let max = Math.floor(second);
         num = Math.floor(Math.random() * (max - min + 1)) + min;
         console.log(num)
       }


async function getQuote() {
         const url = `https://favqs.com/api/qotd`;
         const res = await fetch(url);  
         const data = await res.json(); 
         quote.textContent = `"${data.quote.body}"`;
         author.textContent = data.quote.author;
}

function setQuote(){
   if (pageOption.lang === 'EN') {
      getQuote()
  }
  else if (pageOption.lang === 'RU') {
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

}
// getQuote();

changeQuote.onclick = setQuote;

// settingLanguage.onclick = getQuote;


let rotateBtn = -360;
changeQuote.addEventListener('click', () => {
   rotateBtn += 180;
   changeQuote.style.transform = `rotate(${rotateBtn}deg)`;
   changeQuote.style.transition = '0.75s';
})