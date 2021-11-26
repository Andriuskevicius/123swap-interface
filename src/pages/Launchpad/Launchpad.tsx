import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, Text } from '@123swap/uikit'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'

import Table from './components/LaunchpadTable/FarmTable'
import { RowProps } from './components/LaunchpadTable/Row'
import { DesktopColumnSchema, ViewMode } from './components/types'
import {launchpadConfig} from "./config";

const Header = styled.div`
  padding: 32px 0px;
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  text-align: center;
  
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const Launchpad: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const [viewMode, setViewMode] = useState(ViewMode.TABLE)
  const { account } = useWeb3React()


  const rowData = launchpadConfig.map((project) => {
    const row: RowProps = {
      name: {
        value: project.name,
        icon: project.icon
      },
      start_date: {
        value: project.start_date
      },
      end_date: {
        value: project.end_date
      },
      price: {
        value: `${project.price.toString()} $`
      },
      max: {
        value: project.max
      },
      details: {
        value: project.id.toString()
      },
    }

    return row
  })

  const renderContent = (): JSX.Element => {
      const columnSchema = DesktopColumnSchema
      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
      }))

      return <Table data={rowData} columns={columns} />

  }

  return (
    <>
      <Header>
        <Heading as="h1" size="xxl" color="secondary" mb="24px">
          {TranslateString(674, 'Launchpad')}
        </Heading>
         <Heading size="md" color="text">
           {TranslateString(999, 'Best upcoming projects!')}
         </Heading>
      </Header>
      <div>
        {renderContent()}
      </div>
    </>
  )
}

export default Launchpad
