<script>
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		DropdownItem,
		DropdownDivider
	} from 'flowbite-svelte';
	import logo from '../assets/img/logo.png';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
</script>

<div class="nav-container">
	<Navbar>
		<NavBrand href="/">
			<div class="logo-title">
				<img src={logo} alt="Logo" class="logo-image" />
				<hr />
				<span class="brand-name"><span class="highlight-letter">C</span>arta de Vins</span>
			</div>
		</NavBrand>
		<NavHamburger />
		<NavUl {activeUrl}>
			<div class="relative dropdown">
				<span class="link flex items-center">
					<span class="highlight-letter">A</span>dmin<NavLi class="cursor-pointer">
						<ChevronDownOutline class="w-3 h-3 ms-2 dark:text-white inline" />
					</NavLi>
				</span>

				<div class="dropdown-menu hidden absolute bg-white shadow-md mt-1">
					<DropdownItem href="/">Panell de Control</DropdownItem>
					<DropdownItem href="/">Crear Vi</DropdownItem>
					<DropdownItem href="/">Editar Vi</DropdownItem>
					<DropdownItem href="/docs/components/navbar">Config</DropdownItem>
					<DropdownItem href="/">Finances</DropdownItem>
					<DropdownDivider />
					<DropdownItem href="/">Sortir</DropdownItem>
				</div>
			</div>

			<span class="background">
				<span class="link"
					><NavLi href="/settings"
						><span class="highlight-letter">B</span><span class="text-color">uscador Avançat</span
						></NavLi
					></span
				>
				<span class="link"
					><NavLi href="/pricing"><span class="highlight-letter">C</span>arta Clássica</NavLi></span
				>
				<span class="link"
					><NavLi href="/contact"><span class="highlight-letter">A</span>ccedeix</NavLi></span
				>
			</span>
		</NavUl>
	</Navbar>
</div>

<style>
	.nav-container {
		margin-bottom: 2rem;
	}

	.logo-title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.logo-image {
		height: 2rem;
		width: auto;
		margin-bottom: 5px;
	}

	hr {
		border: 1px solid #83072d;
		width: 100%;
		margin: 5px 0;
	}

	.brand-name,
	.highlight-letter {
		font-weight: bold;
		color: black;
		font-size: 0.8rem;
	}

	.link {
		position: relative;
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		margin-right: 10px;
	}

	.link:hover .highlight-letter {
		color: #83072d;
	}

	.link::after {
		content: '';
		position: absolute;
		bottom: -3px;
		left: 50%;
		right: 50%;
		height: 2px;
		background-color: transparent;
		transition: all 0.3s ease;
	}

	.link:hover::after {
		background-color: #83072d;
		left: 0;
		right: 0;
	}

	.dropdown {
		position: relative;
	}

	.dropdown-menu {
		display: none;
		position: absolute;
		left: 0;
		top: 100%;
		background-color: white;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
		min-width: 200px;
		z-index: 20;
	}

	.dropdown:hover .dropdown-menu {
		display: block;
	}

	.background {
		background-color: transparent;
		color: black;
	}
</style>
