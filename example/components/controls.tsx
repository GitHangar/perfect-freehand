import * as React from 'react'
import NumberInput from './number-input'
import BooleanInput from './boolean-input'
import state, { useSelector } from '../state'
import styled from 'styled-components'

const StyledControls = styled.div`
  position: absolute;
  top: 44px;
  right: 0;
  width: 100%;
  max-width: 512px;
  display: grid;
  grid-template-columns: auto 1fr 48px;
  gap: 4px 8px;
  font-size: 13px;
  padding: 16px;
  background-color: var(--color-scrim);
  backdrop-filter: blur(30px);
`

const ButtonGroup = styled.div`
  padding-top: 16px;
  grid-column: 1 / span 3;
  display: grid;
  grid-auto-flow: column;
  gap: 16px;

  button {
    padding: 8px 12px;
  }
`

export default function Controls() {
  const options = useSelector(state => state.data.alg)
  const settings = useSelector(state => state.data.settings)

  return (
    <StyledControls onPointerDown={e => e.stopPropagation()}>
      <BooleanInput
        label="Clip Path"
        value={options.clip}
        onChange={v => state.send('CHANGED_OPTIONS', { clip: v })}
      />
      <NumberInput
        value={options.streamline}
        onChange={v => state.send('CHANGED_OPTIONS', { streamline: v })}
        label="Streamline"
        min={0}
        max={1}
      />
      <NumberInput
        label="Size"
        value={options.size}
        min={1}
        max={64}
        onChange={v => state.send('CHANGED_OPTIONS', { size: v })}
      />
      <NumberInput
        label="Thinning"
        value={options.thinning}
        min={-1}
        max={1}
        onChange={v => state.send('CHANGED_OPTIONS', { thinning: v })}
      />

      <NumberInput
        value={options.smoothing}
        onChange={v => state.send('CHANGED_OPTIONS', { smoothing: v })}
        label="Smooth"
        min={0}
        max={2}
      />
      <BooleanInput
        label="Dark Mode"
        value={settings.darkMode}
        onChange={v => state.send('TOGGLED_DARK_MODE')}
      />
      <BooleanInput
        label="Show Path"
        value={settings.showTrace}
        onChange={v => state.send('CHANGED_SETTINGS', { showTrace: v })}
      />
      <ButtonGroup>
        <button onClick={() => state.send('RESET_OPTIONS')}>Reset</button>
        <button onClick={() => state.send('TOGGLED_CONTROLS')}>Close</button>
      </ButtonGroup>
    </StyledControls>
  )
}
