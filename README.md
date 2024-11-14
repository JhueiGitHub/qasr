### Components

#### AceternityUI Floating Dock

##### Usage

```
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}

```

##### Manual Installation

###### Install Dependencies

```
npm i framer-motion clsx tailwind-merge @tabler/icons-react
```

###### Add util file

‘lib/utils.ts’

```
import { ClassValue, clsx } from "clsx";import { twMerge } from "tailwind-merge"; export function cn(...inputs: ClassValue[]) {  return twMerge(clsx(inputs));}
```

###### Copy the source code

```
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  href={item.href}
                  key={item.title}
                  className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end  rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}

```

##### Props

###### Floating Dock

| Prop Name          | Type                                                       | Description                               |
| ------------------ | ---------------------------------------------------------- | ----------------------------------------- |
| `items`            | `{ title: string; icon: React.ReactNode; href: string }[]` | Array of items to display in the dock.    |
| `desktopClassName` | string                                                     | Optional class name for the desktop dock. |
| `mobileClassName`  | string                                                     | Optional class name for the mobile dock.  |

###### Floating Dock Mobile

| Prop Name   | Type                                                       | Description                                   |
| ----------- | ---------------------------------------------------------- | --------------------------------------------- |
| `items`     | `{ title: string; icon: React.ReactNode; href: string }[]` | Array of items to display in the mobile dock. |
| `className` | string                                                     | Optional class name for the mobile dock.      |

###### Floating Dock Desktop

| Prop Name   | Type                                                       | Description                                    |
| ----------- | ---------------------------------------------------------- | ---------------------------------------------- |
| `items`     | `{ title: string; icon: React.ReactNode; href: string }[]` | Array of items to display in the desktop dock. |
| `className` | string                                                     | Optional class name for the desktop dock.      |

###### IconContainer Component

| Prop Name | Type              | Description                                  |
| --------- | ----------------- | -------------------------------------------- |
| `mouseX`  | `MotionValue`     | Motion value for the mouse X position.       |
| `title`   | `string`          | Title of the item.                           |
| `icon`    | `React.ReactNode` | Icon to display for the item.                |
| `href`    | `string`          | URL to navigate to when the item is clicked. |

