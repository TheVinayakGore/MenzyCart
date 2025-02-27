import { NextResponse } from "next/server";
import toast from "react-hot-toast";

// Static pincodes data (replace with your own data or fetch from another source)
const staticPincodes = ["234322", "123456", "654321", "413216"];

export async function GET(): Promise<NextResponse> {
  try {
    // If you want to fetch pincodes from an external API or local file, you can do it here.
    // For now, we're using static data.
    const pincodes: string[] = staticPincodes;

    if (!pincodes || pincodes.length === 0) {
      throw new Error("No pincodes found !");
    }

    return NextResponse.json(pincodes);
  } catch (error) {
    toast.error("Error fetching pincode data:" + error);
    // Fallback data if there’s an error
    return NextResponse.json(staticPincodes);
  }
}
