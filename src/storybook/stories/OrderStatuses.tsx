import * as React from 'react'
import {
  createLabel,
  labelDucks,
  createSelect,
  selectDucks,
  ILookupConfig,
  ELabelType,
} from '../../lookup'

export interface IOrderStatusesValueProps {
  value_i18n?: string
}

export const OrderStatusesValue: React.FC<IOrderStatusesValueProps> = (props) => {
  const { value_i18n } = props
  return <>{value_i18n}</>
}

const initConfig: ILookupConfig = {
  endpointName: 'orderStatuses',
  type: ELabelType.enum,
  label: 'Статус заказа',
}

export const { labelConfig, labelActions: orderStatusesActions } = labelDucks(initConfig)
export const OrderStatusesLabel = createLabel(labelConfig, orderStatusesActions)(OrderStatusesValue)

export const { selectConfig, selectActions } = selectDucks(initConfig)
export const OrderStatusesSelect = createSelect(selectConfig, selectActions)(OrderStatusesValue)
