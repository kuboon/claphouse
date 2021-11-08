import { Aleph, Server } from 'aleph/server/mod.ts'

const aleph = new Aleph()
const server = new Server(aleph)
const listener = Deno.listen({ port: 8080 })

for await (const conn of listener) {
  // In order to not be blocking, we need to handle each connection individually
  // in its own async function.
  (async () => {
    const httpConn = Deno.serveHttp(conn)
    for await (const e of httpConn) {
      server.handle(e)
    }
  })()
}