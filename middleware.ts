import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Χρησιμοποιούμε το withAuth για να τυλίξουμε το middleware μας
export default withAuth(
  function middleware(req) {
    // Εδώ μπορείς να προσθέσεις επιπλέον logic αν χρειαστεί
    return NextResponse.next();
  },
  {
    callbacks: {
      // Το middleware θα τρέξει μόνο αν αυτή η συνάρτηση επιστρέψει true
      // !!token σημαίνει "υπάρχει token; (true/false)"
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login", // Αν δεν είναι συνδεδεμένος, στείλ' τον εδώ
    },
  },
);

// Εδώ ορίζουμε ποιες διαδρομές προστατεύονται
export const config = {
  matcher: ["/goals/:path*", "/api/goals/:path*"],
};
