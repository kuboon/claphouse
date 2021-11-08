import React from 'react'
import Logo from '~/components/logo.tsx'
import { v4 } from "std/uuid/mod.ts";

export default function Home() {
  const uuid = v4();
  const params = new URLSearchParams();
  params.append('uuid', uuid);

  return (
    <div className="page">
      <head>
        <title>👏Claphouse</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <p className="logo">👏</p>
      <h1>Claphouse</h1>
      <p className="links">
        <a href={'/play#' + params.toString()} >Create Room</a>
        <a href="https://github.com/kuboon/claphouse" target="_blank">Github</a>
      </p>
      <p className="copyinfo">Built by kuboon</p>
    </div>
  )
}
