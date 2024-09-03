import * as React from 'react'
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog'
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import { useBoolean } from '@fluentui/react-hooks'
import { FinancialHoldingCategory } from '../common/types'
import { HoldingForm } from './holdingForm'
import { getEntityName } from '../common/utils'
import { FormikProps } from 'formik'
import { IObjectHash, Service } from 'pcf-core'
import { useAsync } from 'pcf-components'



const dlgStyles = { main: { width: "493px !important" } };
const modalPropsStyles = { main: { maxWidth: 450 } };

interface HoldingDialogProp {
    oncancel: () => void
    category: FinancialHoldingCategory
    title: string
}


export const HoldingDialog: React.FC<HoldingDialogProp> = (props) => {

    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
    const entityTypeName = getEntityName(props.category)
    const [ isValid, setIsValid ] = React.useState(false)
    const formRef = React.useRef<FormikProps<IObjectHash>>()
    const dialogContentProps = {
        type: DialogType.normal,
        title: props.title,
        // subText: 'Do you want to send this message without a subject?',
    };

    const onSaveValidity = React.useCallback((valid: boolean) => {
        setIsValid(valid)
    }, [])

    // const [execute, pending, value, error] = useAsync(async () => {
    //     const values: any = formRef.current.values

    //     let requestData: any = {
    //         Name: values.new_name,
    //         FinancialHoldingCategory: props.category,
    //         FinancialHoldingType: values.new_financialholdingtype.key,
    //         ContactId: { guid: Service.entity.entityId},

    //         getMetadata: function () {
    //             return {
    //                 boundParameter: null,
    //                 parameterTpes: {
    //                     Name: { typeName: "Edm.String", structuralProperty: 1},
    //                     FinancialHoldingCategory:  { typeName: "Edm.Int32", structuralProperty: 1},
    //                     FinancialHoldingType:  { typeName: "Edm.Int32", structuralProperty: 1},
    //                     ContactId:  { typeName: "Edm.Guid", structuralProperty: 1}
    //                 },
    //                 operationType: 0,
    //                 operationName: "mictslos_CreateFinancialHolding"
    //             }
    //         }
    //     }
    // })

    const saveForm = () => {
        if(formRef.current) {
            console.log(formRef.current.values)
            props.oncancel()
        }
    }
    

    return (
        <>
            <Dialog
                hidden={hideDialog}
                onDismiss={props.oncancel}
                dialogContentProps={dialogContentProps}
                modalProps={{
                    isBlocking: true,
                    styles: modalPropsStyles,
                }}
                maxWidth={493}
                minWidth={288}
                styles={dlgStyles}
            >
                <HoldingForm typename={entityTypeName} formProp={formRef} onsave={onSaveValidity} />
                <DialogFooter>
                    <PrimaryButton onClick={saveForm} text="Save" disabled={!isValid}/>
                    <DefaultButton onClick={props.oncancel} text="Close" />
                </DialogFooter>
            </Dialog>
        </>
    )
}