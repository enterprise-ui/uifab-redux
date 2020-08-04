import * as React from 'react'
import { OrderStatusesSelect } from './OrderStatuses'

export default {
  title: 'Select',
  parameters: {
    info: { inline: true },
  },
}

export const Select = () => {
  const [value, setValue] = React.useState<string | string[] | null | undefined>()

  return <OrderStatusesSelect name="status" value={value} onChange={(value) => setValue(value)} />
}
