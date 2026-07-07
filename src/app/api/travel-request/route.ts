import { NextResponse } from "next/server";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "happyride1688@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${NOTIFY_EMAIL}`;

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

    const emailBody = {
      _subject: `FreeGO 新旅遊需求：${payload.destination}（${payload.travelDate}）`,
      _template: "table",
      想去哪裡玩: payload.destination,
      旅遊日期: payload.travelDate,
      旅遊人數: payload.travelers,
      旅遊目的: payload.purpose || "未填寫",
      美食偏好: payload.food || "未填寫",
      住宿偏好: payload.accommodation || "未填寫",
      每日預算: payload.budget || "未填寫",
      語言偏好: payload.languages.length
        ? payload.languages.join(", ")
        : "未填寫",
      聯絡方式: payload.contact
    };

    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(emailBody)
    });

    if (!response.ok) {
      console.error(
        "[FreeGO travel request] email relay failed",
        response.status,
        await response.text()
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
