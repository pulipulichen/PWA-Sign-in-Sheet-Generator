let app = {
  props: ['db'],
  components: {
    // DataTaskManager: () => import(/* webpackChunkName: "components/DataTaskManager" */ './DataTaskManager/DataTaskManager.vue')
  },
  data () {    
    this.$i18n.locale = this.db.localConfig.locale
    return {
    }
  },
  watch: {
    'db.localConfig.locale'() {
      this.$i18n.locale = this.db.localConfig.locale;
    },
  },
  computed: {
    computedHeaderHTML () {
      let html = this.db.localConfig.header
      return this.db.utils.StringUtils.nl2br(html)
    },

    pageData () {
      if (this.db.config.inited === false) {
        return []
      }
      return this.$parent.listRowColumnNames
    },

    cellTemplate () {
      return this.db.utils.StringUtils.nl2br(this.db.localConfig.cellTemplate)
    },

    computedColumnWidth () {
      return {
        width: `calc(((100vw - 1rem) / ${this.db.localConfig.layoutColumnNumber} ) - 1px)`
      }
    },

    computedCellHeight () {
      return {
        height: `calc(((100vh - 5rem) / ${this.db.localConfig.layoutRowNumber} ) - 2px)`
      }
    }
  },
  mounted() {
    
  },
  methods: {
    buildCellHTML (item) {
      if (!item) {
        return ''
      }

      let cellTemplate = this.cellTemplate
      Object.keys(item).forEach(key => {
        let value = item[key]

        cellTemplate = cellTemplate.split(`[${key}]`).join(value)
      })
      return cellTemplate
    }
  }
}

export default app