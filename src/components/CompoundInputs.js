import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import classnames from 'classnames'

import Input from './Input'
import { ifDefaultValue } from '../utils/inputSettings'

const INPUT_LENGTH_CLASS_BY_TYPE = {
    address: {
        'address-line1': 'ginput_full', // street address
        'address-line2': 'ginput_full',
        'address-level2': 'ginput_left', // city
        'address-level1': 'ginput_right', // state
        'postal-code': 'ginput_left',
        'country-name': 'ginput_right',
    },
    name: {
        'given-name': 'ginput_left', // first name
        'family-name': 'ginput_right', // last name
    },
}

const CompoundInputs = ({
    type,
    label,
    groups,
    errors = [],
    fieldData,
    name,
    register,
    value,
    presetValues,
    wrapId,
    wrapClassName,
    ...wrapProps
}) => {
    const { inputs, isRequired } = fieldData
    const inputClassByAttribute = INPUT_LENGTH_CLASS_BY_TYPE[type]

    return (
        <fieldset
            id={wrapId}
            className={`gravityform__field--fieldset advanced-field--${type}`}
        >
            <legend className="gravityform__label gfield_label">
                {label}
                {isRequired && <span className="gfield_required">*</span>}
            </legend>

            <div className="ginput_complex ginput_container">
                {inputs.map((input, index) => {
                    if (input.isHidden) return null
                    const inputName = `input_${input.id}`
                    const inputError = errors.find(
                        (error) => error?.ref?.id === inputName
                    )

                    console.log({
                        class: inputClassByAttribute[
                            input.autocompleteAttribute
                        ],
                        classes: inputClassByAttribute,
                    })

                    const isFieldRequired = (() => {
                        if (
                            type === 'address' &&
                            input.autocompleteAttribute === 'address-line2'
                        ) {
                            return false
                        }
                        return true
                    })()

                    return (
                        <Input
                            className={input.autocompleteAttribute}
                            errors={inputError}
                            fieldData={{
                                ...fieldData,
                                label: input.label,
                                type: 'text',
                                isRequired: isFieldRequired,
                            }}
                            key={input.id}
                            name={inputName}
                            register={register}
                            value={
                                get(presetValues, inputName, false)
                                    ? get(presetValues, inputName, false)
                                    : ifDefaultValue(input)
                            }
                            wrapId={`${wrapId}_${input.id}`}
                            wrapClassName={classnames(
                                wrapClassName,
                                inputClassByAttribute[
                                    input.autocompleteAttribute
                                ]
                            )}
                            {...wrapProps}
                        />
                    )
                })}
            </div>
        </fieldset>
    )
}

export default CompoundInputs

CompoundInputs.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.shape()),
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
