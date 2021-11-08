import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Fallback } from 'aleph/react'

const list = {
  clap: {
    button: '👏',
    key: 'c',
    files: [
      'clap0.m4a',
      'clap1.m4a',
      'clap2.m4a',
      'clap3.m4a',
    ]
  }
}

let context: AudioContext
const buffers = {} as Record<string, AudioBuffer>
async function loadSounds() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  context = new AudioContext()
  const files = Object.values(list).flatMap(({ files }) => files)
  const promises = files
    .map(n =>
      fetch(`/sounds/${n}`)
        .then(r => r.arrayBuffer())
        .then(x => context.decodeAudioData(x))
        .then(buf => (buffers[n] = buf))
        .catch(e => {
          print(e)
          print(JSON.stringify(e))
        })
    )
  return Promise.all(promises).then(() => print('音源ロード完了'))
}

function SoundToggle() {
  const [isOn, setIsOn] = useState(false)
  useEffect(() => {
    loadSounds()
  }, [])
  const onClick = useCallback(async (e) => {
    if (!context) await loadSounds();
    setIsOn(!isOn)
    if (isOn) {
      context.resume();
    } else {
      context.suspend();
    }
  }, [isOn])
  return (
    <div>
      <button onClick={onClick}>
        {isOn ? '🔇 ➡️🔈' : '🔇⬅️ 🔈'}
      </button>
    </div>
  )
}

function print(msg) {
  //logElm.insertAdjacentHTML('afterbegin', `<p>${msg}</p>`)
}
function sample(arr) {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
}
export function play(tag: keyof typeof list) {
  print('受信: ' + tag)
  const file = sample(list[tag].files)
  print('再生: ' + file)
  try {
    const source = context.createBufferSource()
    source.buffer = buffers[file]
    source.connect(context.destination)
    source.start()
  } catch (e) {
    print(e)
  }
}

export default function Room() {
  const params = new URLSearchParams(window.location.hash.substring(1))
  const uuid = params.get('uuid')
  if(!uuid) {
    return <p>loading</p>
  }
  const channelRef = useRef(new BroadcastChannel(uuid))
  const channel = channelRef.current
  return (
    <div className="page">
      <head>
        <title>👏Claphouse</title>
        <link rel="stylesheet" href="/style/index.css" />
      </head>
      <p className="logo">👏</p>
      <h1>Claphouse</h1>
      <p>{uuid}</p>
      <Fallback to=''>
        <SoundToggle />
      </Fallback>
      {Object.entries(list).map(([tag, sound]) => (
        <button
          key={sound.key}
          onClick={() => channel.postMessage(tag)}
        >
          {sound.button}
        </button>
      ))}
      <p className="copyinfo">Built by kuboon</p>
    </div>
  )
}
