import { EcLevel, qrCode } from "@levischuck/tiny-qr";

import { useEffect, useRef, useState } from "preact/hooks";

export default function QRcode({ data }: { data: string }) {
  const [show, setShow] = useState(false);
  const button = (
    <button
      type="button"
      className="btn"
      onClick={() => setShow(!show)}
    >
      QR
    </button>
  );
  const qr = show
    ? <QrCanvas data={qrCode({ data, ec: EcLevel.L }).matrix} />
    : null;
  return <label>{button}{qr}</label>;
}
const QrCanvas = ({ data }: { data: boolean[][] }) => {
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
  return (
    <canvas ref={canvasEl} class="qr" width={canvasSize} height={canvasSize} />
  );
};
