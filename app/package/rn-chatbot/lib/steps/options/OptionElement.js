import styled from 'styled-components/native'

const OptionElement = styled.View`
  background-color: ${props => props.bubbleColor};
  padding-top: 12;
  padding-right: 12;
  padding-bottom: 12;
  padding-left: 12;
  border-radius: 22;
  border-width: 0.5;
  
`

export default OptionElement

// ${props => props.borderColor?1:1};

// return props.borderColor?props.borderColor:"white"
/*
border-color: ${props => {
  console.log("props", props)
  return "white"

  }};

 */
