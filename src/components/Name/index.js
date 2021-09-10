import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Input from '../Input'

const Name = ({
    errors,
    fieldData,
    name,
    register,
    value,
    presetValues,
    ...wrapProps
}) => {
    const { inputs } = fieldData

    return (
        <div>
            {inputs.map((input) => {
                if (input.isHidden) return null
                const inputName = `input_${field.id}`

                return (
                    <Input
                        errors={errors[inputName]}
                        fieldData={fieldData}
                        key={input.id}
                        name={inputName}
                        register={register}
                        value={
                            get(presetValues, inputName, false)
                                ? get(presetValues, inputName, false)
                                : ifDefaultValue(field)
                        }
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            })}
        </div>
    )
}

export default Name

Name.propTypes = {
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
