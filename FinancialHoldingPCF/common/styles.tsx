import { mergeStyleSets  } from '@fluentui/react/lib/Styling';

export const classNames = mergeStyleSets({
	cell: {
        padding: "14px 12px !important",
    },
    cellRight: {
        textAlign: "right"
    },
    fullWidth: {
        width: "100%"
    },
    mt24: {
        marginTop: '24px !important',
    },
    pt: {
        paddingTop: '6px !important'
    },
    groupHeader: {
        selectors: {
            "&.is-selected": {
                background: "none !important"
            }
        }
    },
    financialHolding: {
        selectors: {
            "strong": {
                fontWeight: 600
            }
        }
    },
    sectionLeftStyle: {
        width: "42%"
    },
    sectionRightStyle: {
        padding: "0 24px 0px"
    },
    hidden: {
        display: 'none'
    },
    cover: {
        width: '100%',
        display: 'flex',
    }
})