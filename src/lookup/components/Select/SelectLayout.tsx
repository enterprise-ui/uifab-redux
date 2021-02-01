import * as React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import { hasValue } from '../../../utils/hasValue'
import { SelectContext } from './SelectContext'

import {
  SelectStyled,
  SelectClearButtonIcon,
  SelectControlBar,
  SelectArrowButtonIcon,
  SelectLoader,
  Inner,
  ValueWrapper,
  Placeholder,
  Label,
  OptionsWrapper,
} from './SelectStyles'

import { SelectInput } from './SelectInput'
import { SelectOptions } from './SelectOptions'
import { SelectOption } from './SelectOption'
import { SelectValue } from './SelectValue'
import { SelectMultiValues } from './SelectMultiValues'
import { SelectEmpty } from './SelectEmpty'
import { SelectErrors } from './SelectErrors'
import { SelectButton } from './SelectButton'
import { SelectActionBar } from './SelectActionBar'
import { SelectBadge } from './SelectBadge'

import { IStyleMods } from './SelectStyles'

type TValue = string | string[] | null
export interface ISelectLayoutProps {
  value?: TValue
  placeholder?: string
  label?: string
  disabled?: boolean
  required?: boolean
  className?: string
  noUnderline?: boolean
  isExtendable?: boolean
  readOnly?: boolean
  isLoading?: boolean
  mod?: string
  isError?: boolean
  isMultiSelect?: boolean
  isNotClearable?: boolean
  onChange?(value?: TValue): void
  onOptionsToggle?(flag?: boolean): void
  onClear?(): void
}

export interface ISelectState {
  showOptions: boolean
  inputValue?: string
}

export class SelectLayoutBase extends React.PureComponent<ISelectLayoutProps, ISelectState> {
  public static displayName = 'Select'
  public static Input = SelectInput
  public static Options = SelectOptions
  public static Option = SelectOption
  public static Value = SelectValue
  public static Values = SelectMultiValues
  public static Empty = SelectEmpty
  public static Errors = SelectErrors
  public static Button = SelectButton
  public static ActionBar = SelectActionBar
  public static Badge = SelectBadge

  constructor(props: ISelectLayoutProps) {
    super(props)

    this.state = {
      showOptions: false,
    }
  }

  /** Ref-ссылка на поле ввода. */
  private inputElement!: HTMLInputElement

  /**
   * Обработчик переключения состояния списка опций.
   */
  private handleToggleOptions = () => {
    this.state.showOptions ? this.handleHideOptions() : this.handleShowOptions()
  }

  /**
   * Обработчик открытия списка опций.
   */
  private handleShowOptions = () => {
    if (!this.props.disabled && !this.state.showOptions) {
      this.setState(
        {
          showOptions: true,
        },
        () => {
          this.props.onOptionsToggle && this.props.onOptionsToggle(true)
          this.inputElement && this.inputElement.focus()
        }
      )
    }
  }
  /**
   * Обработчик закрытия списка опций.
   */
  private handleHideOptions = () => {
    if (this.state.showOptions) {
      this.setState(
        {
          showOptions: false,
        },
        () => {
          this.props.onOptionsToggle && this.props.onOptionsToggle(false)
          this.inputElement && this.inputElement.blur()
        }
      )
    }
  }

  /**
   * Обработчик выбора опции.
   *
   * @param {TValue} newValue Обновлённое значение.
   */
  private handleSelectOption = (newValue: string) => {
    const { onChange, value, isMultiSelect } = this.props

    if (isMultiSelect) {
      if (onChange) {
        if (!value) {
          onChange([newValue])
        } else if (Array.isArray(value) && !value.includes(newValue)) {
          onChange([...value, newValue])
        }
      }
    } else {
      // Если значение изменилось, то вызываем обработчик.
      if (onChange && value !== newValue) {
        this.setState({ inputValue: newValue })
        onChange(newValue)
      }
      this.handleHideOptions()
    }
  }

  /**
   * Обработчик удаления опции.
   *
   * @param {string} valueForRemove Обновлённое значение.
   */
  private handleRemoveOption = (valueForRemove: string) => {
    const { onChange, value } = this.props
    const newValue = (Array.isArray(value) ? value : []).filter(
      (option) => option !== valueForRemove
    )

    if (onChange) {
      if (newValue.length === 0) {
        onChange(null)
      } else {
        onChange(newValue)
      }
    }
  }

