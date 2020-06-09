import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 *
 * @param Component
 * @return {function({dataSource?: *}): *}
 */
const withDataFetching = Component => {
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

export default withDataFetching
