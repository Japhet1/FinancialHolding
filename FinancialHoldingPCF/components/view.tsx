import * as React from 'react'
import { CustomerFinancialHolding } from '../common/models'
import { Stack, StackItem } from '@fluentui/react'
import { IProcessedStyleSet } from '@fluentui/react'
import { classNames } from '../common/styles'
import { LineGrap } from './LineGraph'
import { GroupListView, IListViewRef, LIST_SELECTION_EVENT } from 'pcf-components/lib/listview'
import { Text } from '@fluentui/react/lib/Text';
import { displayNameIndex } from '../common/utils'
import { classNamesFunction, css } from '@fluentui/react/lib/Utilities';
import { CheckboxVisibility, IColumn, SelectionMode, IObjectWithKey, DetailsRow } from '@fluentui/react/lib/DetailsList';
import { GroupHeader, IGroupHeaderProps, IGroup, GroupedList, IGroupRenderProps, IGroupHeaderCheckboxProps, IGroupHeaderStyleProps, IGroupHeaderStyles } from '@fluentui/react/lib/GroupedList';

import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { Selection, SelectionZone } from '@fluentui/react/lib/Selection';
import { Icon } from '@fluentui/react/lib/Icon';
import { useConst, useBoolean } from '@fluentui/react-hooks';
import { createListItems, createGroups, IExampleItem } from '@fluentui/example-data';
import { Toggle, IToggleStyles } from '@fluentui/react/lib/Toggle';




const getClassNames = classNamesFunction<IGroupHeaderStyleProps, IGroupHeaderStyles>();


interface ViewProp {
    model: CustomerFinancialHolding
}

export const View: React.FC<ViewProp> = (props) => {

    // const [groups, items] = React.useMemo(() => props.model.getGroupDetailedListData(), [])
    const listRef = React.useRef<IListViewRef>();

    // console.log(props.model)
    // console.log(props.model.getGroupDetailedListData())
    // console.log(groups)
    // console.log(items)
    const listColumns: IColumn[] = [
        {
            key: 'name',
            name: 'Holding Name',
            minWidth: 150,
            maxWidth: 600,
            isResizable: true,
            className: classNames.cell,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onRender: (item: any, index?: number, column?: IColumn) => {
                const alias = props.model.getAlias(item['FH.new_financialholdingcategory'])
                return <span>{item[`${alias}.new_name`]}</span>
            }
        },
        {
            key: 'type',
            name: 'Type',
            minWidth: 100,
            isResizable: true,
            className: classNames.cell,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onRender: (item: any, index?: number, column?: IColumn) => {
                const alias = props.model.getAlias(item['FH.new_financialholdingcategory'])
                return <span>{item[displayNameIndex('new_financialholdingtype', alias)]}</span>
            }
        },
        {
            key: 'balance',
            name: 'Balance',
            minWidth: 66,
            isResizable: true,
            className: css(classNames.cell, classNames.cellRight),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onRender: (item: any, index?: number, column?: IColumn) => {
                const alias = props.model.getAlias(item['FH.new_financialholdingcategory'])
                return <Text variant='medium'><strong>{item[`${alias}.new_balance`]}</strong></Text>
            }
        },
        {
            key: 'currency',
            name: 'Currency',
            minWidth: 66,
            isResizable: true,
            className: classNames.cell,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onRender: (item: any, index?: number, column?: IColumn) => {
                const alias = props.model.getAlias(item['FH.new_financialholdingcategory'])
                return <Text variant='medium'>{item[displayNameIndex('transactioncurrencyid', alias)]}</Text>
            }
        },
        {
            key: 'empty',
            name: "",
            fieldName: 'value',
            minWidth: 15,
            maxWidth: 35,
            isResizable: true,
            className: classNames.cell,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onRender: (item: any, index?: number, column?: IColumn) => {
                return <span></span>
            }
        }
    ];

	const onRenderTitle = (headerProps: IGroupHeaderProps) => {
        const { group, styles, theme, className, compact } = headerProps;
        const grpClassNames = getClassNames(styles, {
            theme: theme!,
            className,
            compact
        });
        return <div className={grpClassNames.title}>
            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign='center'>
                <StackItem className={classNames.pt}>
                   
                    <Icon iconName={group.data.iconName} />
                </StackItem>
                <StackItem>
                    <span>{group.name} ({group.count})</span>
                </StackItem>
            </Stack>
        </div>
    }

    const onRenderGroupHeader = React.useCallback((props: IGroupHeaderProps) => {
        if (props) {
            
            return <GroupHeader {...props} onRenderTitle={onRenderTitle} className={classNames.groupHeader} />
        }
        return null;
    }, []);


    return (
        <Stack horizontal className={classNames.fullWidth}>
            <StackItem>
                <Stack tokens={{ childrenGap: 15}}>
                    <LineGrap assets={props.model.totalAssets} liabilities={props.model.totalLiabilities} />
                    {/* <GroupListView
                        columns={listColumns}
                        items={items}
                        groups={groups}
                        loading={false}
                        groupProps={{
                            onRenderHeader: onRenderGroupHeader
                        }}
                        componentRef={listRef}
                        selectionMode={SelectionMode.single}
                        checkboxVisibility={CheckboxVisibility.hidden}
                    /> */}
                </Stack>
            </StackItem>
        </Stack>
    )
}