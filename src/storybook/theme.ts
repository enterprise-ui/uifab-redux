const defaultTheme = {
  mainColor: '#FF5722',
  activeColor: '#E94E1D',
  secondaryColor: 'rgba(102, 102, 102, 0.05)',
  secondaryColorAlt: '#F7F7F7',
  secondaryColorDarken: 'rgba(102, 102, 102, 0.1)',
  secondaryColorDarkenAlt: '#EFEFEF',
  errorColor: '#f00',
  textColor: '#000',
  accentTextColor: '#575756',

  linkColorLight: '#fff',
  linkColorDark: '#000',
  linkColorCommon: '#0083FD',

  headerTopBg: '#fff',
  headerInfoBg: '#fff',
  headerBottomBg: '#fff',

  duration: '0.35s',
  faster: '0.175s',

  columns: {
    xs: 4,
    sm: 8,
    md: 8,
    lg: 12,
    xl: 12,
  },
  gutterWidth: {
    xs: 1,
    sm: 1,
    md: 1.5,
    lg: 1.5,
    xl: 1.5,
  },
  paddingWidth: {
    xs: 1,
    sm: 1,
    md: 1.5,
    lg: 1.5,
    xl: 1.5,
  },
  container: {
    xs: 'full', // 'full' = max-width: 100%
    sm: 'full', // 'full' = max-width: 100%
    md: 'full', // 'full' = max-width: 100%
    lg: 90, // max-width: 1440px
    xl: 90, // max-width: 1440px
  },
  breakpoints: {
    xs: 1,
    sm: 48, // 768px
    md: 64, // 1024px
    lg: 90, // 1440px
    xl: 120, // 1920px
  },

  zIndexActionMenu: 999,
  zIndexModal: 1000,
  zIndexNotification: 1001,
  zIndexTooltip: 1002,
}

export const themes = [
  Object.assign(defaultTheme, {
    name: 'DEFAULT',
    mainColor: '#64b441',
    activeColor: '#529535',
    secondaryColor: 'rgba(102, 102, 102, 0.05)',
    secondaryColorAlt: '#F7F7F7',
    secondaryColorDarken: 'rgba(102, 102, 102, 0.1)',
    secondaryColorDarkenAlt: '#EFEFEF',
    errorColor: '#f00',
    textColor: '#000',

    linkColorLight: '#fff',
    linkColorDark: '#000',
    linkColorCommon: '#0083FD',

    headerTopBg: '#fff',
    headerMiddleBg: '#fff',
    headerBottomBg: '#fff',

    accentTextColor: '#575756',

    duration: '0.35s',
    faster: '0.175s',
    sidenavWidth: 60,
  }),
]
