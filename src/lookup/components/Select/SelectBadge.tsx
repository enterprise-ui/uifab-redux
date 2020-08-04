import * as React from 'react'
import styled from 'styled-components'
import { IStyleMods } from './SelectStyles'
import { SelectContext } from './SelectContext'
import ClearIcon from '../../../icons/closeIcon.svg'

interface ISelectValuesProps {
  value: string
}
interface IBadgeStyleMods {
  mod?: string
}

/**
 * Значение выбранной опции.
 */

const StyledClearIcon = styled(ClearIcon)<IBadgeStyleMods>`
  cursor: pointer;
  width: ${({ mod }) => (mod === 'smallBadges' ? '12px' : '18px')};
  fill: #fff;
  margin-left: 5px;
`

const StyledBadge = styled.div<IBadgeStyleMods>`
  background-color: ${({ theme }) => theme.mainColor};
  color: #fff;
  padding: ${({ mod }) => (mod === 'smallBadges' ? '4px 5px' : '6px 9px')};
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;

  &:not(:last-child) {
    margin-right: 5px;
  }
`

const StyledValue = styled.div`
  flex-wrap: wrap;
  word-break: break-word;
`

export class SelectBadge extends React.PureComponent<ISelectValuesProps, {}> {
  static contextType = SelectContext
  context!: React.ContextType<typeof SelectContext>
  public static displayName = 'Badge'

  /**
   * Обработчик клика по кнопке "x" удаляющий пункт из выбранных.
   */
  private handleRemoveBadge = (e) => {
    e.stopPropagation()
    const { onBadgeRemove } = this.context

    if (onBadgeRemove) {
      onBadgeRemove(this.props.value)
    }
  }

  render() {
    const { styleMods } = this.context
    const { mod } = styleMods as IStyleMods

    return (
      <StyledBadge mod={mod} {...this.props}>
        <StyledValue>{this.props.children}</StyledValue>
        <StyledClearIcon mod={mod} onClick={this.handleRemoveBadge} />
      </StyledBadge>
    )
  }
}
