import * as React from 'react'

import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import FlexContainer from '../presentational/FlexContainer'

const Container = styled.div`
  height: 4rem;
  background-color: #ececec;
  display: flex;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
type PropTypes = RouteComponentProps<{}> & {
  children: React.ReactNode
  title: string
  onBackClick: any
  rightAction: any
}

class SimpleNavigation extends React.PureComponent<PropTypes> {
  render() {
    const { title, history, rightAction } = this.props
    return (
      <FlexContainer>
        <Container>
          <ButtonContainer>
            <BackIcon
              onClick={
                this.props.onBackClick
                  ? () => this.props.onBackClick(history)
                  : () => history.goBack()
              }
            />
          </ButtonContainer>
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography component="h4" variant="h5">
              {title}
            </Typography>
          </div>
          <ButtonContainer>
            {rightAction ? rightAction(this.props) : null}
          </ButtonContainer>
        </Container>

        <FlexContainer withPadding justifyContent="flex-start">
          {this.props.children}
        </FlexContainer>
      </FlexContainer>
    )
  }
}

const ConnectedSimpleNavigation = withRouter(SimpleNavigation)

export default ConnectedSimpleNavigation
