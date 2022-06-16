import { Button, Input, ToolTip } from 'fluid'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Input
          labelPlaceHolder={'Username'}
          description={'Please Input Your Username'}
          errorMessage={'error'}
        />
        <Button
          onMouseEnter={(e) => {
            console.log('focus')
          }}
          onMouseOver={(e) => {
            console.log('focus')
          }}
        >
          Button
        </Button>

        <ToolTip content={'Tooltip'}>
          <Button>Hover</Button>
        </ToolTip>

        <ToolTip content={'Tooltip'} trigger={'click'}>
          <Button>click</Button>
        </ToolTip>

        <ToolTip content={'Tooltip'} placement={'bottom'}>
          <Button>bottom</Button>
        </ToolTip>

        <ToolTip content={'Tooltip'} placement={'left'}>
          <Button>Left</Button>
        </ToolTip>

        <ToolTip content={'Tooltip'} placement={'right'}>
          <Button>Right</Button>
        </ToolTip>
      </header>
    </div>
  )
}

export default App
