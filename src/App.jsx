import { useState, useEffect } from 'react';
import './App.css'
import datas from './datas';

function Header({ headerText }) {
  return (
    <header>
      <h1>{headerText}</h1>
    </header>
  );
}

function TableContainer() {
  return (
    <div className='table-container'>
      <TableHeader />
      <TableRow cells={datas} />
    </div>
  );
}

function TableHeader() {
  return (
    <div className='table-row heading'>
      <RowItem text="Date" col="1" align="center" />
      <RowItem text="Topic" col="5" align="center" />
      <RowItem text="Speaker" col="2" />
    </div>
  );
}

function TableRow({ cells }) {
  return cells.map(cell => {
    const _date = new Date(cell.date);
    return (
      <div className='table-row' key={cell.id}>
        <RowItem text={`${String(_date.getMonth() + 1).padStart(2, '0')}/${String(_date.getDate()).padStart(2, '0')}`} col="1" align="center" />
        <RowItem text={cell.topic} col="5" />
        <RowItem text={cell.speaker} col="2" align="center" />
      </div>
    );
  });
}

function RowItem({ text, col, align }) {
  const _col = col || '1';
  const _align = align || 'left'
  const _className = ['row-item', `col-${_col}`, `align-${_align}`].join(' ');
  return (
    <div className={_className}>
      {text}
    </div>
  );
}

function Footer({ opacity }) {
  return (
    <footer style={{ opacity }}>
      <span>© 2024 ODSMPD. All rights reserved.</span>
    </footer>
  );
}

function App() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      let newOpacity = scrollPosition / maxScroll;
      if (newOpacity > 1) newOpacity = 1;
      setOpacity(newOpacity);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.addEventListener('scroll', handleScroll);
    };
  }, []);
  const headerText = "2024 下半年 PD 技術分享會"
  return (
    <>
      <Header headerText={headerText} />
      <main>
        <TableContainer />
      </main>
      <Footer opacity={opacity} />
    </>
  );
}

export default App
