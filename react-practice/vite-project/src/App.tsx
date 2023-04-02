import ListGroup from './components/ListGroup';

function App() {
  let items = ["japan", "tokyo", "kyoto", "fukuoka", "osaka"];
  return <div><ListGroup items={items} heading="Cities" /></div>
}

export default App;