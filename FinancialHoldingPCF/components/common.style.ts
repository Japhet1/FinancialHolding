import { mergeStyleSets } from '@fluentui/merge-styles';

const classNames = mergeStyleSets({
  mt8: {
    marginTop: '8px !important',
  },
  mt24: {
    marginTop: '24px !important',
  },
  mb8: {
    marginBottom: '8px !important',
  },
  ml8: {
    marginLeft: '8px !important',
  },
  padding16: {
    padding: '16px !important',
  },
  bold:{
    fontWeight: 600
  },
  fullWidth: {
    width: '100%'
  },
  fullHeight: {
    height: '100%'
  },
  fullHeightWidth: {
    height: '100%',
    width: '100%'
  },
  cmdButton: {
    height: '40px',
    marginRight: 10
  },
  formikForm:{
    selectors: {
        "> label+div" : {
            marginBottom: "10px !important"
        }
    }
}
});

export default classNames;
