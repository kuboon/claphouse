import { QR } from "https://taisukef.github.io/qrcode-generator/es/QR.js";
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

declare interface QR {
  encode: (str: string) => string;
}

export default function QRcode({ data }: { data: string }) {
  const [show, setShow] = useState(false);
  const button = h("button", {
    className: "btn",
    onClick: () => setShow(!show),
  }, "QR");
  const qr = show ? <QrCanvas data={QR.encode(data, "L")} /> : null;
  return h("label", {}, [button, qr]);
}
const QrCanvas = ({ data }: { data: number[][] }) => {
  const canvasEl = useRef(null);
  const Scale = 5;
  const canvasSize = (data.length + 8) * Scale;
  useEffect(() => {
    if (!canvasEl.current) return;
    const canvas = canvasEl.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(Scale, Scale);
    data.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          ctx.fillStyle = "#000";
          ctx.fillRect(x + 4, y + 4, 1, 1);
        }
      });
    });
  }, [data]);
  return <canvas ref={canvasEl} class="qr" width={canvasSize} height={canvasSize} />;
};
