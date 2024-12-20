import { instance } from "@/services/axios";
import { z } from "zod";
import { create } from "zustand/react";

interface InviteStore {
  loading: boolean;
  invite: (data: {
    name: string;
    email: string;
  }) => Promise<{ success: boolean }>;
}

const InvitationSuccessSchema = z.object({
  data: z.string(),
  status: z.number(),
});

const InvitationErrorSchema = z.object({
  errorMessage: z.string(),
  status: z.number(),
});

const InvitationResponseSchema = z.union([
  InvitationSuccessSchema,
  InvitationErrorSchema,
]);

export const useInviteService = create<InviteStore>((set) => ({
  loading: false,
  invite: async (request) => {
    set({ loading: true });
    try {
      const response = await instance.post("/prod/fake-auth", request);

      const validatedResponse = InvitationResponseSchema.parse(response);

      if ("data" in validatedResponse) {
        set({ loading: false });
        return { success: true };
      }

      if ("errorMessage" in validatedResponse) {
        console.error("Error:", validatedResponse.errorMessage);
        set({ loading: false });
        return { success: false };
      }

      set({ loading: false });
      return { success: false };
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation failed:", error);
      } else {
        console.error("Request failed:", error);
      }
      set({ loading: false });
      return { success: false };
    }
  },
}));
