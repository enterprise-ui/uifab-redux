import * as React from 'react'
import styled from 'styled-components'

const ActionBar = styled.div`
  display: flex;

  &:not(:last-child) {
    margin-right: 5px;
  }
`

/**
 * Экшен-бар выпадающего списка.
 */
export class SelectActionBar extends React.Component {
  public static displayName = 'SelectActionBar'

  render() {
    const { children } = this.props

    return <ActionBar {...this.props}>{children}</ActionBar>
  }
}
