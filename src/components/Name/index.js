import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'

import Input from '../Input'
import { ifDefaultValue } from '../../utils/inputSettings'

const Name = ({
    errors = [],
    fieldData,
    name,
    register,
    value,
    presetValues,
    wrapId,
    ...wrapProps
}) => {
    const { inputs } = fieldData

    return (
        <fieldset id={wrapId} className="gravityform__field--fieldset">
            {inputs.map((input) => {
                if (input.isHidden) return null
                const inputName = `input_${input.id}`
                const inputError = errors.find(
                    (error) => error?.ref?.id === inputName
                )

                return (
                    <Input
                        errors={inputError}
                        fieldData={{
                            ...fieldData,
                            label: input.label,
                            type: 'text',
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

export default Name

Name.propTypes = {
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
