const quoteBtn = document.getElementById("new-quote");
const textField = document.getElementById("text")
const authorField = document.getElementById("author")
const quoteBox = document.getElementById("new-quote")
const src = './data/quotes.json'

const getJsonData = async (src) => {
	try{
		const res = await fetch(src);
		const data = await res.json();
		console.log(data)

		let quoteList = await data.quotes.map((elem) => {
			elem.id = `${elem.quote.split(" ")[0]}-${Date.now()}`;
			return elem;
		})

		localStorage.setItem("quotes", JSON.stringify(quoteList));
		console.log("localStorage", localStorage.getItem("quotes"))
	}
	catch (err){
		console.log(err)
	}
}

//check if localstorage is empty
let localStorageQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
if (localStorageQuotes.length = ""){
	getJsonData(src);
}

const quoteInput = document.getElementById("quote-input");
const sourceInput = document.getElementById("source-input");
const addQuoteBtn = document.getElementById("add-quote");

const processInput = (e) => {
	//if you don't do this the page resets and you can't add values
	e.preventDefault();

	console.log("processInput called", `quote: ${quoteInput.value}, source: ${sourceInput.value}`)
	//get quotes from local storage
	let localStorageQuotes = JSON.parse(localStorage.getItem("quotes"));
	console.log(localStorageQuotes, "from local storage")

	//add input to local storage
	let quoteInputVal = quoteInput.value.trim();
	let sourceInputVal = sourceInput.value.trim();

	//input validation

	if(!quoteInputVal){
		alert("quote must not be empty")
		return;
	}
	let quoteObj = {id: '', quote: '', source: ''};
	quoteObj.quote = quoteInput.value? quoteInput.value: "Empty quote";
	quoteObj.source = sourceInput.value? sourceInput.value : "Unknown";
	quoteObj.id = `${quoteObj.quote.split(" ")[0]}-${Date.now()}`
	console.log("quoteObj: ", quoteObj)

	localStorageQuotes.push(quoteObj)
	console.log("list to be pushed: ", localStorageQuotes)
	localStorage.setItem("quotes", JSON.stringify(localStorageQuotes));
	console.log(JSON.parse(localStorage.getItem("quotes")), "check for added quote")
}

//add ways to search, edit, and delete quotes


const fillQuote = () => {
	//populate text and author from random selectio
	let quotesList = JSON.parse(localStorage.getItem("quotes"));
	console.log(quotesList, "quotes list from localstorage")

	const quoteIdx = Math.floor(Math.random() * quotesList.length);
	const quoteToFill = quotesList[quoteIdx]
	console.log(quoteToFill, "quote to be displayed")
	textField.textContent = quoteToFill.quote;
	authorField.textContent = quoteToFill.source;
	//change background color
  }

quoteBtn.addEventListener("click", fillQuote);
addQuoteBtn.addEventListener("click", processInput);
