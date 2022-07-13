// import logo from './logo.svg';
import './App.css';
import Grid from './Components/Grid'

function App() {
  return (
    <div className="flex flex-col items-center justify-center pt-12 md:pt-24">
      <h1 className="px-8 py-4 mx-auto text-4xl font-thin uppercase">Werdlo</h1>
      <Grid />
    </div>
  );
}

export default App;
