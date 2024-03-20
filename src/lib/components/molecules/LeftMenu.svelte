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
			<SidebarItem label="Dashboard" href="/dashboard"></SidebarItem>
			<SidebarItem label="Countries" href="/dashboard/countries"></SidebarItem>
			<SidebarItem label="Regions" href="/dashboard/regions"></SidebarItem>
			<SidebarItem label="Cellars" href="/dashboard/cellars"></SidebarItem>
			<SidebarItem label="Soils" href="/dashboard/soils"></SidebarItem>
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
