import type { APIHandler } from 'aleph/types.d.ts'

export const handler: APIHandler = ({ router, response }) => {
  const channel = new BroadcastChannel(router.params['uuid'])
  channel.postMessage(router.params['tag'])
  response.json({ ok: true })
}
