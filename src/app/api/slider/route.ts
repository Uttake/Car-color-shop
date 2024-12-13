import { NextResponse } from "next/server";
import { getInfo } from "@/app/utils/actions";

export async function GET() {
  const data = await getInfo();
  return NextResponse.json(data);
}