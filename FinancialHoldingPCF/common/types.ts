export interface Dictionary<T> {
    [key: string]: T
}

export enum FinancialHoldingRole {
    Owner = 1
}

export enum FinancialHoldingCategory {
    Accounts = 1,
    Investments = 2,
    Loans = 3,
    LongTermSavings = 4,
    LinesOfCredit = 5
}

export interface ICurrency {
    code: string;
    symbol: string
}

export enum AccountClassification {
    assets = 1,
    liabilities = 2
}