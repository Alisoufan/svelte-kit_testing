<script lang="ts">
	import { page } from "$app/stores";

	export let logged_in = false;
	export let userNameToShow = "";
	type link = {
		path: string;
		text: string;
		protected: boolean;
	};

	const links: link[] = [
		
		{
			path: "/dashboard",
			text: "Dashboard",
			protected: true
		},
		{
			path: "/account",
			text: "Account",
			protected: true
		},
		{
			path: "/register",
			text: "Register",
			protected: false
		},
		{
			path: "/login",
			text: "Login",
			protected: false
		},
		{
			path: "/logout",
			text: "Logout",
			protected: true
		}
	];
</script>

<nav>
	<ul>
		{#each links as link}
			{#if link.path === "/" || logged_in === link.protected}
				{@const aria_current =
					$page.url.pathname == link.path ? "page" : "false"}
				<li>
					{#if link.path === "/logout" }
						<form action="/logout" method="POST" class="logout-form">
							
								<button class="text-button">{link.text}</button>
							
						</form>
					{:else}
						<a href={link.path} aria-current={aria_current}>
							{link.text}
						</a>
					{/if}
				</li>
			{/if}
		{/each}
		{userNameToShow}
	</ul>
	
</nav>



<style>
	nav {
		padding-block: 1.25rem;
		background-color: var(--nav-color);
	}
	ul {
		list-style-type: none;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.25rem;
	}
	.text-button {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		color: inherit;
		cursor: pointer;
	}
</style>
