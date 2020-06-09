import React from 'react'
import path from 'path'
import styled, { createGlobalStyle } from 'styled-components'

import { Header, Board, Tickets } from './components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const AppWrapper = styled.div`
  text-align: center;
`

const TicketsWrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  //grid-gap: 1rem;
  margin: 5%;

  @media (max-width: 768px) {
    //flex-direction: column;
  }
`

const App = () => {
  const lanes = [
    { id: 1, title: 'To Do' },
    { id: 2, title: 'In Progress' },
    { id: 3, title: 'Review' },
    { id: 4, title: 'Done' },
  ]
  const dataURL = path.resolve(__dirname, '..', '..', 'assets', 'data.json')

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <Board dataSource={dataURL} lanes={lanes} />
      </AppWrapper>
    </>
  )
}

export default App
