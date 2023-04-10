import { useState, useMemo, useEffect } from 'react';
import './App.css'

//Used to shuffle the tiles
function shuffle(arr) {
  const shuffledArr = [...arr];
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
  return shuffledArr;
};

function App() {
  const rowCount = 4;
  const colCount = 4;
  const tileCount = rowCount * colCount - 1;

  const [tiles, setTiles] = useState(shuffle(Array.from({ length: tileCount }, (_, i) => i + 1).concat(0)));
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const emptyTileIndex = tiles.indexOf(0);

  const handleTileClick = (index) => {
    const emptyRowIndex = Math.floor(emptyTileIndex / colCount);
    const emptyColIndex = emptyTileIndex % colCount;
    const rowIndex = Math.floor(index / colCount);
    const colIndex = index % colCount;

    // Check if the clicked tile is adjacent to the empty tile
    if ((colIndex === emptyColIndex && Math.abs(rowIndex - emptyRowIndex) === 1) || (rowIndex === emptyRowIndex && Math.abs(colIndex - emptyColIndex) === 1)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyTileIndex]] = [newTiles[emptyTileIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  //Checks if tiles are ordered
  const isTilesOrdered = useMemo(() => {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i] !== i + 1) {
        return false;
      }
    }
    return true;
  }, [tiles]);

  //Used to handle the resizing
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column', }}>
      {isTilesOrdered && <div>
        Congratulations, you solved the puzzle!
      </div>}
      <div style={{
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: windowSize.width < 430 ? `repeat(${colCount}, 40px)` : `repeat(${colCount}, 60px)`,
        gridTemplateRows: windowSize.width < 430 ? `repeat(${rowCount}, 40px)` : `repeat(${rowCount}, 60px)`,
      }}>
        {tiles.map((tile, index) => (
          <button
            key={index}
            className='tile'
            style={{
              backgroundColor: tile === 0 ? "gray" : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: windowSize.width < 430 ? 10 : 16,
              gridColumnStart: index % colCount + 1,
              gridColumnEnd: index % colCount + 2,
              gridRowStart: Math.floor(index / colCount) + 1,
              gridRowEnd: Math.floor(index / colCount) + 2,
            }}
            onClick={() => handleTileClick(index)}
          >
            {tile === 0 ? '' : tile}
          </button>
        ))}
      </div>
      <button onClick={() => setTiles(shuffle(tiles))}>
        Shuffle
      </button>

      Width:{windowSize.width} Height:{windowSize.height}
    </div >
  );
};


export default App;