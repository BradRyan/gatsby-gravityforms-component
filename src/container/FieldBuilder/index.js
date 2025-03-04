import classnames from 'classnames'
import get from 'lodash/get'
import startCase from 'lodash/startCase'
import React from 'react'

import Captcha from '../../components/Captcha'
import CompoundInputs from '../../components/CompoundInputs'
import Html from '../../components/Html'
import Input from '../../components/Input'
import Multiselect from '../../components/Multiselect'
import Name from '../../components/Name'
import Select from '../../components/Select'
import SelectorList from '../../components/SelectorList'
import Textarea from '../../components/Textarea'
import { filteredKeys } from '../../utils/helpers'
import { ifDefaultValue, islabelHidden } from '../../utils/inputSettings'

const FieldBuilder = ({
    formData,
    presetValues = {},
    register,
    errors,
    setValue,
}) => {
    // TODO: How can we group fields and make them inline?
    // - 'layoutGroupId' is common if fields are inline
    // - want to wrap entire row in <li> with some sort of inline class I suppose?

    // Loop through fields and create
    return formData.formFields.map((field) => {
        // Set the wrapper classes
        const {
            descriptionPlacement: fieldDescPlace,
            isRequired,
            subLabelPlacement: fieldSubLabelPlace,
            visibility,
        } = field

        const descriptionPlacement =
            fieldDescPlace || formData.descriptionPlacement

        const subLabelPlacement =
            fieldSubLabelPlace || formData.subLabelPlacement

        const fieldData = { ...field, descriptionPlacement }
        let inputWrapperClass = classnames(
            'gfield',
            'gravityform__field',
            'gravityform__field__' + field.type,
            'gravityform__field--' + field.size,
            field.cssClass,
            { 'field-required': field.isRequired },
            { 'hidden-label': islabelHidden(field.labelPlacement) },
            { gfield_contains_required: isRequired },
            { [`field_sublabel_${subLabelPlacement}`]: subLabelPlacement },
            `field_description_${descriptionPlacement}`,
            `gfield_visibility_${visibility}`
        )

        const wrapId = `field_${formData.formId}_${field.id}`

        //TODO: Should this match GF version "input_form.id_input.id"
        const inputName = `input_${field.id}`

        let errorKey = ''

        switch (field.type) {
            // Add note for unsupported captcha field
            case 'captcha':
                return (
                    <Captcha
                        captchaTheme={field.captchaTheme}
                        errors={errors[`input_${field.id}`]}
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        register={register}
                        setValue={setValue}
                        wrapClassName={inputWrapperClass}
                    />
                )
            // Start with the standard fields
            case 'text':
            case 'number':
            case 'email':
            case 'hidden':
            case 'phone':
            case 'date':
                return (
                    <Input
                        errors={errors[inputName]}
                        fieldData={fieldData}
                        key={field.id}
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
            case 'textarea':
                return (
                    <Textarea
                        errors={errors[inputName]}
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        register={register}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'select':
                return (
                    <Select
                        errors={errors[inputName]}
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        register={register}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'multiselect':
                return (
                    <Multiselect
                        errors={errors[inputName]}
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        register={register}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'radio':
            case 'checkbox':
                errorKey = filteredKeys(errors, RegExp(`input_${field.id}_`))
                return (
                    <SelectorList
                        errors={
                            errorKey.length > 0 ? errors[errorKey[0]] : null
                        }
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        register={register}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'html':
                return (
                    <Html
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )

            // TODO: Can we support other compound fields with a common component? Perhaps we look for field.inputs?
            // case 'name':
            //     return (
            //         <Name
            //             name={inputName}
            //             errors={errors[inputName]}
            //             register={register}
            //             presetValues={presetValues}
            //             fieldData={fieldData}
            //             key={field.id}
            //             wrapClassName={inputWrapperClass}
            //             wrapId={wrapId}
            //         />
            //     )

            case 'name':
            case 'address':
                return (
                    <CompoundInputs
                        label={startCase(field.type)}
                        type={field.type}
                        name={inputName}
                        errors={errors[inputName]}
                        register={register}
                        presetValues={presetValues}
                        fieldData={fieldData}
                        key={field.id}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )

            default:
                return null
        }
    })
}

export default FieldBuilder
