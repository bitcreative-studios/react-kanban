import React from 'react'
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

const BoardMarkup = ({ lanes, loading, error, data }) => (
  <BoardWrapper>
    {lanes.map(lane => (
      <Lane
        key={lane.id}
        title={lane.title}
        loading={loading}
        error={error}
        tickets={data.filter(ticket => ticket.lane === lane.id)}
      />
    ))}
  </BoardWrapper>
)

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
