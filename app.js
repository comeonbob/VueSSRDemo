const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<h3>Hello SSR</h3>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      console.log('err', err)
      res.status(500).end('Internal Server Error')
      return
    }
    console.log('html', html)
    res.header('Content-Type', "text/html;charset=utf-8");
    res.end(html)
  })
})

const port = 8899
server.listen(port, () => {
  console.log(`server listen on: http://localhost:${port}`)
})