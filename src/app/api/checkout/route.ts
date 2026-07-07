import { createHash } from "crypto";
import { NextResponse } from "next/server";

// 綠界 ECPay 全方位金流（AIO）
// 預設為官方「測試環境」商店，測試刷卡不會實際扣款。
// 上線時在 Vercel 設定環境變數：
//   ECPAY_MERCHANT_ID / ECPAY_HASH_KEY / ECPAY_HASH_IV / ECPAY_STAGE=false
const MERCHANT_ID = process.env.ECPAY_MERCHANT_ID || "2000132";
const HASH_KEY = process.env.ECPAY_HASH_KEY || "5294y06JbISpM5x9";
const HASH_IV = process.env.ECPAY_HASH_IV || "v77hoKGq4kWxNNIS";
const IS_STAGE = (process.env.ECPAY_STAGE || "true") !== "false";

const ACTION_URL = IS_STAGE
  ? "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
  : "https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5";

type CheckoutPayload = {
  orderNo: string;
  amount: number;
  itemName: string;
};

function ecpayUrlEncode(value: string): string {
  return encodeURIComponent(value)
    .toLowerCase()
    .replace(/%20/g, "+")
    .replace(/%2d/g, "-")
    .replace(/%5f/g, "_")
    .replace(/%2e/g, ".")
    .replace(/%21/g, "!")
    .replace(/%2a/g, "*")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")");
}

function checkMacValue(params: Record<string, string | number>): string {
  const sortedKeys = Object.keys(params).sort((a, b) =>
    a.toLowerCase() < b.toLowerCase() ? -1 : 1
  );
  const raw =
    `HashKey=${HASH_KEY}&` +
    sortedKeys.map((key) => `${key}=${params[key]}`).join("&") +
    `&HashIV=${HASH_IV}`;
  const encoded = ecpayUrlEncode(raw);
  return createHash("sha256").update(encoded).digest("hex").toUpperCase();
}

function taiwanTradeDate(): string {
  const now = new Date(Date.now() + 8 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getUTCFullYear()}/${pad(now.getUTCMonth() + 1)}/${pad(
    now.getUTCDate()
  )} ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(
    now.getUTCSeconds()
  )}`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CheckoutPayload;

    if (
      !payload.orderNo ||
      !/^[A-Za-z0-9]{8,20}$/.test(payload.orderNo) ||
      !Number.isInteger(payload.amount) ||
      payload.amount < 100 ||
      payload.amount > 500000 ||
      !payload.itemName
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid checkout payload" },
        { status: 400 }
      );
    }

    const origin =
      request.headers.get("origin") ||
      `https://${request.headers.get("host") || ""}`;

    const params: Record<string, string | number> = {
      MerchantID: MERCHANT_ID,
      MerchantTradeNo: payload.orderNo,
      MerchantTradeDate: taiwanTradeDate(),
      PaymentType: "aio",
      TotalAmount: payload.amount,
      TradeDesc: "FreeGO Taiwan Travel deposit",
      ItemName: payload.itemName.slice(0, 100),
      ReturnURL: `${origin}/api/ecpay/notify`,
      ClientBackURL: `${origin}/?order=${payload.orderNo}&paid=1#book`,
      ChoosePayment: "ALL",
      EncryptType: 1
    };

    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
      fields[key] = String(value);
    }
    fields.CheckMacValue = checkMacValue(params);

    console.log("[FreeGO checkout]", payload.orderNo, payload.amount);

    return NextResponse.json({ success: true, action: ACTION_URL, fields });
  } catch (error) {
    console.error("[FreeGO checkout error]", error);

    return NextResponse.json(
      { success: false, error: "Checkout failed" },
      { status: 400 }
    );
  }
}
