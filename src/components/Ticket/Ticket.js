import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const TicketWrapper = styled.div`
  background: darkgray;
  padding: 20px;
  border-radius: 20px;

  &:not(:last-child) {
    margin-bottom: 5%;
  }
`

const Title = styled.h3`
  width: 100%;
  margin: 0;
`

const Body = styled.p`
  width: 100%;
`
const Ticket = ({ ticket }) => {
  return (
    <TicketWrapper>
      <Title>{ticket.title}</Title>
      <Body>{ticket.body}</Body>
    </TicketWrapper>
  )
}

Ticket.propTypes = {}

export default Ticket
