import { instance } from "@/services/axios";
import { z } from "zod";
import { create } from "zustand/react";
import { AxiosError } from "axios";
import { devtools, persist } from "zustand/middleware";

interface InviteStore {
  loading: boolean;
  invite: (data: {
    name: string;
    email: string;
  }) => Promise<{ success: true } | { success: false; errorMessage: string }>;
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

export const useInviteService = create<InviteStore>()(
  devtools(
    persist(
      (set) => ({
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

            set({ loading: false });
            return { success: false, errorMessage: "It's not you, it's us" };
          } catch (error) {
            set({ loading: false });

            if (error instanceof z.ZodError) {
              return { success: false, errorMessage: error.message };
            }

            if (error instanceof AxiosError) {
              return {
                success: false,
                /**
                 * Note: Determine the convention of errorMessage and display
                 * error message that's more friendly to user
                 */
                errorMessage:
                  error.response?.data?.errorMessage ?? error.message,
              };
            }

            return { success: false, errorMessage: "Looks like we hit a snag" };
          }
        },
      }),
      { name: "invitation" }
    ),
    { name: "invitation" }
  )
);
