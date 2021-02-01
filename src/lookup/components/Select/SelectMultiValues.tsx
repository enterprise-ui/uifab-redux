import * as React from 'react'
import styled from 'styled-components'

/**
 * Обертка для мультиселекта
 */

const ValueWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`

export class SelectMultiValues extends React.PureComponent<{}, {}> {
  public static displayName = 'SelectMultiValues'

  render() {
    return <ValueWrapper>{this.props.children}</ValueWrapper>
  }
}
