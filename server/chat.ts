import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildPortfolioKnowledge } from '../src/data/portfolioKnowledge';

const PORT = Number(process.env.PORT) || 8787;
/** Default: Gemini 1.5 names return 404 on current API; use current stable 2.5 Flash. */
const MODEL =
  process.env.GEMINI_MODEL?.trim() || 'gemini-2.5-flash';
const MAX_MESSAGE_LEN = 4000;
const MAX_HISTORY_TURNS = 20;

type Role = 'user' | 'assistant';

interface ChatMessage {
  role: Role;
  content: string;
}

const app = express();
app.use(
  cors({
    origin:
      process.env.FRONTEND_ORIGIN?.split(',').map((o) => o.trim()) ?? true,
  })
);
app.use(express.json({ limit: '48kb' }));

const knowledge = buildPortfolioKnowledge();

const systemPreamble =
  knowledge +
  '\n\nYou are a helpful career assistant for visitors to this portfolio site. Keep replies concise unless the user asks for detail.';

app.post('/api/chat', async (req, res) => {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) {
    res.status(503).json({
      error: 'Chat is not configured. Set GEMINI_API_KEY on the server.',
    });
    return;
  }

  const raw = req.body?.messages;
  if (!Array.isArray(raw) || raw.length === 0) {
    res.status(400).json({ error: 'Expected non-empty messages array.' });
    return;
  }

  const messages: ChatMessage[] = raw
    .filter(
      (m: unknown): m is ChatMessage =>
        !!m &&
        typeof m === 'object' &&
        (m as ChatMessage).role !== undefined &&
        typeof (m as ChatMessage).content === 'string'
    )
    .map((m: ChatMessage) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content).slice(0, MAX_MESSAGE_LEN),
    }));

  if (messages.length === 0 || messages[messages.length - 1]?.role !== 'user') {
    res
      .status(400)
      .json({ error: 'Last message must be from the user.' });
    return;
  }

  const trimmed = messages.slice(-MAX_HISTORY_TURNS);

  try {
    const genAI = new GoogleGenerativeAI(key);
    const geminiModel = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: systemPreamble,
    });

    const history = trimmed.slice(0, -1).map((m) => ({
      role: m.role === 'user' ? ('user' as const) : ('model' as const),
      parts: [{ text: m.content }],
    }));

    const lastUser = trimmed[trimmed.length - 1].content;
    const chat = geminiModel.startChat({ history });
    const result = await chat.sendMessage(lastUser);
    const text = result.response.text();

    if (!text?.trim()) {
      res.status(502).json({ error: 'Empty model response.' });
      return;
    }

    res.json({ reply: text });
  } catch (e) {
    let msg = e instanceof Error ? e.message : 'Model request failed.';
    if (/429|Too Many Requests|quota|Quota|limit:\s*0/i.test(msg)) {
      msg =
        'Gemini quota or rate limit hit (your project may have no free allowance for this model). ' +
        'Wait and retry, set GEMINI_MODEL to another model (e.g. gemini-2.5-flash), or check billing/limits in Google AI Studio.';
    } else if (msg.length > 500) {
      msg = msg.slice(0, 480) + '…';
    }
    console.error('[api/chat]', e);
    res.status(502).json({ error: msg });
  }
});

app.listen(PORT, () => {
  console.log(`[gemini] API http://localhost:${PORT} (model ${MODEL})`);
});
