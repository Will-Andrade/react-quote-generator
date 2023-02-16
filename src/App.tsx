import { useEffect, useState } from 'react';
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
  };

  const copyQuoteHandler = () => {
    navigator.clipboard.writeText(`${quote?.text} \n- ${quote?.author}`);
  };

  return (<main className={classes.container} data-testid="app-component">
    <h1 className={classes.title}>React Quote Generator</h1>
    <article 
      className={classes['quote-container']} 
      data-testid="quote-generator"
    >
      <div className={classes.quotes}>
        <q>{quote?.text}</q>
        <p>- {quote?.author === null ? 'Author Unknown' : quote?.author}</p>
      </div>
      <div className={classes.controls}>
        <button type='button' onClick={setNewQuoteHandler}>New Quote</button>
        <button type='button' onClick={copyQuoteHandler}>Copy Quote</button>
      </div>
    </article>
  </main>);
}

export default App;
