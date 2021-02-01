import * as React from 'react'
import styled from 'styled-components'

const StyledSelectEmty = styled.div`
  padding: 0 11px 11px 11px;
`

interface ISelectEmptyProps {
  className?: string
}
/**
 * Компонент, отображаемый при пустом списке опций.
 */
export class SelectEmpty extends React.Component<ISelectEmptyProps, {}> {
  public static displayName = 'SelectEmpty'

  render() {
    const { children, className } = this.props

    return (
      <StyledSelectEmty {...this.props} className={className}>
        {children}
      </StyledSelectEmty>
    )
  }
}
