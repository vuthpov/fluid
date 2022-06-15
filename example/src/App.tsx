import { Button, Input, Link } from 'fluid'

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
        <Link href="https://youtube.com" target="_blank">Youtube</Link>
      </header>
    </div>
  )
}

export default App
