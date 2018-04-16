import {Platform} from 'react-native';

import styled from 'styled-components/native'

const OptionElement = styled.View`
  background-color: ${props => props.bubbleColor};
  padding-top: 10;
  padding-right: 12;
  padding-bottom: 10;
  padding-left: 12;
  border-radius: 22;
  border-width: ${Platform.OS === 'ios'?0.5: 1};
  
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
