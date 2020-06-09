import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import withDataFetching from '../components/withDataFetching'
import Lane from '../components/Lane/Lane'

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Board = ({ lanes, loading, error, data }) => (
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

const BoardWithData = withDataFetching(Board)

BoardWithData.propTypes = {
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

export default BoardWithData
