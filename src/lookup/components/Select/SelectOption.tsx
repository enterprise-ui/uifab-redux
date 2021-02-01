import * as React from 'react'
import styled from 'styled-components'

import { SelectContext } from './SelectContext'
import { Checkbox } from '../Checkbox/Checkbox'
import { IStyleMods } from './SelectStyles'

const { css } = require('styled-components')

const hover = css`
  background-color: ${(props) => props.theme.secondaryColor};
  transition-duration: ${(props) => props.theme.faster};
`
interface SelectOptionStyled extends IStyleMods {
  selected?: boolean
}

const SelectOptionStyled = styled.div<SelectOptionStyled>`
  padding: 5px 15px;
  transition: background-color ${(props) => props.theme.duration};
  font-size: 16px;
  line-height: 18px;
  min-height: 30px;
  cursor: pointer;

  ${({ isExtendable }) =>
    isExtendable &&
    css`
      padding: 5px 10px;
    `}

  &:hover {
    ${hover}
  }
  ${(props) =>
    props.selected &&
    css`
      ${hover}
      cursor: pointer;
    `}
`
const StyledOptionInner = styled.div`
  line-height: 24px;
`
const StyledCheckbox = styled(Checkbox)`
  width: 100%;

  span {
    font-size: 14px;
  }
`

interface ISelectOptionProps {
  /** Неактивная опция. */
  disabled?: boolean
  /** Значение опции. */
  value: string
}
export class SelectOption extends React.Component<ISelectOptionProps, {}> {
  static contextType = SelectContext
  context!: React.ContextType<typeof SelectContext>
  public static displayName = 'SelectOption'

  /**
   * Обработчик клика по опции.
   */
  private handleOptionSelect = () => {
    const { onOptionSelect } = this.context

    if (!this.props.disabled && onOptionSelect) {
      onOptionSelect(this.props.value)
    }
  }

  /**
   * Обработчик клика по опции.
   */
  private handleRemoveOption = () => {
    const { onBadgeRemove } = this.context

    if (onBadgeRemove) {
      onBadgeRemove(this.props.value)
    }
  }

  toggle = () => {
    const { value: selectedValues } = this.context
    const { value } = this.props
    const selected = selectedValues && selectedValues.length && selectedValues.includes(value)

    if (selected) {
      this.handleRemoveOption()
    } else {
      this.handleOptionSelect()
    }
  }

  render() {
    const { value: selectedValue, styleMods, isMultiSelect } = this.context
    const { children, value } = this.props

    let selected = selectedValue === value

    if (isMultiSelect) {
      selected = Boolean(selectedValue && selectedValue.length && selectedValue.includes(value))
    }
    const styles = {
      ...styleMods,
      selected,
    }

    return (
      <SelectOptionStyled
        {...this.props}
        {...styles}
        onClick={!isMultiSelect ? this.handleOptionSelect : undefined}
      >
        {isMultiSelect ? (
          <StyledCheckbox checked={selected} onChange={this.toggle}>
            {children}
          </StyledCheckbox>
        ) : (
          <StyledOptionInner>{children}</StyledOptionInner>
        )}
      </SelectOptionStyled>
    )
  }
}
