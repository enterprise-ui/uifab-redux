import * as React from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'

import { Loader } from './components/Loader'

import { ILabelActions, ILabelDucksParams } from './labelDucks'
import { ILabelProps } from './interfaces/lookup'

const loading = {}

export const createLabel = (params: ILabelDucksParams, labelActions: ILabelActions) => (
  ValueComponent: React.ElementType
) => {
  const { endpointName, type, filter: filterFromConfig } = params

  const Label: React.FC<ILabelProps> = ({
    process,
    value,
    lookupIsExist,
    noLoad,
    lookupItem,
    mod,
    onLoadLookup,
  }) => {
    React.useEffect(() => {
      if (!noLoad && value && onLoadLookup && !lookupIsExist) {
        if (type === 'enum') {
          if (!loading[endpointName]) {
            onLoadLookup()
            loading[endpointName] = true
          }
        } else {
          onLoadLookup()
        }
      }
    }, [lookupIsExist, noLoad, onLoadLookup, value])

    if (process.isLoading && !lookupIsExist) {
      return <Loader width="20px" borderwidth="2px" />
    }
    return <ValueComponent {...lookupItem} mod={mod} />
  }

  const mapStateToProps = (state, { value }) => {
    const lookupItem = get(state, `lookup.${endpointName}.items`, {})[value]

    return {
      lookupIsExist: Boolean(lookupItem),
      lookupItem,
      process: get(state, `lookup.${endpointName}.process`, {}),
    }
  }
  const mapDispatchToProps = (dispatch, props) => {
    const { filter: filterFromProps, ...otherProps } = props

    return {
      onLoadLookup: () =>
        dispatch(
          labelActions.onLoadLookup({
            ...otherProps,
            filter: Object.assign({}, filterFromConfig, filterFromProps),
          })
        ),
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Label)
}
