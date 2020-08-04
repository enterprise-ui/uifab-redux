import * as React from 'react'
import styled from 'styled-components'
const { css } = require('styled-components')

export interface ILoaderProps {
  className?: string
  width?: string
  borderwidth?: string
  center?: boolean
}

export const BaseLoader: React.FC<ILoaderProps> = ({ center, ...props }) => {
  return <div {...props} style={{ width: props.width || '40px' }} />
}

export const Loader = styled(BaseLoader)`
  position: relative;
  display: inline-block;
  width: 100%;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
    width: 100%;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: ${({ borderwidth }) => borderwidth || '3px'} solid currentColor;
    border-color: currentColor transparent currentColor transparent;
    animation: lds-dual-ring 1s linear infinite;
  }

  ${props =>
    props.center &&
    css`
      display: block;
      margin: 0 auto;
    `}

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
