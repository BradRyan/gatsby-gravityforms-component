import React from 'react'

const Address = () => {
    return (
        <fieldset
            id={wrapId}
            className="gravityform__field--fieldset advanced-field--address"
        >
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

export default Address
