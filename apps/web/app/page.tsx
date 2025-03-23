'use client';
import { ContainerScroll } from '@rewara/ui/components/container-scroll-animation';
import { NavbarAnimated } from '@rewara/ui/components/navbar';
import { Typewriter } from '@rewara/ui/components/typewriter';
import { IconBarcode, IconMessages, IconTrendingUp } from '@tabler/icons-react';
import Image from 'next/image';
import type { JSX } from 'react';

export default function Home(): JSX.Element {
  return (
    <div className="relative min-h-screen">
      {/* <AnimatedGradientBackground
        Breathing={true}
        startingGap={125}
        gradientColors={[
          '#0A0A0A',
          '#3D5AFE',
          '#2979FF',
          '#FF80AB',
          '#FF6D00',
          '#FFD600',
          '#00E676',
        ]}
        gradientStops={[35, 50, 60, 70, 80, 90, 100]}
        animationSpeed={0.01}
        breathingRange={5}
        topOffset={0}
        containerClassName="opacity-10"
      /> */}
      <div className="relative z-10">
        <NavbarAnimated />
        <HeroScroll />
      </div>
    </div>
  );
}

function HeroScroll(): JSX.Element {
  return (
    <div className="flex flex-col overflow-hidden pt-[40px] pb-[500px]">
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <div className="mb-10 inline-block rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 px-6 py-2">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text font-medium text-base text-transparent">
                Next Generation B2B Platform
              </span>
            </div>
            <h2 className="mx-auto mb-2 max-w-2xl font-semibold text-2xl text-gray-900 leading-tight sm:text-4xl dark:text-gray-100">
              Real-time insights into sales, customer behavior, and reward
              utilization with
            </h2>
            <br />
            <h1 className="text-4xl text-black dark:text-white">
              <div className="relative mt-1">
                <Typewriter
                  text={[
                    'Data-Driven Insights',
                    'Smart Analytics',
                    'Real-time Feedback',
                  ]}
                  speed={100}
                  loop={true}
                  className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text font-bold text-4xl text-transparent leading-tight md:text-6xl lg:text-[6rem]"
                />
                <div
                  className="-z-10 -translate-y-1/2 absolute inset-0 top-1/2 h-24 w-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl"
                  aria-hidden="true"
                />
              </div>
            </h1>
          </div>
        }
      >
        <Image
          src={
            'https://cdn.dribbble.com/userupload/13312688/file/original-d92951d609a9587a8506d0554c5026e2.png?resize=1024x768&vertical=center'
          }
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      <div className="text-center">
        <div className="relative flex w-full flex-col items-center justify-center rounded-md bg-background antialiased">
          <div className="mx-auto max-w-2xl p-4">
            <h1 className="relative z-10 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-center font-bold font-sans text-lg text-transparent md:text-7xl">
              Join the waitlist
            </h1>
            <p className="relative z-10 mx-auto my-2 mt-5 max-w-200 text-center text-muted-foreground text-sm">
              Rewara is a powerful B2B SaaS platform that helps businesses
              enhance customer engagement through data-driven insights. It
              offers a comprehensive dashboard to track sales analytics,
              customer behavior, and reward utilization, while a customizable
              loyalty system enables personalized offers, tiered rewards, and
              dynamic discounts. With API-driven feedback collection and
              real-time sentiment analysis, businesses can gather insights,
              prioritize issues, and improve customer satisfaction. The
              complaint management system automates ticket handling and tracks
              resolution efficiency. Unique features like churn prediction,
              competitor benchmarking, and real-time alerts empower businesses
              to make smarter decisions, improve customer retention, and
              streamline operations with seamless API integration.
            </p>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-2">
          <button
            type="button"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white shadow-blue-500/25 shadow-lg transition-shadow hover:shadow-blue-500/50"
          >
            Start Free Trial
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-300 px-8 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
          >
            Book Demo
          </button>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-8">
            <div className="-space-x-2 flex">
              {[...new Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 dark:border-black"
                />
              ))}
            </div>
            <p className="text-slate-600 text-sm dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-white">
                2,000+
              </span>{' '}
              businesses trust our platform
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 text-sm dark:text-slate-400">
            <div className="flex items-center gap-2">
              <IconBarcode className="h-4 w-4 text-blue-500" />
              <span>98% Customer Retention</span>
            </div>
            <div className="flex items-center gap-2">
              <IconTrendingUp className="h-4 w-4 text-green-500" />
              <span>35% Revenue Growth</span>
            </div>
            <div className="flex items-center gap-2">
              <IconMessages className="h-4 w-4 text-purple-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
