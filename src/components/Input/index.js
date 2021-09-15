import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import strings from '../../utils/strings'
import InputWrapper from '../InputWrapper'

const Input = ({
    className,
    errors,
    fieldData,
    name,
    register,
    value,
    ...wrapProps
}) => {
    const {
        cssClass,
        inputMaskValue,
        isRequired,
        maxLength: fieldDataMaxLength,
        placeholder,
        size,
        type,
        rangeMax,
        rangeMin,
    } = fieldData
    const regex = inputMaskValue ? new RegExp(inputMaskValue) : false
    const maxLength = rangeMax ? Number(rangeMax) : fieldDataMaxLength || 524288
    const minLength = rangeMin ? Number(rangeMin) : undefined

    const numberProps = {}
    // NOTE: Physically prevent inputing more than max length when provided for number input field
    if (type === 'number' && rangeMax) {
        const inputHandler = (e) => {
            const { value, maxLength } = e.target
            if (String(value).length >= maxLength) {
                e.preventDefault()
                return
            }
        }

        numberProps.onKeyPress = inputHandler
    }

    return (
        <InputWrapper
            errors={errors}
            inputData={fieldData}
            labelFor={name}
            {...wrapProps}
        >
            <input
                aria-invalid={errors}
                aria-required={isRequired}
                className={classnames(
                    'gravityform__field__input',
                    `gravityform__field__input__${type}`,
                    className,
                    cssClass,
                    size
                )}
                defaultValue={value}
                id={name}
                maxLength={maxLength} // 524288 = 512kb, avoids invalid prop type error if maxLength is undefined.
                minLength={minLength}
                {...numberProps}
                name={name}
                placeholder={placeholder}
                ref={register({
                    required: isRequired && strings.errors.required,
                    maxlength: {
                        value: maxLength > 0 && maxLength,
                        message:
                            maxLength > 0 &&
                            `${strings.errors.maxChar.front}  ${maxLength} ${strings.errors.maxChar.back}`,
                    },
                    // TODO: Do we need to register minLength some how?
                    // minLength: {
                    //     value: minLength > 0 && minLength,
                    //     message:
                    //         minLength > 0 &&
                    //         `${strings.errors.minChar.front}  ${minLength} ${strings.errors.minChar.back}`,
                    // },
                    pattern: {
                        value: regex,
                        message: regex && strings.errors.pattern,
                    },
                })}
                type={type === 'phone' ? 'tel' : type}
            />
        </InputWrapper>
    )
}

export default Input

Input.propTypes = {
    errors: PropTypes.object,
    fieldData: PropTypes.shape({
        cssClass: PropTypes.string,
        inputMaskValue: PropTypes.string,
        maxLength: PropTypes.number,
        placeholder: PropTypes.string,
        isRequired: PropTypes.bool,
        type: PropTypes.string,
        size: PropTypes.string,
    }),
    name: PropTypes.string,
    register: PropTypes.func,
    value: PropTypes.string,
    wrapProps: PropTypes.object,
}
