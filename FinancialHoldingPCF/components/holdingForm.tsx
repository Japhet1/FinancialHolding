import { Stack, StackItem } from '@fluentui/react'
import { Form, Formik, FormikProps } from 'formik'
import { FieldDropdown, FieldText, FormikValidityObserver } from 'pcf-components/lib/formikInputs'
import * as React from 'react'
import * as Yup from 'yup'
import { getOptionSet, IChoice, IObjectHash } from 'pcf-core'
import { FinancialHoldingCategory } from '../common/types'
import { IDropdownStyles, IDropdownOption } from "@fluentui/react/lib/Dropdown";

interface HoldingFormProp {
    typename: string
    onsave: (valid: boolean) => void
    formProp: React.MutableRefObject<FormikProps<IObjectHash>>
}

export const HoldingForm: React.FC<HoldingFormProp> = (props) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const type = React.useRef<IDropdownOption<any>[]>()

    React.useEffect(() => {
        const getFn = async () => {
            const types = await getOptionSet(props.typename, 'new_financialholdingtype')
            type.current = types
            console.log(type.current)
        }
        getFn()
    })


    // console.log(type)


    return (
        <>
            <Formik 
                initialValues={{
                    new_name: null,
                    new_financialholdingtype:  null
                }}
                validationSchema={Yup.object().shape({
                    new_name: Yup.string().required('Required'),
                    new_financialholdingtype: Yup.object().required('Required'),
                })}
                innerRef={props.formProp}
                validateOnMount={true}
                enableReinitialize={true}
                onSubmit={() => {}}
                // onSubmit={(values, actions) => {
                //     console.log( values );
                //     actions.resetForm()
                //     // console.log(JSON.stringify(values, null, 2));
                //     actions.setSubmitting(true);
                // }}
                component={({ values, errors, touched, ...formprops}) => (
                    <Form>
                        <Stack>
                            <StackItem>
                                <FieldText 
                                    name='new_name'
                                    label='Name'
                                    maxLength={100}
                                    required
                                />
                            </StackItem>
                            <StackItem>
                                <FieldDropdown 
                                    name='new_financialholdingtype'
                                    label='Type'
                                    options={type.current}
                                    required
                                />
                            </StackItem>
                        </Stack>
                        <FormikValidityObserver callback={props.onsave} />
                        {/* <button type='submit'>submit</button> */}
                    </Form>
                    
                )}
            
            />
        </>
    )
}