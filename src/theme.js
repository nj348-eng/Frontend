import { extendTheme } from '@chakra-ui/react'

// Custom color palette and global styles
const colors = {
  brand: {
    50: '#e6fffa',
    100: '#b2f5ea',
    200: '#81e6d9',
    300: '#4fd1c5',
    400: '#38b2ac',
    500: '#319795',
    600: '#2c7a7b',
    700: '#27656a',
    800: '#234e52',
    900: '#1a4044'
  }
}

const fonts = {
  heading: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  body: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
}

const components = {
  Button: {
    baseStyle: {
      borderRadius: 'md',
      transition: 'all 0.16s ease',
      _hover: { transform: 'translateY(-1px)', boxShadow: 'sm' }
    },
    sizes: {
      sm: { fontSize: '12px', px: 3, py: 1 }
    },
    defaultProps: {
      colorScheme: 'brand'
    }
  },
  Input: {
    baseStyle: {
      field: {
        borderRadius: 'md',
        bg: 'white'
      }
    }
  },
  Table: {
    baseStyle: {
      th: {
        bg: 'gray.50',
        fontWeight: '600'
      }
    }
  }
}

const styles = {
  global: {
    'html, body, #root': {
      height: '100%'
    },
    body: {
      bg: 'gray.50',
      color: 'gray.800',
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility'
    },
    '.chakra-heading': {
      color: 'gray.800'
    },
    'table': {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      fontVariantNumeric: 'tabular-nums'
    },
    'table thead th': {
      background: '#f7fafc',
      textTransform: 'uppercase',
      fontSize: '12px'
    },
    'table tbody tr': {
      transition: 'background 0.12s ease, transform 0.12s ease'
    },
    'table tbody tr:hover': {
      background: 'rgba(49,151,149,0.04)'
    },
    'input, textarea, select': {
      borderRadius: '8px'
    },
    '.card': {
      boxShadow: '0 6px 18px rgba(22,28,45,0.06)',
      borderRadius: '10px'
    }
  }
}

const theme = extendTheme({ colors, fonts, components, styles })

export default theme
