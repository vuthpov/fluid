import { Button, Input } from 'fluid'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Input
          label={'Username'}
          description={'Please Input Your Username'}
          errorMessage={'error'}
        />
        <Button>Hello</Button>
      </header>
    </div>
  )
}

export default App
