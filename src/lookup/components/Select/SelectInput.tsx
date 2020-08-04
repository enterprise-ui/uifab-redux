import * as React from 'react'
import styled from 'styled-components'
import { SelectContext } from './SelectContext'

const StyledInput = styled.input`
  left: -11px;
  top: 0;
  padding: 15px 16px;
  width: calc(100%);
  height: calc(100%);
  outline: 1px solid rgba(102, 102, 102, 0.9);
  outline-offset: -11px;
  z-index: 2;
  background-color: #fff;
`

interface ISelectInputProps {
  className?: string
  onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => void
  onFocus?: (e: React.SyntheticEvent<HTMLInputElement>) => void
  onBlur?: (e: React.SyntheticEvent<HTMLInputElement>) => void
}

/**
 * Поле ввода для выпадающего списка.
 *
 * @xsdParentGroup Select
 */
export class SelectInput extends React.PureComponent<ISelectInputProps, {}> {
  static contextType = SelectContext
  context!: React.ContextType<typeof SelectContext>
  public static displayName = 'SelectInput'

  render() {
    const { className, ...props } = this.props
    const { setInputElement } = this.context

    return <StyledInput {...props} autoComplete="off" ref={setInputElement} />
  }
}
