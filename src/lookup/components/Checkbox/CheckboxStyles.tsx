import styled from 'styled-components'

import CheckIcon from '../../../icons/check.svg'
import { IStyleMods } from './Checkbox'

const { css } = require('styled-components')

export const Icon = styled.i`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  border: 2px solid ${({ theme }) => theme.textColor};
  transition: border-color ${({ theme }) => theme.duration},
    background-color ${({ theme }) => theme.duration};
`

export const StyledCheckbox = styled.label<IStyleMods>`
  position: relative;
  align-items: center;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    ${Icon} {
      transition-duration: ${({ theme }) => theme.faster};
      border-color: ${({ theme }) => theme.activeColor};
    }
  }

  ${({ isChecked }) =>
    isChecked &&
    css`
      ${Icon} {
        transition-duration: ${({ theme }) => theme.faster};
        border-color: ${({ theme }) => theme.activeColor};
        background-color: ${({ theme }) => theme.activeColor};
      }
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      transition-duration: ${({ theme }) => theme.faster};

      ${Icon} {
        transition-duration: ${({ theme }) => theme.faster};
      }
    `}
  ${({ isChecked, disabled }) =>
    (isChecked || disabled) &&
    css`
      ${StyledCheckIcon} {
        transition-duration: ${({ theme }) => theme.faster};
        opacity: 1;
      }
    `}
`

interface IError {
  isExtendable?: boolean
}
export const Error = styled.span<IError>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  color: red;
  font-size: 10px;
  line-height: 12px;
`
export const WrapperValue = styled.div`
  display: inline-flex;
  align-items: center;
`

export const Field = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  top: 0;
  left: -10000px;
`

export const StyledCheckIcon = styled(CheckIcon)`
  display: block;
  opacity: 0;
  width: 14px;
  transition: opacity ${({ theme }) => theme.duration};
  fill: #fff;
`
interface ILabel {
  asterix?: boolean
}
export const Label = styled.span<ILabel>`
  font-size: 12px;
  margin-left: 6px;

  ${({ asterix }) =>
    asterix &&
    css`
      &:after {
        content: '*';
        color: red;
        margin-left: 5px;
      }
    `}
`
