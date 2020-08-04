import * as React from 'react'
import debounce from 'lodash/debounce'

import { Select } from './Select/Select'
import { IMeta } from '../interfaces/input'

export type TSelectValue = string[] | string | null

interface IAsyncSelectProps {
  className?: string
  // name?: string
  meta?: IMeta
  disabled?: boolean
  value?: TSelectValue
  label?: string
  placeholder?: string
  isLoading?: boolean
  currentOption?: object
  options?: object[]
  required?: boolean
  readOnly?: boolean
  hasErrors?: boolean
  withButton?: boolean
  noUnderline?: boolean
  isExtendable?: boolean
  buttonText?: string
  loadedData?: object[]
  selectKey?: string
  inputKeyValue?: string
  isMultiSelect?: boolean
  isNotClearable?: boolean
  mod?: string
  lettersCountForSearchTrigger?: number
  handleChange?: (value?: TSelectValue, loadedData?: object[]) => void
  onChange?: (value?: TSelectValue, option?: object | object[]) => void
  onButtonClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void
  onLoadOptions?: (text?: string) => void
}
// export interface IOption {
//   key: string
//   value: string
//   value_i18n?: string
// }
interface IAsyncSelectStata {
  inputValue?: string
}

export class AsyncSelect extends React.PureComponent<IAsyncSelectProps, IAsyncSelectStata> {
  loadOnChange: (value: string) => void
  lastQueryText?: string
  isLoaded = false

  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
    }
    this.loadOnChange = debounce(this.onLoad, 300)
  }

  /**
   * Запускает загрузку отфильтрованных опций по параметру text
   *
   * @param {string} [text]
   */
  onLoad = (text?: string) => {
    if (text !== this.lastQueryText || !this.isLoaded) {
      this.lastQueryText = text

      if (this.props.onLoadOptions) {
        this.props.onLoadOptions(text)
        this.isLoaded = true
      }
    }
  }

  /**
   * Запускает this.loadOnChange если запрос равен или длиннее 3х символов
   *
   * @param {*} e
   */
  inputOnChange = (e) => {
    const { lettersCountForSearchTrigger } = this.props
    this.setState({ inputValue: e.target.value }, () => {
      const lettersCount = lettersCountForSearchTrigger ? lettersCountForSearchTrigger : 3
      if (this.state.inputValue && this.state.inputValue.length >= lettersCount) {
        this.loadOnChange(this.state.inputValue)
      }
    })
  }

  /**
   * Устанавливает текст инпута по значению селекта
   *
   * @param {string} value
   */
  setInputBySelectValue = (value) => {
    const { options, selectKey, inputKeyValue } = this.props
    if (options) {
      const currentOption = options.find((item) => item[selectKey || 'id'] === value)
      const text = currentOption ? currentOption[inputKeyValue || 'value_i18n'] : ''

      this.setState({ inputValue: text })
    }
  }

  /**
   * Устанавливает значение селекта
   *
   * @param {string} value
   */
  selectOnChange = (value?: TSelectValue) => {
    const {
      onChange,
      handleChange,
      loadedData,
      options = [],
      selectKey,
      isMultiSelect,
    } = this.props
    const currentOption = isMultiSelect
      ? value && value.length
        ? options.filter((item) => value.includes(item[selectKey || 'id']))
        : []
      : options.find((item) => item[selectKey || 'id'] === value)

    if (onChange) {
      onChange(value, currentOption)
    }
    if (handleChange) {
      handleChange(value, loadedData)
    }
    this.setInputBySelectValue(isMultiSelect ? '' : value)
  }

  /**
   * Действия при закрытии списка опций
   */
  onHideOptions = () => {}

  /**
   * Действия при открытии списка опций
   */
  onShowOptions = () => {
    if (this.state.inputValue === '') {
      this.onLoad('')
    }
  }

  /**
   * Переключение списка опций
   *
   * @param {boolean} isOpened
   */
  onOptionsToggle = (isOpened: boolean) => {
    if (!isOpened) {
      this.onHideOptions()
    } else {
      this.onShowOptions()
    }
  }

  /**
   * Сброс значения селекта
   */
  onClear = () => {
    this.selectOnChange(this.props.isMultiSelect ? null : '')
    this.onLoad('')
  }

  render() {
    const {
      className,
      disabled,
      readOnly,
      value,
      label,
      placeholder,
      isLoading,
      options,
      hasErrors,
      meta,
      required,
      withButton,
      noUnderline,
      isExtendable,
      buttonText,
      children,
      onButtonClick,
      onLoadOptions,
      isMultiSelect,
      isNotClearable,
      mod,
      ...inputProps
    } = this.props

    const { inputValue } = this.state
    const isError = Boolean((meta && meta.touched && meta.error) || hasErrors)

    return (
      <Select
        className={className}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        onChange={this.selectOnChange}
        label={label}
        isNotClearable={isNotClearable}
        placeholder={!value ? placeholder : ''}
        isLoading={isLoading}
        required={required}
        isClearable
        onOptionsToggle={this.onOptionsToggle}
        onClear={this.onClear}
        isError={isError}
        noUnderline={noUnderline}
        isExtendable={isExtendable}
        isMultiSelect={isMultiSelect}
        mod={mod}
      >
        <Select.Input
          {...inputProps}
          onChange={this.inputOnChange}
          value={inputValue || ''}
          type="text"
          readOnly={readOnly}
        />

        {children}

        {withButton && <Select.Button onClick={onButtonClick}>{buttonText}</Select.Button>}
        {isError && meta && <Select.Errors>{meta.error}</Select.Errors>}
      </Select>
    )
  }
}
