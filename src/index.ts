import OpenAI, { type ClientOptions } from "openai";

export const DEFAULT_BASE_URL = "https://api.cheapaimodel.ai/v1";
export const VERSION = "0.1.0";

export interface CheapAIModelOptions extends Omit<ClientOptions, "apiKey" | "baseURL"> {
  /** Defaults to process.env.CHEAPAIMODEL_API_KEY */
  apiKey?: string;
  /** Defaults to process.env.CHEAPAIMODEL_BASE_URL or https://api.cheapaimodel.ai/v1 */
  baseURL?: string;
}

function env(name: string): string | undefined {
  return typeof process !== "undefined" ? process.env?.[name] : undefined;
}

/**
 * CheapAIModel client. CheapAIModel is OpenAI-compatible, so this extends the
 * official OpenAI client: every OpenAI method works the same way.
 */
export class CheapAIModel extends OpenAI {
  constructor(options: CheapAIModelOptions = {}) {
    const apiKey = options.apiKey ?? env("CHEAPAIMODEL_API_KEY");
    if (!apiKey) {
      throw new Error(
        "No API key found. Pass { apiKey } or set the CHEAPAIMODEL_API_KEY environment variable."
      );
    }
    const baseURL = options.baseURL ?? env("CHEAPAIMODEL_BASE_URL") ?? DEFAULT_BASE_URL;
    super({ ...options, apiKey, baseURL });
  }

  /** Shortcut: send one user message and return the reply text. */
  async chatText(prompt: string, model = "glm-5.3-flash"): Promise<string> {
    const res = await this.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
    });
    return res.choices[0]?.message?.content ?? "";
  }
}

export default CheapAIModel;
