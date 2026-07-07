// 綠界付款結果背景通知（ReturnURL）
// 綠界要求收到後回應 "1|OK"，否則會重試通知。
export async function POST(request: Request) {
  try {
    const body = await request.text();
    const params = new URLSearchParams(body);
    const result = Object.fromEntries(params.entries());

    console.log(
      "[FreeGO ecpay notify]",
      result.MerchantTradeNo,
      "RtnCode=",
      result.RtnCode,
      "RtnMsg=",
      result.RtnMsg,
      "TradeAmt=",
      result.TradeAmt
    );
  } catch (error) {
    console.error("[FreeGO ecpay notify error]", error);
  }

  return new Response("1|OK", {
    status: 200,
    headers: { "Content-Type": "text/plain" }
  });
}
