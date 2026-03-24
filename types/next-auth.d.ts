import { DefaultSession } from "next-auth";

// Επεκτείνουμε το module του NextAuth
declare module "next-auth" {
  /**
   * Εδώ ορίζουμε τι θα περιέχει το session.user
   */
  interface Session {
    user: {
      id: string; // Εδώ προσθέτουμε το id μας
    } & DefaultSession["user"]; // Κρατάμε και τα default (name, email, image)
  }

  /**
   * Επεκτείνουμε και το User object που έρχεται από τον provider
   */
  interface User {
    id: string;
  }
}

// Επεκτείνουμε το JWT αν χρησιμοποιείς tokens (που χρησιμοποιούμε)
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
