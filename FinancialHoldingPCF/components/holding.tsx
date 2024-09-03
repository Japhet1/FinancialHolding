import * as React from 'react';
import { CommandBarButton  } from '@fluentui/react/lib/Button';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { IContextualMenuItem, IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { CustomerFinancialHolding } from '../common/models';
import { fetchxml, filterAnd, lookupColumn, choiceColumn, linkEntitySimple, LinkType, attributes, allAttributes } from "fetchxml4js";
import { FinancialHoldingRole, Dictionary, FinancialHoldingCategory } from "../common/types";
import { retrieveBaseCurrency, Service } from "pcf-core";
import cmstyles from './common.style'
import { classNamesFunction, css } from '@fluentui/react/lib/Utilities';
import { getIconName } from '../common/utils';
import { useBoolean } from 'pcf-components/lib/hooks'
import { HoldingDialog } from './holdingDialog';
import { View } from './view';
import { Separator } from '@fluentui/react';
import { classNames } from '../common/styles';


export interface HoldingProps {


}
const data = new CustomerFinancialHolding()

export const Holding: React.FC<HoldingProps> = () => {

	const [openDlg, { setTrue: showDlg, setFalse: hideDlg }] = useBoolean(false)
	const holdingsCategory = React.useRef<IContextualMenuItem>()
	
	
	const commandBarAction = (item: IContextualMenuItem) => {
		holdingsCategory.current = item
		showDlg()
	}
	
	const commandBarItems: IContextualMenuProps = {
		items: [
			{
				key: 'account',
				text: 'Accounts',
				data: FinancialHoldingCategory.Accounts,
				iconProps: { iconName: getIconName(FinancialHoldingCategory.Accounts)},
				onClick: (ev, item) => {
					commandBarAction(item)
				}
			},
			{
				key: 'investment',
				text: 'Investment',
				data: FinancialHoldingCategory.Investments,
				iconProps: { iconName: getIconName(FinancialHoldingCategory.Investments)},
				onClick: (ev, item) => {
					commandBarAction(item)
				}
			},
			{
				key: 'loan',
				text: 'Loan',
				data: FinancialHoldingCategory.Loans,
				iconProps: { iconName: getIconName(FinancialHoldingCategory.Loans)},
				onClick: (ev, item) => {
					commandBarAction(item)
				}
			},
			{
				key: 'long_term_saving',
				text: 'Long term savings',
				data: FinancialHoldingCategory.LongTermSavings,
				iconProps: { iconName: getIconName(FinancialHoldingCategory.LongTermSavings)},
				onClick: (ev, item) => {
					commandBarAction(item)
				}
			},
			{
				key: 'line_of_credit',
				text: 'Line of credit',
				data: FinancialHoldingCategory.LinesOfCredit,
				iconProps: { iconName: getIconName(FinancialHoldingCategory.LinesOfCredit)},
				onClick: (ev, item) => {
					commandBarAction(item)
				}
			}
		]
	}

	React.useEffect(() => {
		const fn = async () => {
			// const response = await Service.webApi.retrieveMultipleRecords("new_fhcontactfinancialholding", `?fetchXml=${encodeURI(data)}`)
			// await data.load("2e902750-5764-ef11-a670-0022489cd0ef")
			await data.load(Service.entity.entityId)
			// const f = await data.load("2e902750-5764-ef11-a670-0022489cd0ef")
			const c = await retrieveBaseCurrency();
			// console.log(d)
			// console.log(f)
			// console.log(c)
		}

		fn()
	})

	


	return (
		<Stack tokens={{ childrenGap: 15 }} className={css(cmstyles.fullHeightWidth, classNames.financialHolding)}>
			<StackItem align='end'>
				<CommandBarButton iconProps={{ iconName: "Add"}} menuProps={commandBarItems} text='Add holding' className={cmstyles.cmdButton} />
			</StackItem>
			<StackItem>
				<Pivot className={classNames.fullWidth}>
					<PivotItem headerText='Customer Holding'>
						<Separator />
						<View model={data} />
					</PivotItem>
					<PivotItem headerText='Holding'>
						<Separator />
						{/* <View model={data} /> */}
					</PivotItem>
				</Pivot>
			</StackItem>
			{openDlg && <HoldingDialog category={holdingsCategory.current.data} oncancel={hideDlg} title={`Add new ${holdingsCategory.current.text}`} />}
		</Stack>
	)
}
