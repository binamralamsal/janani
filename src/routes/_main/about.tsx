import { ChevronRightIcon } from "lucide-react";

import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <section className="bg-primary/5 relative overflow-hidden">
        <div className="bg-grid-white/10 dark:bg-grid-black/10 absolute inset-0 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
        <div className="relative container grid gap-8 py-16 md:grid-cols-[3fr_2fr] md:py-20 lg:py-24">
          <div className="space-y-6">
            <div className="bg-background/95 inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium">
              🛒 Our Mission
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-balance md:text-5xl lg:text-6xl">
              Delivering Freshness, Daily
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              From local bazaars to modern households, we are committed to
              providing top-quality groceries with unmatched service.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/"
                className="hover:text-primary font-medium transition"
              >
                Home
              </Link>
              <ChevronRightIcon className="text-muted-foreground h-4 w-4" />
              <span className="text-primary font-medium">About</span>
            </div>
          </div>

          <div className="flex gap-6 md:gap-8 md:justify-self-end lg:gap-12">
            <div className="flex flex-col justify-center gap-2">
              <div className="text-4xl font-bold lg:text-6xl">250+</div>
              <div className="text-muted-foreground font-medium">Products</div>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <div className="text-4xl font-bold lg:text-6xl">10+</div>
              <div className="text-muted-foreground font-medium">
                Years Service
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="h-72 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat md:h-80 lg:h-96"></div>
        <div className="top-0 right-0 bottom-0 left-0 z-10 h-full lg:absolute lg:container">
          <div className="bg-primary text-primary-foreground py-6 md:p-8 lg:absolute lg:top-1/2 lg:right-0 lg:max-w-[600px] lg:rounded-3xl lg:px-6">
            <div className="container space-y-2">
              <h2 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                Why Janani Trade?
              </h2>
              <p>
                Janani Trade is dedicated to supplying homes and businesses with
                fresh, high-quality grocery items. We work directly with
                farmers, producers, and distributors to ensure every delivery
                meets our strict standards for quality and freshness. Whether
                it&apos;s grains, spices, or daily essentials, Janani is your
                reliable grocery partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary/10">
        <div className="container grid items-center gap-8 py-16 md:gap-10 md:py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <div className="relative">
            <img
              className="w-full rounded-3xl"
              src="https://unsplash.com/photos/rlLnCS7jIQM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fG1hbmFnZXIlMjBnaXJsfGVufDB8fHx8MTc0NzQ5OTQ0N3ww&force=true&w=640"
              alt="Founder"
              height={400}
              width={400}
            />
          </div>
          <div className="space-y-6 lg:space-y-8">
            <h2 className="max-w-[20ch] text-3xl font-bold tracking-tighter text-balance md:text-4xl lg:text-5xl">
              From Local Markets to Every Nepali Home
            </h2>
            <p className="max-w-[56ch] text-balance">
              Since 2013, we&apos;ve been committed to making high-quality
              groceries accessible across Nepal. What began in a small warehouse
              with limited stock has now expanded to a full-scale supply chain
              serving hundreds of clients.
            </p>
            <p className="max-w-[56ch] text-balance">
              We believe every home deserves access to healthy, safe, and fresh
              food. That’s why we carefully select every item we distribute.
            </p>
            <p className="max-w-[50ch]">
              Join us in our mission to nourish families across the country.
            </p>
            <div className="flex items-center gap-4">
              <img
                className="h-16 w-16 rounded-full object-cover"
                src="https://unsplash.com/photos/rlLnCS7jIQM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fG1hbmFnZXIlMjBnaXJsfGVufDB8fHx8MTc0NzQ5OTQ0N3ww&force=true&w=640"
                alt="Saraswati Sharma"
                height={20}
                width={20}
              />
              <div>
                <strong className="text-lg">Saraswati Sharma</strong>
                <p>Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container grid items-center gap-8 py-16 md:gap-10 md:py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <div className="space-y-6 lg:space-y-8">
            <h2 className="max-w-[20ch] text-3xl font-bold tracking-tighter text-balance md:text-4xl lg:text-5xl">
              A Family Business Built on Trust
            </h2>
            <p className="max-w-[56ch] text-balance">
              I grew up around rice sacks, lentil bags, and the smell of
              cardamom. As the son of the founder, I’ve watched this business
              grow with heart and hard work. Today, I’m proud to carry on this
              legacy.
            </p>
            <p className="max-w-[56ch] text-balance">
              Our goals remain simple—build trust, maintain quality, and support
              local farmers. We supply groceries you can rely on, every time.
            </p>
            <p className="max-w-[50ch]">
              Now, Janani Trade enters the digital world, serving both retail
              and bulk clients nationwide.
            </p>
            <p className="max-w-[50ch] text-balance">
              Thank you for supporting local Nepali businesses.
            </p>
            <div className="flex items-center gap-4">
              <img
                className="h-16 w-16 rounded-full object-cover"
                src="https://unsplash.com/photos/d1UPkiFd04A/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fG1hbnxlbnwwfHx8fDE3NDc0OTcxMTh8MA&force=true&w=640"
                alt="Arjun Bhandari"
                height={20}
                width={20}
              />
              <div>
                <strong className="text-lg">Arjun Bhandari</strong>
                <p>Managing Director</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              className="w-full rounded-3xl"
              src="https://unsplash.com/photos/d1UPkiFd04A/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fG1hbnxlbnwwfHx8fDE3NDc0OTcxMTh8MA&force=true&w=640"
              alt="Arjun Bhandari"
              height={400}
              width={400}
            />
          </div>
        </div>
      </section>

      <section className="bg-primary/10">
        <div className="container grid items-center gap-8 py-16 md:gap-10 md:py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <div className="relative">
            <img
              className="w-full rounded-3xl"
              src="https://unsplash.com/photos/SJvDxw0azqw/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzQ3NDk2ODAxfA&force=true&w=640"
              alt="Binita Koirala"
              height={400}
              width={400}
            />
          </div>
          <div className="space-y-6 lg:space-y-8">
            <h2 className="max-w-[20ch] text-3xl font-bold tracking-tighter text-balance md:text-4xl lg:text-5xl">
              From Stockroom to Strategy
            </h2>
            <p className="max-w-[56ch] text-balance">
              I began my journey at Janani Trade organizing shelves and checking
              deliveries. Today, I manage logistics and client relations for our
              entire network.
            </p>
            <p className="max-w-[56ch] text-balance">
              Our warehouse has grown, our fleet has expanded, and our client
              list keeps growing—but our values remain unchanged.
            </p>
            <p className="max-w-[56ch] text-balance">
              We’re proud to be a Nepali brand connecting homes and businesses
              to trusted grocery products.
            </p>
            <p className="max-w-[50ch]">
              Thank you for trusting us with your family’s essentials.
            </p>
            <div className="flex items-center gap-4">
              <img
                className="h-16 w-16 rounded-full object-cover"
                src="https://unsplash.com/photos/SJvDxw0azqw/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzQ3NDk2ODAxfA&force=true&w=640"
                alt="Binita Koirala"
                height={20}
                width={20}
              />
              <div>
                <strong className="text-lg">Binita Koirala</strong>
                <p>Operations Head</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-secondary-foreground py-10">
        <div className="container flex items-center justify-between gap-2">
          <h2 className="text-xl font-medium md:text-2xl">
            Have questions? Let our grocery experts help.
          </h2>
          <Button variant="secondary" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
