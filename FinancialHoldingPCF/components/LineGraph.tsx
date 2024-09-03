import * as React from 'react'
import { classNames } from '../common/styles'
import { CustomerFinancialHolding } from '../common/models'
import { Stack, Text } from '@fluentui/react'
import { getTheme } from '@fluentui/react/lib/Styling'

const theme = getTheme()


interface LineGraphProp {
    assets: number
    liabilities: number
}


export const LineGrap: React.FC<LineGraphProp> = (props) => {


    const { assets, liabilities } = props

    console.log(assets)
    console.log(liabilities)

    const total = assets + liabilities
    const assetsWidth = (assets / total) * 100
    const liabilitiesWidth = (liabilities / total) * 100

    return (
        <Stack tokens={{ childrenGap: 10 }} className={classNames.fullWidth}>
            <Stack horizontal>
                <div style={{ width: 50, background: theme.palette.blue, height: 10}}></div>
                <div style={{ width: liabilitiesWidth + '%', background: theme.palette.green, height: 10}}></div>
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 10}}> 
                <Stack horizontal verticalAlign='center'>
                    <div style={{ width: 10, background: theme.palette.blue, height: 10, marginRight: 5}}></div>
                    <Text variant='smallPlus'>Assets {assets}</Text>
                </Stack>
                <Stack horizontal verticalAlign='center'>
                    <div style={{ width: 10, background: theme.palette.blueDark, height: 10, marginRight: 5}}></div>
                    <Text variant='smallPlus'>Liabilities {liabilities}</Text>
                </Stack>
            </Stack>
        </Stack>
    )
}