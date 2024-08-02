// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Theme
import theme from './theme'

export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      themes: theme,
    },
  },
})