This component is inspired by floating dock on menu on [Rauno's website](https://rauno.me/) and it's implementation on [Build UI](https://buildui.com/recipes/magnified-dock).

#### DaisyUI Window Mockup

Window mockup shows a box that looks like an operating system window.

##### Install daisyUI as a Tailwind CSS plugin

###### 1. Install daisyUI as a Node package:

```
npm i -D daisyui@latest
```

###### 2. Add daisyUI to tailwind.config.js:

```
module.exports = {
  //...
  plugins: [
    require('daisyui'),
  ],
}
```

##### Components Usage

Once you [installed daisyUI](https://daisyui.com/docs/install/), you can use component classes like `btn`, `card`, etc.

1. So instead of making a button using only utility classes:

```html
<button
  class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
>
  Button
</button>
```

2. You can just use a component class like this:

```html
<button class="btn">Button</button>
```

3. Then you can modify the component with daisyUI additional utility classes:

```html
<button class="btn btn-primary">Button</button>
```

4. Or you can modify the component with Tailwind CSS utility classes:

```html
<button class="btn w-64 rounded-full">Button</button>
```

##### Window Mockup

###### Window mockup with border

```html
<div className="mockup-window border-base-300 border">
  <div className="border-base-300 flex justify-center border-t px-4 py-16">
    Hello!
  </div>
</div>
```

###### Window mockup with background colour

````html
<div className="mockup-window bg-base-300 border">
  <div className="bg-base-200 flex justify-center px-4 py-16">Hello!</div>
</div>
``` ### OrionOS #### Project Structure ``` dirtree - app/ - (auth)/ - sign-in/ -
sign-up/ - layout.tsx - api/ - flow/ - initial-profile/ - profile/ - servers/ -
sidebar-data/ - uploadthing/ - apps/ - finder/ - App.tsx - globals.css -
layout.tsx - page.tsx - settings/ - App.tsx - globals.css - layout.tsx -
page.tsx - claude/ - App.tsx - globals.css - layout.tsx - page.tsx - onyx/ -
App.tsx - globals.css - layout.tsx - page.tsx - obsidian/ - App.tsx -
globals.css - layout.tsx - page.tsx - figma/ - App.tsx - globals.css -
layout.tsx - page.tsx - tor/ - App.tsx - globals.css - layout.tsx - page.tsx -
desktop/ - App.tsx - globals.css - layout.tsx - page.tsx - home/ - App.tsx -
globals.css - layout.tsx - page.tsx - trash/ - App.tsx - globals.css -
layout.tsx - page.tsx - (os)/ - components/ - ui/ - floating-dock.tsx -
window-mockup.tsx - desktop.tsx - os-window.tsx - dock.tsx - menu-bar.tsx -
debounce-indicator.tsx - hooks/ - useWindowManager.tsx - useGenieEffect.tsx -
useOrigin.tsx - useDnd.tsx - dashboard/ - page.tsx - layout.tsx - globals.css -
lib/ - create-zenith.ts - current-profile.ts - db.ts - initial-profile.ts -
uploadthing.ts - utils.ts - prisma/ - schema.prisma - public/ - fonts/ -
Dank.otf - ExemplarPro.otf - icns/ - finder.png - settings.png - claude.png -
onyx.png - obsidian.png - figma.png - tor.png - desktop.png - home.png -
trash.png - folder.png - file.png - media/ - authBg.mp4 - stellarBg.mp4 -
marianaRed.mp4 - types/ - appTypes.ts - .env - .env.local - .eslintrc.json -
.gitignore - components.json - liveblocks.config.ts - middleware.ts -
next-env.d.ts - next.config.mjs - package-lock.json - package.json -
postcss.config.mjs - README.md - tailwind.config.ts - tsconfig.json - types.ts
````

#### Tech Stack

- Electron (Native Desktop Experience)
- NextJS (TypeScript, Tailwind, App Router)
- Clerk (Authentication)
- NeonDB (PostgreSQL)
- Prisma
- ShadCN, AceternityUI, MagicUI, DaisyUI (UI)
- Framer Motion (Animations)
- Zustand (States)
- Socket.io (Web Sockets)
- Stripe (Payments)
- Vercel (Deployment)

#### Zenith OS Flow

```
Underlying BG: #292929 81%
Overlaying BG: #010203 69%
Brd: #292929 81%
Black: #000000
Glass: #000000 30%
White: #CCCCCC 69%
Active: #28C840
Warning: #FEBC2E
Error: #FF5F57

Lilac Accent: # 7B6CBD 100%
Teal Accent: #003431 100%

Text Primary (Hd): # ABC4C3 100%
Text Secondary (Bd): #748393 100%

Text Primary Font - Ariel
Text Secondary Font - Inter
```

#### Development Philosophy

_PFP_ - “Elon Musk's _Problem-First Philosophy_ of teaching - if you want to learn engineering (specifically an engine for example) you should start with the ENGINE (as oppose to trying to learn all of the tools first without any context) thoroughly get to grips with the concepts and then by doing so and working backwards _the use and function of the necessary tools become apparent naturally_”

### _Discord Architecture Docs_

1. Setup folder structure

   1. Amend root layout font from Inter to Open_Sans
   2. Change metadata title from "Create Next App" to "Team Chat Application"
   3. Create route:
      - create new folder; "test" -> setup page.tsx with "sfc" -> name "Test Page" -> create div; "<>Test Page!<>"
   4. Create organisational folder:
      - create new folder; "(auth)" -> create route; "login" -> page.tsx, "sfc", "Login Page" -> "<>Login page!<>"
      - create new organisational layout; "(auth)/layout.tsx", "sfc", "AuthLayout"
      - extract "{ children }" from props and set type; ": " as "{ children: React.ReactNode }"
      - create div; "<>{children}<>"
      - set background to red; "<... className="bg-red-500 h-full">"
      - create new route; "register" -> setup page.tsx, "<>Register!<>" (red background applies)
      - create sub-organisational folder; "(routes)" -> move "login" and "register"
      - remove "test"
   5. Organise root page.tsx file; create new organisational route; "(main)/(routes)", move page.tsx (unaffected)

2. Setup authentication

   1. create Clerk app; "discord-clone"; "e-mail", "Google" -> paste keys into ".env" + add to ".gitignore"
   2. "npm install @clerk/nextjs"
   3. mount the Clerk Provider (always to Root layout.tsx); wrap return content in <ClerkProvider />
   4. secure next app (main routes only accessible post-login); create "middleware.ts" file, paste from Clerk docs
   5. setup "sign-in/up" pages; remove "login/register", create new "(auth)/(routes)/sign-(in/up)/" routes
   6. create catchall routes inside both routes using square brackets; "((...sign-in/up))"
   7. create "page.tsx" files in both catchall routes and paste from Clerk docs
   8. add ".env" variables for "signIn", "signUp", "afterSignIn" and "afterSignUp" paths; "/sign-(in/up)", "/,/"
   9. amend (auth) layout to centre Clerk components; remove red bg, set "flex items-centre justify-centre"
   10. Add Clerk user button to main page.tsx file; import { UserButton }, "<UserButton afterSignOutUrl..."/" />

3. Setup day/night themes

   1. "npm i next-themes"
   2. copy "theme-provider.tsx" from Next docs; "Dark Mode", "Next.js" to "components/providers"
   3. import { ThemeProvider } into the Root layout.tsx and wrap {children} (inside body) with tags
   4. set <ThemeProvider /> props and add "suppressHydrationWarning" to <html /> tag
   5. copy "mode-toggle.tsx" component from shadcn docs inside "components/ui", install dropdown-menu component
   6. add component to main page.tsx file; import and and <ModeToggle /> underneath <UserButton /> component
   7. define light/dark theme colours; import { cn }, wrap body's "font.className" in cn() and set TW classes

4. Setup database + Prisma

   1. install Prisma; "npm i -D prisma", "npx prisma init"
   2. create database, copy URL to ".env"
   3. setup schema; copy "schema.prisma" from database docs into "prisma/schema.prisma" and create models:
      - Profile; "id", "userId", "name", "imageUrl", "email", "createdAt"
   4. setup "lib/db.ts" util file (to restrict unnecessary Prisma client initialisations);
      - "npm i @prisma/client"
      - in "db.ts"; import { PrismaClient }, declare global var, export conditional "db" const using "globalThis"
   5. setup initial discord profile functionality;
      - remove the "(main)/..." directory and create "(setup)" with an "sfc" page.tsx named "SetupPage"
      - set the arrow function to "async" and return only a div; "<>Create a Server<>"
      - create a new "lib/initial-profile.ts" util file;
        - import { currentUser, redirectToSignIn } from "@clerk/nextjs" and { db } from "@/lib/db"
        - attempt to fetch current Clerk user; export async "initialProfile", "const user = await currentUser"
        - redirect if user doesn't exist; "if(!user) { return redirectToSignIn(); }"
        - attempt to find profile model; "const profile = await db.profile.findUnique({ where: { ... } });"
        - if there is a profile, simply return it; "if (profile) { return profile; }"
        - if not; "create newProfile = await.db.profile.create({ data: { ... } });", "return profile;"
      - add functionality to setup page.tsx; import { initialProfile }, "const profile = await initialProfile()"
   6. attempt to find any servers the profile is a member of;
      - import { db } into setup page.tsx
      - inside the async SetupPage const add; "const server = await db.server.findFirst({ where: { ... } })"
   7. create a server if none exist;
      - import { redirect } from "next/navigation";
      - "if (server) { return redirect('/servers/${server.id}'); }"

5. Modals setup

6. File upload setup

7. Server creation API
   1. "npm install axios"
   2. import into initial-modal
   3. ...

#### _Discord Architecture Docs V2_

_(setup)_

- npx create-next-app@latest discord-clone (App Router, no src/)
- npx shadcn-ui@latest init (Default, Stone)

_(auth)_

- Wrap _root layout_ in <ClerkProvider /> and create (auth) routes.
- The .env files' "NEXT*PUBLIC_CLERK_SIGN_IN_URL=*/sign-in\_", due to Next routing, points directly to an app/(auth)/(routes)/sign-in/[[sign-in]]
- The (auth)/layout.tsx controls the (bg-red e.g.) for the sign-in page that displays the clerk panel.
- Import { UserButton } and add to main page - _(main)/(routes)/page.tsx_ along with an "afterSignOutUrl="/" to prevent redirection to Clerk servers.

_Themes_

- Install "npm i next-themes"
- Go to ui.ShadCN.com -> Dark Mode
- Create _"providers"_ folder within the _app/components_ directory -> create a _theme-provider.tsx_ -> paste from ShadCN
- Import your { ThemeProvider } and add within the _body_ of your _app/layout.tsx_
- Add an "attribute", "defaultSystem", "enableSystem" and unique "storageKey" to the <ThemeProvider />
- Add a _suppressHydrationWarning_ to the <html /> tag
- Add the ShadCN _mode-toggle.tsx_ component along with the required _dropdown-menu.tsx_ and add alongside <UserButton /> in the main page.tsx
- Now amend the Dark Mode background colour by containing the _font. body ClassName in cn()_, that we imported at the top of the app/layout.tsx and add _"bg-white dark:bg-(#313338)"_

_Database_

- Install "npm i -D prisma" -> "npx prisma init"
- _Create a new MySQL Database_ on PlanetScale -> paste url in .env -> update schema.prisma config
- Create models within the schema.prisma file - _Profile_, _Server_, _Member_, _Channel_
- (Every time you update your prisma.schema file) Run _npx prisma generate_ - _npx prisma db push_
- Install "npm i @prisma/client"
- Create a db.ts util file within the root lib/ directory that contains the functionality to prevent hot reloading from initialising too many Prisma clients (globalThis.prisma is a common method used to avoid hot reload affection for development purposes)

_Profile Setup_

- Delete the (main) directory and replace with a fresh (setup) directory containing a fresh page.tsx
- Init file with "sfc" -> create a SetupPage const with an asynchronous arrow function
- Create a new "initial-profile.ts" that tests if a user's profile already exists and creates one for them if not
- Import { initialProfile } into the new (setup)/page.tsx and create a profile const within SetupPage{}
- Create a server const that checks what servers a profile is currently a member of

### OrionOS Architecture Docs

#### _Phase 1 - Zenith_

1. ‘npx create-next-app@latest ./’ -> Tailwind, Typescript, ‘app/’, App Router
2. ‘npm i framer-motion, ...’
3. ‘npx shadcn@latest init’
4. Create desktop with black wallpaper
5. Create dock using full Aceternity Dock, containing 10 apps and incorporating the Zenith design system values and aligned to the centre bottom of the desktop screen with a margin from the bottom of 9px
6. Apply robust hover reveal mechanic that intelligently detects when the users cursor is travelling towards the active dock area and trigger the reveal animation with a speed that matches the users cursor and animates in using a framer motion animation
