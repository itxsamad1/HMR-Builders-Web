/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker (2.10.5).
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */

const INTEGRITY_CHECKSUM = '26357c79639bfa20d64c0d15a62c9b80'
const activeClientIds = new Set()

self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', async function (event) {
  const clientId = event.source.id

  if (!clientId || !event.data) {
    return
  }

  const { type, payload } = event.data

  switch (type) {
    case 'KEEPALIVE_REQUEST': {
      sendToClient(event.source, {
        type: 'KEEPALIVE_RESPONSE',
        payload,
      })
      break
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(event.source, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: INTEGRITY_CHECKSUM,
      })
      break
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId)

      sendToClient(event.source, {
        type: 'MOCKING_ENABLED',
        payload: true,
      })
      break
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId)
      break
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId)
      break
    }
  }
})

self.addEventListener('fetch', function (event) {
  const { clientId } = event

  if (!clientId || !activeClientIds.has(clientId)) {
    return
  }

  const { request } = event
  const accept = request.headers.get('accept') || ''

  // Bypass navigation requests.
  if (request.mode === 'navigate') {
    return
  }

  // Opening the DevTools triggers the "only-if-cached" request
  // that cannot be handled by the worker. Bypass such requests.
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return
  }

  // Bypass all requests when there are no active clients.
  // Prevents the self-unregistered worked from handling requests
  // after it's been deleted (still remains active until the next reload).
  if (activeClientIds.size === 0) {
    return
  }

  // Generate unique request ID.
  const requestId = Math.random().toString(16).slice(2)

  event.respondWith(
    handleRequest(event, requestId).catch((error) => {
      if (error.name === 'NetworkError') {
        console.warn(
          'Mock Service Worker detected a network error, falling back to the actual network: %s',
          error,
        )

        return passthrough(event.request)
      }

      throw error
    }),
  )
})

async function handleRequest(event, requestId) {
  const client = await self.clients.get(event.clientId)

  if (!client) {
    return passthrough(event.request)
  }

  const response = await getResponse(event, client, requestId)

  if (response.status === 302) {
    return passthrough(event.request)
  }

  return response
}

async function getResponse(event, client, requestId) {
  const { request } = event
  const clonedRequest = request.clone()

  function passthrough(request) {
    const headers = Object.fromEntries(request.headers.entries())

    const {
      referrer,
      referrerPolicy,
      mode,
      credentials,
      cache,
      redirect,
      integrity,
      keepalive,
    } = request

    return fetch(clonedRequest, {
      headers,
      method: request.method,
      body: request.body,
      referrer,
      referrerPolicy,
      mode,
      credentials,
      cache,
      redirect,
      integrity,
      keepalive,
    })
  }

  return new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel()

    messageChannel.port1.onmessage = function (event) {
      const { error, response } = event.data

      if (error) {
        reject(error)
        return
      }

      resolve(response !== undefined ? response : passthrough(request))
    }

    sendToClient(
      client,
      {
        type: 'REQUEST',
        payload: {
          id: requestId,
          url: request.url,
          method: request.method,
          headers: Object.fromEntries(request.headers.entries()),
          cache: request.cache,
          mode: request.mode,
          credentials: request.credentials,
          destination: request.destination,
          integrity: request.integrity,
          redirect: request.redirect,
          referrer: request.referrer,
          referrerPolicy: request.referrerPolicy,
          body: await request.text(),
          bodyUsed: request.bodyUsed,
          keepalive: request.keepalive,
        },
      },
      [messageChannel.port2],
    )
  })
}

function sendToClient(client, message, transferrables = []) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = function (event) {
      if (event.data && event.data.error) {
        reject(event.data.error)
      } else {
        resolve(event.data)
      }
    }

    client.postMessage(
      message,
      [channel.port2, ...transferrables],
    )
  })
}

async function passthrough(request) {
  return fetch(request)
}