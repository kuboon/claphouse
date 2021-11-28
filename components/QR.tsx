import { QR } from "https://taisukef.github.io/qrcode-generator/es/QR.js";
import { h, Fragment, useState } from "../deps.ts";

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
  const qr = QR.encode(data);
  return qr.map((x) => String.fromCharCode(...x.map((y) => y ? 9608 : 8195)))
    .join("\n");
}
