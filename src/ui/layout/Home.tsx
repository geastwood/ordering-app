import * as React from 'react'
import Container from '../presentational/Container'
import FlexContainer from '../presentational/FlexContainer'
import ButtonLink from '../presentational/ButtonLink'
import Button from '../presentational/BlockButton'
import { Typography } from '@material-ui/core'

export default class Home extends React.PureComponent {
  render() {
    return (
      <Container>
        <FlexContainer withPadding justifyContent="space-evenly">
          <div style={{ textAlign: 'center' }}>
            <Typography component="h3" variant="h2">
              <p>下单系统</p>
            </Typography>
          </div>
          <FlexContainer>
            <ButtonLink path="/categories">
              <Button variant="contained" color="primary">
                <p style={{ fontSize: '2rem', color: 'white' }}>分类</p>
              </Button>
            </ButtonLink>
            <ButtonLink path="/products">
              <Button variant="contained" color="primary">
                <p style={{ fontSize: '2rem', color: 'white' }}>产品</p>
              </Button>
            </ButtonLink>
            <ButtonLink path="/order">
              <Button variant="contained" color="primary">
                <p style={{ fontSize: '2rem', color: 'white' }}>下单</p>
              </Button>
            </ButtonLink>
          </FlexContainer>
        </FlexContainer>
      </Container>
    )
  }
}
