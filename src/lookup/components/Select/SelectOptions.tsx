import * as React from 'react'
import styled from 'styled-components'
import { SelectContext } from './SelectContext'

const SelectOptionsStyled = styled.div`
  max-height: 150px;
  overflow: auto;
`
const Inner = styled.div``

interface ISelectOptionsProps {
  /** Обработчик прокрутки списка опций вниз. */
  onOptionsScrollToBottom?: () => void
}
/**
 * Список опций выпадающего списка.
 */
export class SelectOptions extends React.Component<ISelectOptionsProps, {}> {
  static contextType = SelectContext
  context!: React.ContextType<typeof SelectContext>

  public static displayName = 'SelectOptions'

  render() {
    const { children } = this.props
    const { isLoading } = this.context
    const styleMods = {
      isEmpty: React.Children.toArray(children).length === 0 && !isLoading,
    }

    return (
      <SelectOptionsStyled {...this.props} {...styleMods}>
        <Inner>{children}</Inner>
      </SelectOptionsStyled>
    )
  }
}
