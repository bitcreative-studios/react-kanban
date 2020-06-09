import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Ticket } from '../index'
import { withDataFetching } from '../HOC'

const Alert = styled.div`
  text-align: center;
`
const TicketsMarkup = ({ loading, data, error }) => {
  return (
    <>
      {(loading || error) && <Alert>{loading ? 'Loading ...' : error}</Alert>}
      {data.map(ticket => (
        <Ticket key={ticket.id} ticket={ticket} />
      ))}
    </>
  )
}

export const Tickets = withDataFetching(TicketsMarkup)

Tickets.propTypes = {
  dataSource: PropTypes.string.isRequired,
}
