import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import strings from '../../utils/strings'
import InputWrapper from '../InputWrapper'

// TODO: Enable Select All Choice
const SelectorList = ({ errors, fieldData, name, register, ...wrapProps }) => {
    const { choices, cssClass, isRequired, size, type } = fieldData
    const options = JSON.parse(choices)
    return (
        <InputWrapper
            errors={errors}
            inputData={fieldData}
            labelFor={name}
            {...wrapProps}
        >
            <ul className={`gfield_${type}`} id={name}>
                {options.map(({ isSelected, text, value }, index) => {
                    const choiceNumber = index + 1
                    const choiceId = `${name}-${choiceNumber}`
                    
                    // For radio, the name should be the same for all selctions
                    const choiceName = type === 'radio' ? name : choiceId

                    return (
                        <li key={choiceId}>
                            <input
                                className={classnames(
                                    `gravityform__field__input__${type}`,
                                    `gravityform__field__input__${type}--${choiceNumber}`,
                                    cssClass,
                                    size
                                )}
                                defaultChecked={isSelected}
                                id={choiceId}
                                name={choiceName}
                                ref={register({
                                    required:
                                        isRequired && strings.errors.required,
                                })}
                                type={type}
                                value={value}
                            />
                            &nbsp;
                            <label htmlFor={choiceId}>
                                {ReactHtmlParser(text)}
                            </label>
                        </li>
                    )
                })}
            </ul>
        </InputWrapper>
    )
}

export default SelectorList

SelectorList.propTypes = {
    errors: PropTypes.object,
    fieldData: PropTypes.shape({
        choices: PropTypes.string,
        cssClass: PropTypes.string,
        id: PropTypes.number,
        isRequired: PropTypes.bool,
        size: PropTypes.string,
        type: PropTypes.string,
    }),
    name: PropTypes.string,
    register: PropTypes.func,
    wrapProps: PropTypes.object,
}
