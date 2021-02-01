import * as React from 'react'
import { StyledSelectErrors } from './SelectStyles'

interface ISelectErrorsProps {}
/**
 * Вывод ошибок валидации.
 */
export class SelectErrors extends React.Component<ISelectErrorsProps, {}> {
  public static displayName = 'SelectErrors'

  render() {
    return <StyledSelectErrors {...this.props}>{this.props.children}</StyledSelectErrors>
  }
}
