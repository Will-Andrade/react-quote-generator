import { useCallback, useEffect, useState } from 'react';
import classes from './App.module.css';

type Quote = {
  text: string; 
  author: string;
};

const getRandomQuote = (quotes: Quote[]) => 
  quotes[Math.floor(Math.random() * quotes.length)];

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const getQuotes = async () => {
      try {
        const response = await fetch ('https://type.fit/api/quotes');

        if (!response.ok) throw new Error('Error fetching data!');

        const responseData = await response.json();
        
        setQuotes(responseData.slice(0, 100));
      } catch(err) {
        console.log(err);
      }
    };
    
    getQuotes();
    setQuote(quotes[0]);
  }, []);


  const setNewQuoteHandler = () => {
    setQuote(getRandomQuote(quotes));
  }

  return (<main>
    <h1>React Quote Generator</h1>
    <article>
      <button onClick={setNewQuoteHandler}>New Quote</button>
      <q>{quote?.text}</q>
      <p>- {quote?.author === null ? 'Author Unknown' : quote?.author}</p>
    </article>
  </main>);
}

export default App;
