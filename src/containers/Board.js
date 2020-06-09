import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
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

function Board() {
  const lanes = [
    { id: 1, title: 'To Do' },
    { id: 2, title: 'In Progress' },
    { id: 3, title: 'Review' },
    { id: 4, title: 'Done' },
  ]
  const [data, setData] = useState([])
  const [isLoading, setLoadingStatus] = useState(false)
  const [error, setError] = useState('')

  const fetchDataOnMount = async () => {
    try {
      const tickets = await fetch('../../assets/data.json')
      const ticketsJSON = await tickets.json()

      if (ticketsJSON) {
        setData(ticketsJSON)
        setLoadingStatus(false)
      }
    } catch (e) {
      setLoadingStatus(false)
      setError(e.message)
    }
  }

  useEffect(fetchDataOnMount, [])

  return (
    <BoardWrapper>
      {lanes.map(lane => (
        <Lane
          key={lane.id}
          title={lane.title}
          loading={isLoading}
          error={error}
          tickets={data.filter(ticket => ticket.lane === lane.id)}
        />
      ))}
    </BoardWrapper>
  )
}

export default Board
