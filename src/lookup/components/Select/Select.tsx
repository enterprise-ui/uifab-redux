import * as React from 'react'
import debounce from 'lodash/debounce'

import { SelectLayout, ISelectLayoutProps } from './SelectLayout'
import { IMeta } from '../../interfaces/input'

export type TSelectValue = string[] | string | null

interface ISelectProps extends ISelectLayoutProps {
  name?: string
  meta?: IMeta
  currentOption?: object
  options?: object[]
  withButton?: boolean
  buttonText?: string
  loadedData?: object[]
  optionValueKey?: string
  selectSearchKey?: string
  lettersCountForSearchTrigger?: number
  onChange?: (value?: TSelectValue, option?: object | object[]) => void
  handleChange?: (value?: TSelectValue, loadedData?: object[]) => void
  onButtonClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void
  onLoadOptions?: (text?: string) => void
}

interface ISelectStata {
  inputValue?: string
}

export class Select extends React.PureComponent<ISelectProps, ISelectStata> {
  lastQueryText?: string
  isLoaded = false
  state = {
    inputValue: '',
  }

  /** Запускает загрузку отфильтрованных опций по параметру text */
  onLoad = (text?: string) => {
    if (text !== this.lastQueryText || !this.isLoaded) {
      this.lastQueryText = text

      if (this.props.onLoadOptions) {
        this.props.onLoadOptions(text)
        this.isLoaded = true
      }
    }
  }
  loadOnChange = debounce(this.onLoad, 300)

  /** Запускает this.loadOnChange если запрос равен или длиннее 3х символов */
  inputOnChange = (e) => {
    const { lettersCountForSearchTrigger } = this.props

    this.setState({ inputValue: e.target.value }, () => {
      const lettersCount = lettersCountForSearchTrigger ? lettersCountForSearchTrigger : 3

      if (this.state.inputValue && this.state.inputValue.length >= lettersCount) {
        this.loadOnChange(this.state.inputValue)
      }
    })
  }

  /** Устанавливает текст инпута по значению селекта */
  setInputBySelectValue = (value) => {
    const { options, optionValueKey, selectSearchKey } = this.props

    if (options) {
      const currentOption = options.find((item) => item[optionValueKey || 'id'] === value)
      const text = currentOption ? currentOption[selectSearchKey || 'value_i18n'] : ''

      this.setState({ inputValue: text })
    }
  }

  /** Устанавливает значение селекта */
  selectOnChange = (value?: TSelectValue) => {
    const {
      loadedData,
      options = [],
      optionValueKey,
      isMultiSelect,
      onChange,
      handleChange,
    } = this.props

    const currentOption = isMultiSelect
      ? value && value.length
        ? options.filter((item) => value.includes(item[optionValueKey || 'id']))
        : []
      : options.find((item) => item[optionValueKey || 'id'] === value)

    if (onChange) {
      onChange(value, currentOption)
    }
    if (handleChange) {
      handleChange(value, loadedData)
    }
    this.setInputBySelectValue(isMultiSelect ? '' : value)
  }

  /** Действия при открытии списка опций */
  onShowOptions = () => {
    if (this.state.inputValue === '') {
      this.onLoad('')
    }
  }

  /** Переключение списка опций */
  onOptionsToggle = (isOpened: boolean) => {
    if (isOpened) {
      this.onShowOptions()
    }
  }

  /** Сброс значения селекта */
  onClear = () => {
    this.selectOnChange(this.props.isMultiSelect ? null : '')
    this.onLoad('')
  }

  render() {
    const {
      name,
      placeholder,
      options,
      withButton,
      buttonText,
      children,
      meta,
      onButtonClick,
      onLoadOptions,
      ...props
    } = this.props

    const { inputValue } = this.state

    return (
      <SelectLayout
        {...props}
        onChange={this.selectOnChange}
        placeholder={!props.value ? placeholder : ''}
        isClearable
        onOptionsToggle={this.onOptionsToggle}
        onClear={this.onClear}
      >
        <SelectLayout.Input
          name={name}
          onChange={this.inputOnChange}
          value={inputValue || ''}
          type="text"
          readOnly={props.readOnly}
        />

        {children}

        {withButton && (
          <SelectLayout.Button onClick={onButtonClick}>{buttonText}</SelectLayout.Button>
        )}
        {meta && meta.touched && meta.error && (
          <SelectLayout.Errors>{meta.error}</SelectLayout.Errors>
        )}
      </SelectLayout>
    )
  }
}
