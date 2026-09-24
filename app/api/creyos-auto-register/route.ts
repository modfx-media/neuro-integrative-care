import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SITE_URL } from "@/lib/site";

// Creyos Auto-Registration Links (client guide): sign a JWT with the
// account salt, then send the patient to
// https://health.creyos.com/en/account/signup/ACCOUNT_NAME?p=TOKEN
const CREYOS_BASE_URL = "https://health.creyos.com/en/account/signup";

function randomUserCode(): string {
  return `nic${Math.random().toString(36).slice(2, 12)}`;
}

/** Creyos stores user_code as the patient identifier shown in reports. */
function nameToUserCode(name: string): string | null {
  const code = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return code.length > 0 ? code : null;
}

// Creyos sample JWT encodes birthdate as DD + YYYY + MM (1994-01-01 → 01199401).
function toCreyosBirthdate(isoDate: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return null;
  const [, year, month, day] = match;
  return `${day}${year}${month}`;
}

function ageFromIso(isoDate: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return null;
  const [, y, m, d] = match;
  const born = new Date(Number(y), Number(m) - 1, Number(d));
  if (Number.isNaN(born.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - born.getFullYear();
  const monthDelta = today.getMonth() - born.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < born.getDate())) {
    age -= 1;
  }
  return age;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.birthdate !== "string") {
    return NextResponse.json(
      { error: "Date of birth is required." },
      { status: 400 },
    );
  }

  const fullName =
    typeof body.name === "string"
      ? body.name.trim()
      : typeof body.userCode === "string"
        ? body.userCode.trim()
        : "";

  // Signup path is /account/signup/{ACCOUNT}. Creyos currently accepts the
  // trial UUID (CREYOS_TRIAL_NAME). The old numeric trial id 13528 returns
  // "Trial not found", so the UUID must win when both are set.
  const accountName =
    typeof body.trialId === "string" && body.trialId.trim()
      ? body.trialId.trim()
      : process.env.CREYOS_ACCOUNT_NAME ||
        process.env.CREYOS_TRIAL_NAME ||
        process.env.CREYOS_TRIAL_ID;
  const salt =
    typeof body.salt === "string" && body.salt.trim()
      ? body.salt.trim()
      : process.env.CREYOS_AUTO_REG_SALT;

  if (!accountName || !salt) {
    return NextResponse.json(
      {
        error:
          "The assessment is not available yet. Please call the office to get started.",
      },
      { status: 503 },
    );
  }

  const age = ageFromIso(body.birthdate);
  if (age === null) {
    return NextResponse.json(
      { error: "Please enter a valid date of birth." },
      { status: 400 },
    );
  }
  // Creyos does not support ages younger than 3 or older than 98.
  if (age < 3 || age > 98) {
    return NextResponse.json(
      {
        error:
          "This assessment is available for ages 3 to 98. Please contact the office if you need another option.",
      },
      { status: 400 },
    );
  }

  const birthdate = toCreyosBirthdate(body.birthdate);
  if (!birthdate) {
    return NextResponse.json(
      { error: "Please enter a valid date of birth." },
      { status: 400 },
    );
  }

  const gender =
    body.gender === "male" || body.gender === "female" ? body.gender : undefined;
  const userCode = nameToUserCode(fullName) ?? randomUserCode();
  const protocolId =
    typeof body.protocolId === "string" && body.protocolId.trim()
      ? body.protocolId.trim()
      : process.env.CREYOS_PROTOCOL_ID;

  const payload: Record<string, unknown> = {
    user_code: userCode,
    birthdate,
    resume_session: true,
    return_url: `${SITE_URL}/brain-assessment/complete`,
    error_url: `${SITE_URL}/brain-assessment/error`,
  };
  if (gender) payload.gender = gender;
  if (protocolId) payload.protocol_id = protocolId;

  const token = jwt.sign(payload, salt, {
    algorithm: "HS512",
    expiresIn: "7d",
  });
  const url = `${CREYOS_BASE_URL}/${accountName}?p=${encodeURIComponent(token)}`;

  return NextResponse.json({ url, userCode });
}
