import { Service } from "pcf-core";
import { AccountClassification, Dictionary, FinancialHoldingCategory, FinancialHoldingRole } from "./types";
import { allAttributes, attributes, choiceColumn, fetchxml, filterAnd, linkEntity, linkEntitySimple, LinkType, lookupColumn } from "fetchxml4js"
import { groupBy } from "lodash-es"
import { toNumber } from "./utils";
import { IGroup } from "@fluentui/react";


export class CustomerFinancialHolding {
    public holdings: Dictionary<ComponentFramework.WebApi.Entity[]>;
    public totalAssets: number = 0
    public totalLiabilities: number = 0

    protected getFetchXml(contactid: string) {
        return fetchxml({ entity: "new_fhcontactfinancialholding"},
            attributes("new_financialholdingrole", "new_contact"),
            filterAnd(lookupColumn('new_contact').idEqualTo(contactid), choiceColumn('statecode').equalTo(0), choiceColumn('new_financialholdingrole').equalTo(FinancialHoldingRole.Owner)),
            linkEntitySimple("new_financialholding", LinkType.LEFT, "new_financialholdingid", "new_financialholding", "FH",
                attributes("new_financialholdingcategory", "new_accountingclassification"),
                linkEntitySimple("new_fhaccount", LinkType.LEFT, "new_fhaccountid", "new_details", "FH_ACCOUNT",
                    allAttributes(),
                    filterAnd(choiceColumn('statecode').equalTo(0))
                ),
                linkEntitySimple("new_fhinvestment", LinkType.LEFT, "new_fhinvestmentid", "new_details", "FH_INV",
                    allAttributes(),
                    filterAnd(choiceColumn('statecode').equalTo(0))
                ),
                linkEntitySimple("new_fhloan", LinkType.LEFT, "new_fhloanid", "new_details", "FH_LOAN",
                    allAttributes(),
                    filterAnd(choiceColumn('statecode').equalTo(0))
                ),
                linkEntitySimple("new_fhlongtermsaving", LinkType.LEFT, "new_fhlongtermsavingid", "new_details", "FH_LTS",
                    allAttributes(),
                    filterAnd(choiceColumn('statecode').equalTo(0))
                ),
                linkEntitySimple("new_fhlineofcredit", LinkType.LEFT, "new_fhlineofcreditid", "new_details", "FH_LOC",
                    allAttributes(),
                    filterAnd(choiceColumn('statecode').equalTo(0))
                ),

            )
        )
    }

    public async load(contactid: string) {
        const fetchXml = this.getFetchXml(contactid)
        const response = await Service.webApi.retrieveMultipleRecords("new_fhcontactfinancialholding", `?fetchXml=${encodeURI(fetchXml)}`)
        // console.log(response.entities)
        const grouped1 = groupBy(response.entities, (item) => {
            return item["FH.new_financialholdingcategory@OData.Community.Display.V1.FormattedValue"]
        })

        console.log("Group base on category", grouped1)

        this.holdings = Object.keys(grouped1).sort().reduce((accu, cur) => {
            accu[cur] = grouped1[cur]
            return accu
        }, {} as Dictionary<ComponentFramework.WebApi.Entity[]>)

        console.log("holdings", this.holdings)

        const grouped2 = groupBy(response.entities, (item) => {
            if(item["FH.new_accountingclassification"] == AccountClassification.assets) {
                return "assets"
            } 
            return "liabilities"
        })

        console.log("All assets", grouped2.assets)
        console.log("All liabilities", grouped2.liabilities)

        this.totalAssets = grouped2.assets ? grouped2.assets.reduce((accu, cur) => {
            return accu + (toNumber(cur["FH_Account.new_balance_base"]) || toNumber(cur["FH_INVESTMENT.new_balance_base"]) || toNumber(cur["FH_LTSAVINGS.new_balance_base"]));
        }, 0) : 0

        console.log("Total assets", this.totalAssets)

        this.totalLiabilities = grouped2.liabilities ? grouped2.liabilities.reduce((accu, cur) => {
            return accu + (toNumber(cur["FH_LOAN.new_balance_base"]) || toNumber(cur["FH_LOC.new_balance_base"]));
        }, 0) : 0 
        console.log("Total assets", this.totalLiabilities)
    }

    public getIconName(category: FinancialHoldingCategory) {
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

    public getAlias(category: FinancialHoldingCategory) {
        switch (category) {
            case FinancialHoldingCategory.Accounts:
                return "FH_ACCOUNT"
            case FinancialHoldingCategory.Investments:
                return "FH_INV"
            case FinancialHoldingCategory.Loans: 
                return "FH_LOAN"
            case FinancialHoldingCategory.LongTermSavings:
                return "FH_LTS"
            case FinancialHoldingCategory.LinesOfCredit:
                return "FH_LOC"
            default: 
                return ""
        }
    }

   
    public getGroupDetailedListData(): [IGroup[], ComponentFramework.WebApi.Entity[]] {
        let startIndex = 0;
        const group: IGroup[] = Object.keys(this.holdings).map(key => {
            const count = this.holdings[key].length;
            const i = {
                key,
                name: key,
                startIndex,
                count,
                level: 0,
                data: {
                    iconName: this.getIconName(this.holdings[key][0]['FH.new_financialholdingcategory'] as FinancialHoldingCategory)
                }
            } as IGroup;
            startIndex += count;
            return i;
        });
        //combine the values of the holdings dictionary into a single array
        const items = Object.values(this.holdings).reduce((accu, cur) => {
            return accu.concat(cur);
        }, []);
        return [group, items];
    }
}
