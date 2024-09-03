import { FinancialHoldingCategory } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNumber = (value: any) => {
    return +value || 0;
}


export const displayNameIndex = (columnName: string, alias?: string) => {
    const prefix = alias ? `${alias}.` : "";
    return `${prefix}${columnName}@OData.Community.Display.V1.FormattedValue`
}

export const getIconName = (category: FinancialHoldingCategory) => {
    switch (category) {
        case FinancialHoldingCategory.Accounts:
            return "AccountBrowser"
        case FinancialHoldingCategory.Investments:
            return "BarChartVertical"
        case FinancialHoldingCategory.Loans:
            return "Money"
        case FinancialHoldingCategory.LongTermSavings:
            return "Savings"
        case FinancialHoldingCategory.LinesOfCredit:
            return "PaymentCard"
        default:
            return "CubeShape"
    }
}

export const getEntityName = (category: FinancialHoldingCategory) => {
    switch (category) {
        case FinancialHoldingCategory.Investments:
            return 'new_fhinvestment';
        case FinancialHoldingCategory.Accounts:
            return 'new_fhaccount';
        case FinancialHoldingCategory.Loans:
            return 'new_fhloan';
        case FinancialHoldingCategory.LongTermSavings:
            return 'new_fhlongtermsaving';
        case FinancialHoldingCategory.LinesOfCredit:
            return 'new_fhlineofcredit';
    }
}