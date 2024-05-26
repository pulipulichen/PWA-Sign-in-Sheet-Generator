import dayjs from 'dayjs'

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
      // return JSON.parse(this.$parent.listRowColumnNames)
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
    this.watchPrintFilename()
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
    },
    extractBoldOrUnderlineText(inputString) {
      // Define the regular expression to match <b> and <u> tags
      const boldTagRegex = /<b>(.*?)<\/b>/g;
      const underlineTagRegex = /<u>(.*?)<\/u>/g;
  
      // Initialize arrays to store matches
      let boldMatches = [];
      let underlineMatches = [];
  
      // Extract text content from <b> tags
      let boldMatch;
      while ((boldMatch = boldTagRegex.exec(inputString)) !== null) {
          boldMatches.push(boldMatch[1]);
      }
  
      // Extract text content from <u> tags
      let underlineMatch;
      while ((underlineMatch = underlineTagRegex.exec(inputString)) !== null) {
          underlineMatches.push(underlineMatch[1]);
      }
  
      // Check if there were any matches
      if (boldMatches.length > 0) {
        return boldMatches.join(' ')
      }
      else if (underlineMatches.length > 0) {
        return underlineMatches.join(' ')
      } else {
        return false;
      }
    },
    updateDocumentTitle () {
      let header = this.db.localConfig.header.trim()
      
      if (header.indexOf('\n') > -1) {
        header = header.slice(0, header.indexOf('\n')).trim()
      }

      console.log(header)
      let highlight = this.extractBoldOrUnderlineText(header)
      if (highlight) {
        header = highlight
      }

      console.log(header)
      header = this.db.utils.StringUtils.removeHTMLTags(header)

      if (header.length > this.db.config.printFilenameLimitLength) {
        header = header.slice(0, this.db.config.printFilenameLimitLength)
      }

      console.log(header)
      if (header.endsWith(this.db.config.printFilenameFooter) === false) {
        header = header + this.db.config.printFilenameFooter
      }

      console.log(header)
      if (this.db.config.printFilenamePrependDate) {
        let dateString = dayjs().format('YYYYMMDD')

        if (header.startsWith(dateString) === false) {
          header = dateString + ' ' + header
        }
      }
      console.log(header)
      document.title = header
    },
    watchPrintFilename () {
      let originalFilename
      window.addEventListener("beforeprint", (event) => {
        originalFilename = document.title
        this.updateDocumentTitle()
      });
      
      window.addEventListener("afterprint", (event) => {
        document.title = originalFilename
      });
    }
  }
}

export default app