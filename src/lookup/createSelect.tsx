import * as React from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { SelectLayout } from './components/Select/SelectLayout'
import { Select } from './components/Select/Select'
import { TLookupInputValue, ISelectBaseProps } from './interfaces/lookup'
import { labelDucks } from './labelDucks'
import { createLabel } from './createLabel'
import { valueIsArrayAndExist } from '../utils/valueIsArrayAndExist'
import { ISelectDucksParams, ISelectActions } from './selectDucks'

export const createSelect = (params: ISelectDucksParams, selectActions: ISelectActions) => (
  SelectValue: React.ElementType
) => {
  const { endpointName, isMultiSelect, filter: filterFromConfig } = params

  const { labelConfig, labelActions } = labelDucks(params)
  const Label = createLabel(labelConfig, labelActions)(SelectValue)

  const SelectBase: React.FC<ISelectBaseProps> = ({
    value,
    options = [],
    children,
    filter,
    isReversed,
    ...props
  }) => {
    const placeholder =
      props.placeholder === '' ? undefined : props.placeholder || 'Выберите значение'

    const newOptions = isReversed ? options.slice(0).reverse() : options

    return (
      <Select
        {...props}
        isMultiSelect={isMultiSelect}
        value={value}
        options={options}
        placeholder={placeholder}
      >
        {isMultiSelect ? (
          <SelectLayout.Values>
            {valueIsArrayAndExist(value) &&
              value
                .slice(0)
                .sort()
                .map((val) => (
                  <SelectLayout.Badge value={val} key={val}>
                    <Label {...props} value={val} />
                  </SelectLayout.Badge>
                ))}
          </SelectLayout.Values>
        ) : (
          <SelectLayout.Value mod={props.mod}>
            <Label {...props} value={value} />
          </SelectLayout.Value>
        )}
        <SelectLayout.Options>
          {newOptions.map((option, index) => (
            <SelectLayout.Option value={option[params.optionValueKey]} key={index}>
              <SelectValue {...option} />
            </SelectLayout.Option>
          ))}
          {!Boolean(newOptions && newOptions.length) && (
            <SelectLayout.Empty>Список пуст</SelectLayout.Empty>
          )}
        </SelectLayout.Options>
        {typeof children === 'function' ? children(props) : children}
      </Select>
    )
  }

  const mapStateToProps = (state, { value, name, label }) => {
    const select = get(state, `lookup.${endpointName}`, {})[name]

    return {
      currentOption: get(state, `lookup.${endpointName}.items`, {})[value],
      loadedData: get(select, `loadedData`),
      options: get(select, `options`),
      isLoading: get(select, `process.isLoading`),
      ...params,
      label: label === '' ? undefined : label || params.label,
    }
  }
  const mapDispatchToProps = (dispatch, props) => {
    const { onChange, value, filter: filterFromProps, ...otherProps } = props

    return {
      onChange: (value: TLookupInputValue, currentOption) => {
        if (isMultiSelect) {
          if (value && value.length) {
            // Обновляем кэш
            dispatch(selectActions.pushItems(currentOption))
          }
        } else {
          if (currentOption) {
            // Обновляем кэш
            dispatch(selectActions.pushItems(currentOption))
          }
        }

        if (onChange) {
          // Обновляем состояние формы
          onChange(value)
        }
      },
      onLoadOptions: (text?: string) =>
        dispatch(
          selectActions.onLoadOptions({
            ...otherProps,
            text,
            filter: Object.assign({}, filterFromConfig, filterFromProps),
          })
        ),
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(SelectBase) as React.FC<
    Partial<ISelectBaseProps> & Pick<ISelectBaseProps, 'value' | 'onChange'>
  >
}
