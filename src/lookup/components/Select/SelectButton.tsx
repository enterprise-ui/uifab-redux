import * as React from 'react'
import { StyledSelectButton } from './SelectStyles'

interface ISelectButtonProps {
  /** Обработчик клика по кнопке. */
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void
}
/**
 * Кнопка на поле.
 */
export class SelectButton extends React.Component<ISelectButtonProps, {}> {
  public static displayName = 'SelectButton'

  render() {
    return (
      <StyledSelectButton type="button" {...this.props}>
        {this.props.children}
      </StyledSelectButton>
    )
  }
}
