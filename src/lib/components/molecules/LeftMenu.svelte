<script>
	import { page } from '$app/stores';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	// import {
	// 	ChartPieSolid,
	// 	GridSolid,
	// 	MailBoxSolid,
	// 	UserSolid,
	// 	ArrowRightToBracketSolid,
	// 	FileEditSolid
	// } from 'flowbite-svelte-icons';
	$: activeUrl = $page.url.pathname;
</script>

<Sidebar {activeUrl}>
	<SidebarWrapper>
		<SidebarGroup>
			<SidebarItem label="Panell de Control" href="/dashboard"></SidebarItem>
			<SidebarItem label="Paísos" href="/dashboard/countries"></SidebarItem>
			<SidebarItem label="Regions" href="/dashboard/regions"></SidebarItem>
			<SidebarItem label="Tipus de vi" href="/dashboard/wineTypes"></SidebarItem>
			<SidebarItem label="Raïms" href="/dashboard/grapes"></SidebarItem>
			<SidebarItem label="Cellers" href="/dashboard/cellars"></SidebarItem>
			<SidebarItem label="Terres" href="/dashboard/soils"></SidebarItem>
			<SidebarItem label="Sulfits" href="/dashboard/sulphites"></SidebarItem>
			<SidebarItem label="Vins" href="/dashboard/wines"></SidebarItem>
			<SidebarItem label="Stock" href="/dashboard/stock"></SidebarItem>
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
