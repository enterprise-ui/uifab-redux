import * as React from 'react'
import { IStyleMods } from './SelectStyles'

export interface ISelectContext {
  value?: string | string[] | null
  placeholder?: string
  isLoading?: boolean
  isMultiSelect?: boolean
  styleMods: IStyleMods
  onOptionSelect(value: string): void
  onBadgeRemove(value: string): void
  setInputElement: React.Ref<HTMLInputElement>
}

export const selectContextInitValue: ISelectContext = {
  value: undefined,
  placeholder: 'Placeholder',
  isLoading: false,
  isMultiSelect: false,
  styleMods: {} as IStyleMods,
  onOptionSelect: () => {},
  onBadgeRemove: () => {},
  setInputElement: () => {},
}

export const SelectContext = React.createContext(selectContextInitValue)
