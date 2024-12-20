import { z } from "zod";
import { instance } from "./axios";

const InvitationSuccessSchema = z.object({
  data: z.string(),
  status: z.number(),
});

const InvitationErrorSchema = z.object({
  errorMessage: z.string(),
  status: z.number(),
});

const responseSchema = z.union([
  InvitationSuccessSchema,
  InvitationErrorSchema,
]);

export const invite = async (request: {
  name: string;
  email: string;
}): Promise<{ success: boolean }> => {
  try {
    const response = await instance.post("/prod/fake-auth", request);

    const validatedResponse = responseSchema.parse(response);

    if (typeof validatedResponse === "string") {
      console.log("Success:", validatedResponse);
      return { success: true };
    }

    if (
      typeof validatedResponse === "object" &&
      "errorMessage" in validatedResponse
    ) {
      console.error("Error:", validatedResponse.errorMessage);
      return { success: false };
    }

    return { success: false };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed:", error);
      return { success: false };
    } else {
      console.error("Request failed:", error);
      return { success: false };
    }
  }
};
