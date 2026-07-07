import { NextResponse } from "next/server";

// Web3Forms access key (public by design, spam-filtered server-side).
// Can be overridden with the WEB3FORMS_KEY environment variable on Vercel.
const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY || "73cec211-5017-4fc4-a381-0e26462302da";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type TravelRequestPayload = {
  destination: string;
  travelDate: string;
  travelers: string;
  purpose: string;
  food: string;
  accommodation: string;
  budget: string;
  languages: string[];
  contact: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as TravelRequestPayload;

    if (
      !payload.destination?.trim() ||
      !payload.travelDate ||
      !payload.travelers ||
      !payload.contact?.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("[FreeGO travel request]", payload);

    const message = [
      `想去哪裡玩：${payload.destination}`,
      `旅遊日期：${payload.travelDate}`,
      `旅遊人數：${payload.travelers}`,
      `旅遊目的：${payload.purpose || "未填寫"}`,
      `美食偏好：${payload.food || "未填寫"}`,
      `住宿偏好：${payload.accommodation || "未填寫"}`,
      `每日預算：${payload.budget || "未填寫"}`,
      `語言偏好：${
        payload.languages.length ? payload.languages.join(", ") : "未填寫"
      }`,
      `聯絡方式：${payload.contact}`
    ].join("\n");

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `FreeGO 新旅遊需求：${payload.destination}（${payload.travelDate}）`,
        from_name: "FreeGO 網站表單",
        message
      })
    });

    const result = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (!response.ok || !result?.success) {
      console.error(
        "[FreeGO travel request] email relay failed",
        response.status,
        result?.message
      );

      return NextResponse.json(
        { success: false, error: "Email relay failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[FreeGO travel request error]", error);

    return NextResponse.json(
      { success: false, error: "Invalid travel request payload" },
      { status: 400 }
    );
  }
}
