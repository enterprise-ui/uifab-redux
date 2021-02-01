import * as React from 'react'
import {
  StyledCheckbox,
  Field,
  Icon,
  StyledCheckIcon,
  Label,
  Error,
  WrapperValue,
} from './CheckboxStyles'
import { IMeta } from '../../interfaces/input'

export interface IStyleMods {
  isError: boolean
  isFocus: boolean
  isChecked?: boolean
  isValid: boolean
  disabled?: boolean
}
export interface ICheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  className?: string
  title?: string
  disabled?: boolean
  hasErrors?: boolean
  label?: string
  name?: string
  required?: boolean
  isExtendable?: boolean
  value?: string
  checked?: boolean
  meta?: IMeta
  handleChange?(event?: React.ChangeEvent<HTMLElement>): void
  getRefInput?(instance: HTMLInputElement | null): void
}
interface ICheckboxState {
  focused: boolean
  error: boolean
}

export class Checkbox extends React.PureComponent<ICheckboxProps, ICheckboxState> {
  state = {
    focused: false,
    error: false,
  }

  onFocus = (e) => {
    const { onFocus } = this.props

    onFocus && onFocus(e)
    this.setState({ focused: true })
  }

  onBlur = (e) => {
    const { onBlur } = this.props

    onBlur && onBlur(e)
    this.setState({ focused: false })
  }

  onChange = (e) => {
    const { handleChange, onChange } = this.props

    onChange && onChange(e)
    handleChange && handleChange(e)
  }

  render() {
    const {
      className,
      label,
      children,
      hasErrors,
      disabled,
      onFocus,
      onBlur,
      onChange,
      value,
      checked,
      meta,
      getRefInput,
      required,
      isExtendable,
      title,
      ...props
    } = this.props

    const styleMods: IStyleMods = {
      isError: Boolean((meta && meta.touched && meta.error) || hasErrors),
      isFocus: Boolean((meta && meta.active) || this.state.focused),
      isChecked: checked,
      isValid: Boolean(meta && meta.touched && meta.valid),
      disabled,
    }

    return (
      <StyledCheckbox {...styleMods} className={className}>
        <Field
          {...props}
          type="checkbox"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          disabled={disabled}
          value={value}
          checked={checked}
          ref={getRefInput}
        />
        <WrapperValue title={title}>
          <Icon>
            <StyledCheckIcon />
          </Icon>
          {(children || label) && <Label asterix={required}>{children || label}</Label>}
        </WrapperValue>
        {styleMods.isError && meta && <Error isExtendable={isExtendable}>{meta.error}</Error>}
      </StyledCheckbox>
    )
  }
}
