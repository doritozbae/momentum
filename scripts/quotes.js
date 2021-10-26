const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuote() {
   const url = `https://favqs.com/api/qotd`;
   const res = await fetch(url);  
   const data = await res.json(); 
   quote.textContent = `"${data.quote.body}"`;
   author.textContent = data.quote.author;
}
getQuote();

changeQuote.onclick = getQuote;

let rotateBtn = -360;
changeQuote.addEventListener('click', () => {
   rotateBtn += 180;
   changeQuote.style.transform = `rotate(${rotateBtn}deg)`;
   changeQuote.style.transition = '0.75s';
})