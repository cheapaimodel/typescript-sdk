# CheapAIModel TypeScript SDK

Lightweight TypeScript / JavaScript client for the [CheapAIModel](https://cheapaimodel.com) API.

CheapAIModel is OpenAI-compatible, so this SDK extends the official `openai` package — every method you know from OpenAI works the same way.

## Install

```bash
npm install @cheapaimodel/sdk
```

## Usage

```ts
import { CheapAIModel } from "@cheapaimodel/sdk";

const client = new CheapAIModel(); // reads CHEAPAIMODEL_API_KEY

const res = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(res.choices[0].message.content);

// Shortcut for one-off prompts
console.log(await client.chatText("Give me a fun fact about Vietnam."));
```

### Streaming

```ts
const stream = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "Tell me a joke" }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}
```

## Configuration

| Option | Env variable | Default |
| --- | --- | --- |
| `apiKey` | `CHEAPAIMODEL_API_KEY` | — (required) |
| `baseURL` | `CHEAPAIMODEL_BASE_URL` | `https://api.cheapaimodel.com/v1` |

Any other OpenAI client option (`timeout`, `maxRetries`, ...) is passed straight through.

## Development

```bash
npm install
npm run build
```

## License

MIT
