import { QR } from "https://taisukef.github.io/qrcode-generator/es/QR.js";
import { h } from "preact";
import { useState } from "preact/hooks";

declare interface QR {
  encode: (str: string) => string;
}

export default function QRcode({ data }: { data: string }) {
  const [show, setShow] = useState(false);
  const button = h("button", {
    className: "btn",
    onClick: () => setShow(!show),
  }, "QR");
  const qr = show
    ? h("pre", {
      className: "qr",
    }, qrString(data))
    : null;
  return h("label", {}, [button, qr]);
}
function qrString(data: string) {
  const qr = QR.encode(data, "L");
  return qr.map((x) =>
    String.fromCharCode(...x.flatMap((y) => y ? [9608, 9608] : [32, 32]))
  )
    .join("\n");
}