  handleClickOutside = () => {
    this.handleHideOptions()
  }

  setInputElement = (ref) => {
    if (ref) this.inputElement = ref
  }

  handleClearButton = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    // Отменяем обработку клика по триггеру.
    e.stopPropagation()

    const { onClear } = this.props

    onClear && onClear()
  }

  render() {
    const {
      children,
      isNotClearable,
      isError,
      noUnderline,
      isExtendable,
      value,
      className,
      disabled,
      placeholder,
      required,
      label,
      isLoading,
      readOnly,
    } = this.props
    const { showOptions } = this.state

    const { isMultiSelect, mod } = this.props
    let optionsElement: JSX.Element | null = null
    let valueElement: JSX.Element | null = null
    let valuesElement: JSX.Element | null = null
    let inputElement: JSX.Element | null = null
    let errorsElement: JSX.Element | null = null
    let buttonElement: JSX.Element | null = null
    let actionBarElement: JSX.Element | null = null
    let emptyOptionsElement: JSX.Element | null = null

    React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type) {
        switch ((child.type as typeof child.type & { displayName: string }).displayName) {
          // Список опций.
          case SelectOptions.displayName:
            optionsElement = child
            break
          // Выводимое значение.
          case SelectValue.displayName:
            valueElement = child
            break
          // Обёртка выводимого значения.
          case SelectMultiValues.displayName:
            valuesElement = child
            break
          // Вывод ошибок валидации.
          case SelectErrors.displayName:
            errorsElement = child
            break
          // Поле ввода.
          case SelectInput.displayName:
            inputElement = child
            break
          // Кнопка.
          case SelectButton.displayName:
            if (!disabled) {
              buttonElement = child
            }
            break
          // элемент "Список пуст"
          case SelectEmpty.displayName:
            emptyOptionsElement = child
            break
          //
          case SelectActionBar.displayName:
            actionBarElement = child
            break
        }
      }
    })

    const isValue = hasValue(value)
    const isShowClearButton =
      !isNotClearable && !readOnly && isValue && !disabled && !(mod === 'simple')

    const styleMods: IStyleMods = {
      disabled: disabled,
      isShowOptions: showOptions,
      isError: isError,
      isValue,
      isLabel: Boolean(label),
      noUnderline: noUnderline,
      isExtendable: isExtendable,
      isReadOnly: readOnly,
      mod,
    }

    const contextProps = {
      value: value,
      placeholder: placeholder,
      isLoading: isLoading,
      isMultiSelect: isMultiSelect,
      styleMods,
      onOptionSelect: this.handleSelectOption,
      onBadgeRemove: this.handleRemoveOption,
      setInputElement: this.setInputElement,
    }
    return (
      <SelectStyled className={className} {...styleMods}>
        <SelectContext.Provider value={contextProps}>
          <Inner
            onClick={!readOnly ? this.handleToggleOptions : undefined}
            tabIndex={disabled || inputElement ? -1 : 0}
            {...styleMods}
            title={label}
            mod={mod}
          >
            <ValueWrapper {...styleMods}>
              {isMultiSelect ? valuesElement : valueElement}
              {!isValue && showOptions && <Placeholder>{placeholder}</Placeholder>}
              {label && !(mod === 'simple') && (
                <Label asterix={!readOnly && required} {...styleMods}>
                  {label}
                </Label>
              )}
            </ValueWrapper>

            {errorsElement}

            <SelectControlBar>
              {isLoading && <SelectLoader width="15px" borderwidth="2px" center />}
              {actionBarElement}
              {buttonElement}
              {isShowClearButton && <SelectClearButtonIcon onClick={this.handleClearButton} />}
              {!readOnly && <SelectArrowButtonIcon isShowOptions={showOptions} />}
            </SelectControlBar>
          </Inner>

          {showOptions && (
            <OptionsWrapper>
              {!(mod === 'simple') && inputElement}
              {optionsElement}
              {emptyOptionsElement}
            </OptionsWrapper>
          )}
        </SelectContext.Provider>
      </SelectStyled>
    )
  }
}

export const SelectLayout = enhanceWithClickOutside(SelectLayoutBase)
