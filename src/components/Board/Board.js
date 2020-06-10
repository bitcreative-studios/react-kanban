import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Lane } from '..'
import { withDataFetching } from '../HOC'

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const BoardMarkup = ({ lanes, loading, error, data }) => {
  const [tickets, setTickets] = useState([])

  const onDragStart = (evt, id) => {
    evt.dataTransfer.setData('id', id)
  }

  const onDragOver = evt => {
    evt.preventDefault()
  }

  const onDrop = (e, laneId) => {
    // ticket id of dragged ticket
    const id = e.dataTransfer.getData('id')
    const _tickets = tickets.filter(ticket => {
      if (ticket.id === parseInt(id)) {
        ticket.lane = laneId
      }
      return ticket
    })
    setTickets(_tickets)
  }

  useEffect(() => {
    setTickets(data)
  }, [data, tickets])

  return (
    <BoardWrapper>
      {lanes.map(lane => (
        <Lane
          key={lane.id}
          laneId={lane.id}
          title={lane.title}
          loading={loading}
          error={error}
          tickets={tickets.filter(ticket => ticket.lane === lane.id)}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </BoardWrapper>
  )
}

export const Board = withDataFetching(BoardMarkup)

Board.propTypes = {
  /* The location of the data */
  dataSource: PropTypes.string.isRequired,

  /* The individual columns of the board */
  lanes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
}
