import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 *
 * @param {React.ReactNode} Component The component you wish to inject data into
 * @return {function({dataSource: string, [p: string]: *}): *}
 */
export const withDataFetching = Component => {
  /**
   *
   * @param {string} dataSource The location of the data source
   * @param {object} props Any props the wrapped component accepts
   * @return {*}
   * @constructor
   */
  const ComponentWithData = ({ dataSource, ...props }) => {
    const [data, setData] = useState([])
    const [isLoading, setLoadingStatus] = useState(false)
    const [error, setError] = useState('')

    const fetchDataOnMount = async () => {
      try {
        const data = await fetch(dataSource)
        const dataJSON = await data.json()

        if (dataJSON) {
          setData(dataJSON)
          setLoadingStatus(false)
        }
      } catch (e) {
        setLoadingStatus(false)
        setError(e.message)
      }
    }
    useEffect(fetchDataOnMount, [])

    return (
      <Component data={data} loading={isLoading} error={error} {...props} />
    )
  }

  ComponentWithData.propTypes = {
    /* The location of the data */
    dataSource: PropTypes.string.isRequired,
  }
  return ComponentWithData
}
