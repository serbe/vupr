export default {
  methods: {
    createList (proxies) {
      let list = []
      if (proxies) {
        list = proxies.map((proxy) => {
          const str = [
            proxy.host,
            proxy.port,
            proxy.response,
            proxy.work,
            proxy.anon,
            proxy.checks,
            proxy.create,
            proxy.update
          ]
          const nc = proxy
          nc.response = this.responseStr(nc.response)
          nc.str = str.join(' ').toLowerCase()
          return nc
        })
      }
      return list
    },
    responseStr (r) {
      let s = ''
      if (r === 0) {
        s = '-'
      } else if (r > 1000000000) {
        s = (r / 1000000000).toFixed(2) + 's'
      } else if (r > 1000000) {
        s = (r / 1000000).toFixed(0) + 'ms'
      } else if (r > 1000) {
        s = (r / 1000).toFixed(0) + 'µs'
      } else {
        s = r + 'ns'
      }
      return s
    }
  }
}
