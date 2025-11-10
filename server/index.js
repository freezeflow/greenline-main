// server/index.js
import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

import { createServer as createViteServer } from 'vite'
import { renderToString } from '@vue/server-renderer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.env.NODE_ENV === 'production'

async function startServer() {
  const app = express()

  if (!isProd) {
    // ✅ Development mode: use Vite with HMR
    const vite = await createViteServer({
      server: { middlewareMode: 'ssr' },
      appType: 'custom',
    })

    app.use(vite.middlewares)

    app.use('/', async (req, res) => {
      try {

        const url = req.originalUrl
        const template = fs.readFileSync(
          path.resolve(__dirname, '../index.html'),
          'utf-8'
        )
        const transformedTemplate = await vite.transformIndexHtml(url, template)

        const { createApp } = await vite.ssrLoadModule('/src/main.server.js')
        const { app: vueApp } = createApp()
        const appHtml = await renderToString(vueApp)

        const html = transformedTemplate.replace(
          '<div id="app"></div>',
          `<div id="app">${appHtml}</div>`
        )

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        vite.ssrFixStacktrace(e)
        console.error(e)
        res.status(500).end(e.message)
      }
    })
  } else {
    // ✅ Production mode: serve built assets
    app.use(express.static(path.resolve(__dirname, '../dist/client')))

    const template = fs.readFileSync(
      path.resolve(__dirname, '../dist/client/index.html'),
      'utf-8'
    )
    const { createApp } = await import('../dist/server/main.server.js')

    app.use('*', async (req, res) => {
      try {
        const { app: vueApp } = createApp()
        const appHtml = await renderToString(vueApp)

        const html = template.replace(
          '<div id="app"></div>',
          `<div id="app">${appHtml}</div>`
        )

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        console.error(e)
        res.status(500).end('Internal Server Error')
      }
    })
  }

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`)
  })
}

startServer()
