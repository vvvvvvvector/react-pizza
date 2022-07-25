import './scss/components/_header.scss'

function Content() {
  return (<h1>hello world!</h1>);
}

function App() {
  return (
    <div className="wrapper">
      <div className="header">
        <div className="container">
          <div className="header__logo">
            <img alt="store-logo" src={require("./assets/images/store-logo.jpg")} />
            <div>
              <h1>react pizza</h1>
              <p>the best pizza in the universe</p>
            </div>
          </div>
          here will be button
        </div>
      </div>
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
    </div>
  );
}

export default App;
