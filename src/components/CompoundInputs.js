import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'

import Input from './Input'
import { ifDefaultValue } from '../utils/inputSettings'

const CompoundInputs = ({
    type,
    label,
    errors = [],
    fieldData,
    name,
    register,
    value,
    presetValues,
    wrapId,
    ...wrapProps
}) => {
    const { inputs, isRequired } = fieldData

    return (
        <fieldset
            id={wrapId}
            className={`gravityform__field--fieldset advanced-field--${type}`}
        >
            <label className="gravityform__label gfield_label" htmlFor={wrapId}>
                {label}
                {isRequired && <span className="gfield_required">*</span>}
            </label>

            {inputs.map((input) => {
                if (input.isHidden) return null
                const inputName = `input_${input.id}`
                const inputError = errors.find(
                    (error) => error?.ref?.id === inputName
                )

                const isFieldRequired = (() => {
                    if (
                        type === 'address' &&
                        input.autocompleteAttribute === 'address-line2'
                    ) {
                        return false
                    }
                    return true
                })()

                // TODO: figure out how to allow grouping. Maybe via a prop?

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
                        {...wrapProps}
                    />
                )
            })}
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
