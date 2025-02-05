<script lang="ts">
	import "$lib/admin/styles.css"
	import Hamburger from "$lib/home/components/Hamburger.svelte"
	import { page } from "$app/stores"
	import Icon from "@iconify/svelte"
	import cn from "$lib/cn"
	import { SKIN_IMAGE, user } from "$lib/utils"

	type Nav =
		| {
				type: "nav"
				text: string
				icon: string
				href: string
				optional?: boolean
				allowed?: () => boolean
		  }
		| {
				type: "title"
				text: string
		  }
		| {
				type: "spacer"
		  }

	const NAVS: Nav[] = [
		{
			type: "title",
			text: "MENU",
		},
		{
			type: "nav",
			text: "Home",
			icon: "iconamoon:home-fill",
			href: "/",
		},
		{
			type: "nav",
			text: "Dashboard",
			icon: "fluent:person-32-filled",
			href: "/dashboard",
		},
		{
			type: "nav",
			text: "Store",
			icon: "fa6-solid:store",
			href: "/dashboard/store",
			optional: true,
		},
		// { type: "spacer" },
		// {
		//     type: "title",
		//     text: "Tickets",
		// },
		// {
		//     type: "nav",
		//     text: "Tickets",
		//     icon: "ion:ticket-sharp",
		//     href: "/dashboard/tickets",
		// },
		// {
		//     type: "nav",
		//     text: "Staff",
		//     icon: "fa-solid:user-tie",
		//     href: "/dashboard/tickets/support",
		// },
		// {
		//     type: "nav",
		//     text: "Review",
		//     icon: "fa6-solid:magnifying-glass",
		//     href: "/dashboard/tickets/review",
		// },
		// {
		//     type: "nav",
		//     text: "Categories",
		//     icon: "uiw:bar-chart",
		//     href: "/dashboard/tickets/manage",
		// },

		{ type: "spacer" },
		{
			type: "title",
			text: "SETTINGS",
		},
		{
			type: "nav",
			text: "Security",
			icon: "simple-icons:cyberdefenders",
			href: "/dashboard/security",
		},
		{
			type: "nav",
			text: "Payments",
			icon: "fluent:wallet-credit-card-32-filled",
			href: "/dashboard/payments",
		},
	]

	let opened: boolean = false
</script>

<div class="min-h-dvh grid [grid-template-columns:_16rem_1fr]">
	<div
		class={cn(
			"max-h-dvh w-64 z-30 h-full -translate-x-full lg:translate-x-0 absolute lg:sticky top-0 border-e overflow-hidden shadow-lg p-8 overflow-y-auto",
			"sidebg sideborder",
			"duration-500 transition-transform lg:transition-none",
			{ "translate-x-0": opened }
		)}
	>
		<div
			class="flex gap-4 relative after:absolute after:-bottom-4 after:w-full after:h-1 after:rounded-3xl after:bg-lightblue"
		>
			<img
				class="aspect-square rounded-2xl w-16 h-auto"
				src={SKIN_IMAGE}
				width="64"
				height="64"
				alt="User Profile"
			/>

			<div>
				<h1 class="text-lg font-semibold mb-1 dark:text-white">
					{user.name}
				</h1>
				<span
					class="uppercase text-white font-semibold text-xs rounded-lg bg-lighterblue p-2"
				>
					Premium
				</span>
			</div>
		</div>

		<ul class="flex flex-col gap-2.5 mt-20">
			{#each NAVS as nav, idx}
				{@const prev = NAVS[idx - 1]}
				{#if nav.type === "title"}
					<li
						class="uppercase select-none text-sm font-semibold text-darkbody/75 dark:text-lightbody/75"
						class:mt-6={prev?.type === "spacer"}
					>
						{nav.text}
					</li>
				{/if}

				{#if nav.type === "nav" && (!nav.allowed || nav.allowed())}
					{@const active = nav.optional
						? $page.url.pathname.startsWith(nav.href)
						: nav.href === $page.url.pathname}

					<li class:mt-6={prev?.type === "spacer"}>
						<a
							class={cn(
								"text-xl select-none text-darkbody dark:text-lightbody font-semibold flex items-center gap-2 duration-300",
								"hover:text-orange-400 hover:dark:text-orange-400",
								{
									"text-orange-400": active,
									"dark:text-orange-400": active,
								}
							)}
							href={nav.href}
							aria-label={nav.text}
						>
							<Icon icon={nav.icon} width="20" height="20" />
							{nav.text}
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
	<div class="bg-dashbody/75 dark:bg-[#101018] w-screen lg:w-full">
		<div
			class="flex justify-between p-4 bg-lightbody dark:bg-darkerblue border-b sideborder"
		>
			<!-- <div>
				<img
					width="48"
					height="48"
					class="aspect-square"
					src="/exp64.png"
					alt="Logo"
				/>
			</div> -->
			<div class="size-12 grid place-items-center text-lg font-medium">
				Demo
			</div>

			<div class="text-white">
				<Hamburger
					clicked={() => (opened = !opened)}
					class="md:block lg:hidden"
				/>
			</div>
		</div>
		<div
			class="container mx-auto text-white dashdivider px-4 py-4 mb-4 md:mb-16 overflow-hidden md:px-0"
		>
			<slot />
		</div>
	</div>
</div>
