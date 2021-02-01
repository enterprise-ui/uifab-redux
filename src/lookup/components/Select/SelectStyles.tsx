import * as React from 'react'
import styled from 'styled-components'
import ClearIcon from '../../../icons/closeIcon.svg'
import ArrowButtonIcon from '../../../icons/arrow.svg'
import { Loader } from '../Loader'
const { css } = require('styled-components')

const top = '20px'
const easeOutCubic = 'cubic-bezier(0.215, 0.61, 0.355, 1)'

export interface IStyleMods {
  disabled?: boolean
  isShowOptions: boolean
  isError?: boolean
  isValue: boolean
  isFocus?: boolean
  isLabel: boolean
  noUnderline?: boolean
  isExtendable?: boolean
  isReadOnly?: boolean
  mod?: string
}

export const SelectStyled = styled.div<IStyleMods>`
  width: 100%;
  display: block;
  position: relative;
  font-size: 16px;
  line-height: 18px;
  padding-bottom: ${({ mod }) => (mod === 'simpleStyle' ? '0px' : '3px')};
  border-bottom: ${({ mod, isReadOnly, theme }) =>
    !(mod === 'simpleStyle') ? ` 1px solid ${isReadOnly ? '#949494' : theme.textColor}` : ''};

  transition: opacity ${(props) => props.theme.duration};
  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &:before {
    content: '';
    display: none;
    position: absolute;
    top: -11px;
    left: -11px;
    right: -11px;
    bottom: -5px;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid ${(props) => props.theme.secondaryColor};
    border-width: 1px 1px 0 1px;

    ${(props) =>
      props.isShowOptions &&
      css`
        display: block;
      `}
  }
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ isError, noUnderline, theme }) =>
      isError && !noUnderline ? theme.errorColor : theme.textColor};
    transform: ${({ isShowOptions, isError, noUnderline }) =>
      (isError && !noUnderline) || (isShowOptions && !noUnderline) ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: 0 0;
    transition: transform ${({ theme }) => theme.duration} ${easeOutCubic};
    transition-duration: 0s;
  }

  ${({ noUnderline }) =>
    noUnderline &&
    css`
      padding-bottom: 0;
      border-bottom: 1px solid transparent;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}

  ${({ isShowOptions, isValue, isFocus }) =>
    (isShowOptions || isValue || isFocus) &&
    css`
      ${Label} {
        transform: translateY(-${top}) scale(0.75) translateZ(0);
        overflow: hidden;
        text-overflow: auto;
      }
    `}
`
export const SelectControlBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding-left: 10px;
`

export interface ISelectClearButtonIcon {
  onClick?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void
}

export const SelectClearButtonIcon = styled(ClearIcon)<ISelectClearButtonIcon>`
  cursor: pointer;
  width: 30px;
  fill: #365034;
  margin-right: 5px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}rem) {
    width: 18px;
  }
`

export interface ISelectArrowButtonIcon {
  isShowOptions?: boolean
}

export const SelectArrowButtonIcon = styled(
  ({ isShowOptions, ...props }: ISelectArrowButtonIcon) => <ArrowButtonIcon {...props} />
)`
  cursor: pointer;
  width: 15px;
  height: 15px;
  fill: #000;
  transform: ${({ isShowOptions }) => (isShowOptions ? 'scaleY(-1)' : '')};
`

export const SelectLoader = styled(Loader)`
  margin: 0px 10px 0px 0px;
`

interface IInner extends IStyleMods {}
export const Inner = styled.div<IInner>`
  position: relative;
  display: flex;
  align-items: flex-end;
  outline: none;
  font-size: ${({ mod }) => (mod === 'simpleStyle' ? '20px' : '16px')};
  line-height: 18px;
  padding-top: ${({ isLabel, mod }) => (isLabel && !(mod === 'simpleStyle') ? top : '5px')};
  margin-bottom: ${({ isExtendable, isError }) => (isExtendable && isError ? '18px' : 0)};

  ${({ isExtendable }) =>
    isExtendable &&
    css`
      &:before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
      }
    `}
`
export const ValueWrapper = styled.div<IStyleMods>`
  position: relative;
  flex-grow: 1;
  min-height: 18px;
  display: block;
  width: 100%;
  outline: none;
  background: transparent;
  border: none;
  color: ${({ mod, theme }) => (mod === 'simpleStyle' ? theme.accentTextColor : theme.textColor)};
`

export const OptionsWrapper = styled.div`
  position: absolute;
  top: calc(100% + 3px);
  left: -11px;
  width: calc(100% + 22px);
  background-color: #fff;
  z-index: 2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid ${(props) => props.theme.secondaryColor};
  border-width: 0 1px 1px 1px;
  max-height: 200px;
  overflow: hidden;
  margin-bottom: 20px;
`
interface ILabelProps {
  isValue?: boolean
  asterix?: boolean
}
export const Label = styled.span<ILabelProps>`
  position: absolute;
  left: 0;
  top: 0;
  padding: 0;
  width: ${({ isValue }) => (isValue ? 'calc(100% + 60vw)' : '100%')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.textColor};
  pointer-events: none;
  transform: translateZ(0);
  transform-origin: 0 0;
  user-select: none;
  cursor: text;
  color: #949494;
  transition: transform ${({ theme }) => theme.faster} ${easeOutCubic},
    color ${({ theme }) => theme.faster} ${easeOutCubic},
    font-size ${({ theme }) => theme.faster} ${easeOutCubic};

  ${({ asterix }) =>
    asterix &&
    css`
      &:after {
        content: '*';
        color: red;
        margin-left: 10px;
      }
    `}
`
export const Placeholder = styled.span`
  color: #949494;
  top: 25px;
`

export const StyledSelectErrors = styled.span`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  color: red;
  font-size: 10px;
`

export const StyledSelectButton = styled.button`
  position: absolute;
  top: 0;
  right: 40px;
  background-color: #e3e3e3;
  padding: 1px 6px;

  &:hover {
    opacity: 0.5;
  }
`
