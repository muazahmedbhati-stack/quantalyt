import OpenAI from 'openai';

export function createNvidiaClient(apiKey: string) {
  return new OpenAI({
    apiKey,
    baseURL: 'https://integrate.api.nvidia.com/v1',
  });
}

export async function streamNvidiaChat(
  apiKey: string,
  model: string,
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  systemPrompt: string
): Promise<ReadableStream> {
  const client = createNvidiaClient(apiKey);

  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const stream = await client.chat.completions.create({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages,
          ],
          stream: true,
          max_tokens: 1024,
          temperature: 0.7,
        });

        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || '';
          if (text) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        const err = error as Error;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`));
        controller.close();
      }
    },
  });
}
