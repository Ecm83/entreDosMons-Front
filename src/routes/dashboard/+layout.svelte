<script>
	import '../../app.css';
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

<div class="container mx-auto">
	<!-- <h1>DASHBOARD PAGE MAIN</h1> -->
	<div class="flex gap-4">
		<div class="">
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
		</div>
		<div class="w-full">
			<div class="flex flex-wrap mx-2">
				<slot />
			</div>
		</div>
	</div>
</div>
