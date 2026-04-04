# ⚡ Endea

A zero-config, type-safe fetch simulator for TypeScript & JavaScript

## 🚀 What is Endea?

Endea is a fake fetch that feels real.

Instead of waiting for a backend, you generate realistic async responses directly in your code:

```typescript
const users = await endea<User>({ name: "John", age: 30 }, { count: 50 });
```

No API. No setup. No stress.

## ✨ Features

- Async like fetch — just await
- Type-safe — powered by TypeScript generics
- Zero config — install and go
- Realistic data — powered by Faker
- Simulate APIs — delay, errors, bulk data

## 📦 Installation

```bash
npm install endea
```

## Usage

## Basic Example

```typescript
import { endea } from "endea";
type User = {
  name: string;
  age: number;
};
const users = await endea<User>({ name: "John", age: 30 }, { count: 3 });

console.log(users);
```

## ⚙️ Advanced Options

```typescript
const users = await endea<User>(
  { name: "John", age: 30 },
  {
    count: 50,
    delay: 500,
    errorRate: 0.1,
  },
);
```

## 🧠 How It Works

Click to expand

1. Reads your input shape
2. Infers types automatically
3. Uses Faker to generate realistic values
4. Wraps everything in a Promise

## 🧩 Use Cases

- 🚧 Frontend development without APIs
- 🧪 UI testing with realistic and flexible data
- ⚡ Rapid prototyping
- 🎯 Error + latency simulation

## ⚠️ Notes

[!IMPORTANT]
Endea currently runs in local mode only (no backend required).

[!TIP]
Keep your initial object realistic — it improves generated data quality.

## 🔮 Roadmap

- Backend integration (type serialization)
- Custom generators
- Plugin system
- Devtools integration

## 🛠️ Built With

- Faker.js (for realistic data generation)

## 🤝 Contributing

PRs are welcome. Open an issue first to discuss changes.

## 📄 License

MIT © Jeremiah Ndiritu
GitHub: <https://github.com/jeremiah-ndiritu/endea>

---

## 💬 Final Thought

What if fetch worked… even when your API doesn’t exist yet?
That’s Endea.
