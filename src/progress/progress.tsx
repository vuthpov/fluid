import React from 'react'
import { useProgressBar } from '@react-aria/progress'
import { styled } from '../theme/stitches.config'

interface ProgressProps {
  label?: string
  value: number
  minValue?: number
  maxValue?: number
  showValueLabel?: boolean
}

const Container = styled(`div`, {})

const EmptyBar = styled(Container, {
  background: '$gray400',
})

const FilledBar = styled(Container, {
  background: 'red',
  left: 0,
  top: 0,
})

const LabelContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
})

const Progress: React.FC<ProgressProps> = (props) => {
  let {
    label,
    showValueLabel = !!label,
    value,
    minValue = 0,
    maxValue = 100,
  } = props
  let { progressBarProps, labelProps } = useProgressBar(props)

  let percentage = (value - minValue) / (maxValue - minValue)
  let barWidth = `${Math.round(percentage * 100)}%`

  return (
    <div>
      <LabelContainer>
        {label && <span {...labelProps}>{label}</span>}
        {showValueLabel && <span>{progressBarProps['aria-valuetext']}</span>}
      </LabelContainer>
      <Container>
        <EmptyBar
          style={{
            height: 10,
          }}
        >
          <FilledBar
            style={{
              width: barWidth,
              height: 10,
            }}
          />
        </EmptyBar>
      </Container>
    </div>
  )
}

export default Progress
