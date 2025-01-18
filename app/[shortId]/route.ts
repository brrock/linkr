import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/db/prisma";
export const dynamic = 'force-dynamic'
export async function GET(
  req: NextRequest,
  { params }: { params: { shortId: string } }
) {
  const link = await prisma.link.findUnique({
    where: { shortId: await params.shortId },
  });

  if (!link) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const cookieStore = await cookies();
  const clickedCookie = cookieStore.get(`clicked_${link.id}`);

  if (!clickedCookie) {
    await prisma.link.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    });

    cookieStore.set(`clicked_${link.id}`, "true", {
      maxAge: 60, // 60 seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    console.log("Added click and cookie created");
  }

  return NextResponse.redirect(link.longUrl);
}

