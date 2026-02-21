import OpenAI from "openai";
import { SYSTEM_PROMPT, getPortfolioPrompt, getFaqPrompt, getReviewPrompt } from "./prompts";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export type GenerateType = "portfolio_desc" | "faq_answer" | "review_polish";

export interface GenerateContext {
  region?: string;
  space?: string;
  duration?: string;
  category?: string;
  question?: string;
  memo?: string;
}

export async function generateContent(
  type: GenerateType,
  prompt: string,
  context?: GenerateContext
): Promise<string> {
  if (!openai) throw new Error("OpenAI API not configured");

  let userPrompt = prompt;
  if (type === "portfolio_desc" && context) {
    userPrompt = getPortfolioPrompt(
      context.region ?? "",
      context.space ?? "",
      context.duration ?? "",
      context.category ?? ""
    );
  } else if (type === "faq_answer" && context?.question) {
    userPrompt = getFaqPrompt(context.question);
  } else if (type === "review_polish" && context?.memo) {
    userPrompt = getReviewPrompt(context.memo);
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 500,
  });

  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) throw new Error("Empty response from OpenAI");
  return content;
}
