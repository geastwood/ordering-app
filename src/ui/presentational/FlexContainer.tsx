import * as React from 'react'
import styled from 'styled-components'

export type PropTypes = {
  withPadding?: boolean
  justifyContent: string
}

const FlexContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  flex: 1;
  justify-content: ${(props: PropTypes) => props.justifyContent};
  padding: ${(props: PropTypes) => (props.withPadding ? `8px` : '0px')};
`

class Comp extends React.PureComponent<PropTypes> {
  static defaultProps = { withPadding: false, justifyContent: 'space-evenly' }
  render() {
    return <FlexContainer {...this.props}>{this.props.children}</FlexContainer>
  }
}

export default Comp
