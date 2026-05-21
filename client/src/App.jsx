import MyForm from './Form';
import MyData from './Data';

function App() {

  return (
    <>
      <section id="form">
        <div>
          <h1>Player Input Form</h1>
          <MyForm />
        </div>
      </section>
      <section id="data">
        <div>
          <h1>Player Table</h1>
          <MyData />
        </div>
      </section>
    </>
  )
}

export default App
