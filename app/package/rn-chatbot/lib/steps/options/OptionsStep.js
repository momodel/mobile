import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Option from './Option'
import OptionElement from './OptionElement'
import OptionText from './OptionText'
import Options from './Options'


import { NavigationActions } from '../../../../../utils'
import { connect } from 'react-redux'

@connect(({ app }) => ({ ...app }))
class OptionsStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props)

    this.renderOption = this.renderOption.bind(this)
    this.onOptionClick = this.onOptionClick.bind(this)
  }

  onOptionClick({ value, trigger }) {
    this.props.triggerNextStep({ value, trigger })
  }

  onCustomClick(route){
    this.props.dispatch(NavigationActions.navigate({ routeName: route }))
  }

  renderOption(option) {
    const { bubbleStyle } = this.props
    const { bubbleColor, fontColor } = this.props.step
    const { value, label, route, backgroundColor, trigger } = option

    return (
      <Option
        key={value}
        className="rsc-os-option"
        onPress={() => route?this.onCustomClick(route):this.onOptionClick({ value, trigger })}
      >
        <OptionElement
          className="rsc-os-option-element"
          // style={{bubbleStyle}}
          bubbleColor={bubbleColor}
          borderColor={option.borderColor?option.borderColor:"white"}
          backgroundColor={backgroundColor?option.backgroundColor:"#F9F9F9"}
        >
          <OptionText class="rsc-os-option-text" fontColor={option.borderColor?option.borderColor:fontColor}

          >
            {label}
          </OptionText>
        </OptionElement>
      </Option>
    )
  }

  // renderCustomOption(option) {
  //   const { bubbleStyle } = this.props
  //   const { bubbleColor, fontColor } = this.props.step
  //   const { value, label } = option
  //
  //   return (
  //     <Option
  //       key={value}
  //       className="rsc-os-option"
  //       onPress={() => this.onOptionClick({ value })}
  //     >
  //       <OptionElement
  //         className="rsc-os-option-element"
  //         style={bubbleStyle}
  //         bubbleColor={bubbleColor}
  //         borderColor={option.borderColor}
  //       >
  //         <OptionText class="rsc-os-option-text" fontColor={fontColor}>
  //           {label}
  //         </OptionText>
  //       </OptionElement>
  //     </Option>
  //   )
  // }





  render() {
    const { options } = this.props.step

    return (
      <Options className="rsc-os" style={{backgroundColor: "white"}}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          {_.map(options, this.renderOption)}

        </ScrollView>
      </Options>
    )
  }
}

OptionsStep.propTypes = {
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  bubbleStyle: PropTypes.object.isRequired,
}

OptionsStep.defaultProps = {
  // bubbleStyle: {backgroundColor:"gray"}
}

export default OptionsStep
