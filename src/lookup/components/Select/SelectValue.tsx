import * as React from 'react'
import styled from 'styled-components'

/**
 * Значение выпадающего списка.
 */

interface ISelectValueProps {
  mod?: string
}

const StyledValue = styled.div<ISelectValueProps>`
  position: ${({ mod }) => (!(mod === 'simpleStyle') ? 'absolute' : '')};
  top: 0;
  left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;
  flex-grow: 1;
  color: ${({ mod, theme }) => (mod === 'simpleStyle' ? theme.accentTextColor : theme.textColor)};
  font-weight: ${({ mod }) => (mod === 'simpleStyle' ? '500' : '')};
`

export class SelectValue extends React.Component<ISelectValueProps, {}> {
  public static displayName = 'SelectValue'

  render() {
    return <StyledValue {...this.props}>{this.props.children}</StyledValue>
  }
}
