### Rewara

A B2B SaaS platform that provides businesses with a comprehensive dashboard to analyze customer engagement, manage loyalty programs, collect and act on feedback, and improve customer satisfaction through data-driven insights.

![b2b-saas](./assets//b2bsass.jpg)

> [!NOTE]
> Rewara is a hackathon project built under 6 hours. The project is not production-ready and lacks many features. Uses mock data for analytics and rewards. If i get time, i will implement the missing features.

#### Screenshots

| Dashboard                            | Rewards                          | Feedback                           |
| ------------------------------------ | -------------------------------- | ---------------------------------- |
| ![dashboard](./assets/dashboard.png) | ![rewards](./assets/rewards.png) | ![feedback](./assets/feedback.png) |

| Analytics                            | API Docs Expanded                              | API Docs                     |
| ------------------------------------ | ---------------------------------------------- | ---------------------------- |
| ![analytics](./assets/analytics.png) | ![api-expanded](./assets/apidocs-expanded.png) | ![api](./assets/apidocs.png) |

| Login                        | Signup                         | Settings                           |
| ---------------------------- | ------------------------------ | ---------------------------------- |
| ![login](./assets/login.png) | ![signup](./assets/signup.png) | ![settings](./assets/settings.png) |

| Products                           | Landing                          |
| ---------------------------------- | -------------------------------- |
| ![products](./assets/products.png) | ![landing](./assets/landing.png) |

#### Local Development

```bash
# Clone the repository
git clone https://github.com/parazeeknova/rewara.git

# Install dependencies
pnpm i or pnpm install

# Lint or format code (optional)
pnpm lint or pnpm format

# Setup environment variables (development)
pnpm run env:dev

# Start the development server (docker)
pnpm run docker:dev
# Run prisma migrations
pnpm run prisma:up

# Copy envs to .env
cp .env.example .env

# Start the development server
pnpm dev
```
