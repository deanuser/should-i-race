import { c as createComponent } from './consts_DGtZZUut.mjs';
import 'piccolore';
import { i as createRenderInstruction, m as maybeRenderHead, e as addAttribute, r as renderTemplate, g as renderComponent, h as Fragment } from './ssr-function_DFINGRnz.mjs';
import { g as getCollection, $ as $$Layout, a as $$Navbar, b as $$PartnerBanner } from './PartnerBanner_D2JhUW7f.mjs';
import { $ as $$TrackCard } from './TrackCard_PtqfkWFg.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$TrackExplorer = createComponent(async ($$result, $$props, $$slots) => {
  const allTracks = await getCollection("tracks");
  const trackTree = {};
  allTracks.forEach((track) => {
    const c = track.data.country || "uk";
    const r = track.data.region || "unknown";
    const sr = track.data.subRegion || "all";
    if (!trackTree[c]) trackTree[c] = {};
    if (!trackTree[c][r]) trackTree[c][r] = {};
    if (!trackTree[c][r][sr]) trackTree[c][r][sr] = [];
    const url = sr === "all" ? `/${c}/${r}/${track.data.slug}` : `/${c}/${r}/${sr}/${track.data.slug}`;
    trackTree[c][r][sr].push({
      name: track.data.name,
      city: track.data.city,
      url
    });
  });
  return renderTemplate`${maybeRenderHead()}<div id="track-explorer" class="bento-card border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden mb-16 shadow-lg"${addAttribute(JSON.stringify(trackTree), "data-tree")}> <div class="absolute inset-0 bg-gradient-to-br from-brightcyan/5 to-transparent pointer-events-none"></div> <!-- Header & Breadcrumbs --> <div class="mb-8 relative z-10 border-b border-white/10 pb-6"> <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-5"> <div> <h2 class="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-3"> <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-brightcyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
Browse Tracks
</h2> <p class="text-slate-400 text-lg">
Search or click through categories to find your venue.
</p> </div> <!-- Breadcrumb Container --> <nav id="explorer-breadcrumbs" class="flex flex-wrap text-sm text-slate-300 font-medium bg-black/40 border border-white/5 w-fit px-4 py-2.5 rounded-xl items-center min-h-[44px] shadow-inner"> <!-- JS will populate this --> <span class="text-white font-bold">Loading...</span> </nav> </div> <!-- Search Bar --> <div class="relative"> <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brightcyan pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> <input id="explorer-search-input" type="text" placeholder="Search all tracks by name or city..." class="w-full bg-black/30 border border-white/10 focus:border-brightcyan/50 focus:bg-brightcyan/5 rounded-2xl pl-11 pr-10 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200" autocomplete="off"> <button id="explorer-search-clear" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors hidden" aria-label="Clear search"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> </button> </div> </div> <div class="relative z-10 min-h-[150px]"> <!-- Stage Container --> <div id="explorer-content" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in"> <!-- JS populates items here --> </div> </div> <template id="explorer-item-template"> <button class="flex items-center justify-between p-5 bg-white/5 border border-white/10 hover:border-brightcyan/50 rounded-xl text-left transition-all duration-300 hover:bg-brightcyan/10 group hover:-translate-y-1 shadow-md"> <div> <span class="block text-white font-black capitalize text-lg item-name">Name</span> <span class="block text-brightcyan/80 text-xs font-bold uppercase tracking-widest mt-1.5 item-type">Region</span> </div> <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brightcyan/20 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-brightcyan transform group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg> </div> </button> </template> <template id="explorer-track-template"> <a href="#" class="flex flex-col p-5 bg-black/40 border border-white/10 hover:border-brightcyan/50 rounded-xl transition-all duration-300 hover:bg-white/5 group border-l-4 border-l-transparent hover:border-l-brightcyan shadow-md"> <span class="block text-white font-extrabold text-lg group-hover:text-brightcyan transition-colors track-name">Track Name</span> <span class="block text-slate-400 text-sm mt-2 track-city flex items-center gap-1.5 font-medium"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
City
</span> </a> </template> </div> ${renderScript($$result, "/Users/deandavis/Documents/Work/Should I Run/astro/src/components/TrackExplorer.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/deandavis/Documents/Work/Should I Run/astro/src/components/TrackExplorer.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allTracks = await getCollection("tracks");
  const featuredTracks = allTracks.slice(0, 6);
  const lastAddedTracks = [...allTracks].reverse().slice(0, 5);
  const upcomingCompetitions = [
    {
      date: "04 Apr",
      name: "Bedfordshire AAA Track & Field Open Meeting",
      track: "Bedford International Stadium",
      slug: "bedford",
      type: "Full Track & Field"
    },
    {
      date: "18 Apr",
      name: "WADAC Season Opener 2026 Open#1",
      track: "Winchester Athletics Track",
      slug: "winchester",
      type: "Full Track & Field"
    },
    {
      date: "26 Apr",
      name: "BFTTA OUTDOOR SERIES 1",
      track: "Lee Valley Athletics Centre",
      slug: "lee-valley",
      type: "Full Track & Field"
    }
  ];
  const getTrackUrl = (slug) => {
    const track = allTracks.find((t) => t.data.slug === slug);
    if (!track) return "#";
    return track.data.subRegion === "all" ? `/${track.data.country}/${track.data.region}/${track.data.slug}` : `/${track.data.country}/${track.data.region}/${track.data.subRegion}/${track.data.slug}`;
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Real-Time Athletics Track Wind Checker | Should I Race?", "description": "Know the wind before you run. Professional wind monitoring for sprinters and athletics tracks across the UK." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main> <!-- Hero Section --> <section class="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20"> <!-- Background Elements --> <div class="absolute inset-0 z-0"> <div class="absolute inset-0 bg-gradient-to-b from-deepdark/90 via-deepdark/80 to-deepdark z-10 backdrop-blur-sm"></div> <img src="/images/tracks/Should I Race Sprint Wind Checker.webp" alt="Track Background" class="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale"> <div class="absolute top-1/4 left-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-brightcyan/10 blur-[120px] rounded-full z-0"></div> </div> <div class="container relative z-20 mx-auto px-4 max-w-5xl text-center"> <span class="inline-block py-1.5 px-4 rounded-full bg-brightcyan/10 border border-brightcyan/30 text-brightcyan text-xs font-extrabold tracking-[0.2em] uppercase mb-8 animate-fade-in shadow-[0_0_15px_rgba(34,227,213,0.2)]">
Wind Intelligence for Sprinters
</span> <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 uppercase tracking-tighter animate-fade-in" style="animation-delay: 0.1s;">
Should I <span class="bg-gradient-to-br from-brightcyan to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,227,213,0.3)]">Race?</span> </h1> <p class="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium animate-fade-in" style="animation-delay: 0.2s;">
Stop guessing the wind. Get live, high-precision wind data for every
          major athletics track in the UK. Decide your race strategy with
          confidence.
</p> <div class="flex flex-col sm:flex-row gap-5 justify-center mt-10 animate-fade-in" style="animation-delay: 0.3s;"> <a href="#tracks" class="bg-brightcyan text-deepdark px-8 py-4 rounded-full font-black text-sm md:text-base border border-transparent transition-all duration-300 hover:scale-[1.03] uppercase tracking-widest shadow-[0_0_20px_rgba(34,227,213,0.3)]">Find Your Track</a> <a href="/about" class="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm md:text-base transition-colors hover:bg-white/10 hover:border-white/20 uppercase tracking-widest backdrop-blur-md">How it Works</a> </div> </div> </section> <!-- Stats Banner --> <section class="border-y border-white/5 bg-slate-900/30 backdrop-blur-md relative z-20 overflow-hidden"> <div class="absolute inset-0 bg-card-bg opacity-50"></div> <div class="container mx-auto px-4 py-8 relative z-10"> <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5"> <div class="flex flex-col drop-shadow-lg"> <span class="text-4xl lg:text-5xl font-extrabold text-white mb-1"><span class="text-brightcyan drop-shadow-[0_0_5px_rgba(34,227,213,0.8)]">30</span>+</span> <span class="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">Tracks</span> </div> <div class="flex flex-col drop-shadow-lg"> <span class="text-4xl lg:text-5xl font-extrabold text-white mb-1">Live</span> <span class="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">Updates</span> </div> <div class="flex flex-col drop-shadow-lg"> <span class="text-4xl lg:text-5xl font-extrabold text-white mb-1">3h</span> <span class="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">Forecasts</span> </div> <div class="flex flex-col drop-shadow-lg"> <span class="text-4xl lg:text-5xl font-extrabold text-white mb-1">100%</span> <span class="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">Free</span> </div> </div> </div> </section> <div class="container mx-auto px-4 py-24 max-w-[1400px]"> <!-- Layout Grid for Sections --> <div class="grid grid-cols-1 xl:grid-cols-3 gap-12 lg:gap-16"> <!-- Main Column (Left/Center) --> <div class="xl:col-span-2 space-y-20"> <!-- Track Explorer (Categories) --> <section id="explorer" class="scroll-mt-32"> ${renderComponent($$result2, "TrackExplorer", $$TrackExplorer, {})} </section> <!-- Featured Tracks --> <section id="tracks" class="scroll-mt-32"> <div class="flex justify-between items-end mb-8 border-b border-white/10 pb-4"> <div> <h2 class="text-3xl md:text-5xl font-black text-white mb-3">
Featured Tracks
</h2> <p class="text-slate-400 text-lg">
Real-time conditions for premier athletics venues.
</p> </div> <a href="/tracks" class="text-brightcyan hover:text-white transition-colors text-sm font-bold uppercase tracking-[0.15em] hidden sm:block">View All →</a> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${featuredTracks.map((track) => renderTemplate`${renderComponent($$result2, "TrackCard", $$TrackCard, { "name": track.data.name, "city": track.data.city, "trackUrl": track.data.subRegion === "all" ? `/${track.data.country}/${track.data.region}/${track.data.slug}` : `/${track.data.country}/${track.data.region}/${track.data.subRegion}/${track.data.slug}` })}`)} </div> </section> <!-- Last Tracks Added --> <section> <div class="flex justify-between items-end mb-8 border-b border-white/10 pb-4"> <div> <h2 class="text-3xl md:text-5xl font-black text-white mb-3 flex items-center gap-4">
Newly Added
</h2> <p class="text-slate-400 text-lg">
The latest venues added to our monitoring network.
</p> </div> </div> <div class="flex flex-col gap-4"> ${lastAddedTracks.map((track, i) => renderTemplate`<div class="bg-card-bg/50 border border-white/5 rounded-2xl p-5 flex justify-between items-center hover:bg-card-border/40 hover:border-brightcyan/30 transition-all duration-300 group"> <div class="flex items-center gap-4"> ${i === 0 && renderTemplate`<span class="hidden md:inline-block bg-brightcyan text-deepdark text-xs px-2 py-1 rounded-sm uppercase tracking-wider font-extrabold shadow-[0_0_10px_rgba(34,227,213,0.4)]">
New
</span>`} <div> <h3 class="font-extrabold text-white text-xl group-hover:text-brightcyan transition-colors"> ${track.data.name} </h3> <p class="text-sm text-slate-400 mt-0.5"> ${track.data.city} </p> </div> </div> <a${addAttribute(
    track.data.subRegion === "all" ? `/${track.data.country}/${track.data.region}/${track.data.slug}` : `/${track.data.country}/${track.data.region}/${track.data.subRegion}/${track.data.slug}`,
    "href"
  )} class="bg-white/5 hover:bg-brightcyan hover:text-deepdark text-brightcyan rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 shadow-md transform group-hover:scale-110 flex-shrink-0"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <line x1="5" y1="12" x2="19" y2="12"></line> <polyline points="12 5 19 12 12 19"></polyline> ` })} </svg> </a> </div>`)} </div> </section> <!-- Upcoming Meets (moved below Newly Added) --> <!-- Upcoming Meets (Upgraded Layout) --> <section id="meets" class="scroll-mt-32"> <div class="flex justify-between items-end mb-8 border-b border-white/10 pb-4"> <div> <h2 class="text-3xl md:text-5xl font-black text-white mb-3 flex items-center gap-4">
Upcoming Meets
</h2> <p class="text-slate-400 text-lg">
Major competitions coming up at our monitored venues.
</p> </div> <p class="text-brightcyan hover:text-white transition-colors text-sm font-bold uppercase tracking-[0.15em] hidden sm:block">
All Meets (Coming Soon)
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${upcomingCompetitions.map((comp, i) => renderTemplate`<a${addAttribute(getTrackUrl(comp.slug), "href")} class="group relative bento-card border border-white/5 bg-gradient-to-br from-card-bg/80 to-deepdark/50 p-6 hover:border-brightcyan/30 hover:bg-brightcyan/[0.02] transition-all duration-500 overflow-hidden">  <div class="absolute -top-6 -right-6 w-12 h-12 bg-brightcyan/5 blur-xl group-hover:bg-brightcyan/20 transition-all duration-500"></div> <div class="flex gap-5">  <div class="flex-shrink-0 w-16 h-20 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center transition-all duration-300 group-hover:border-brightcyan/40 group-hover:bg-brightcyan/10 group-hover:scale-105"> <span class="text-brightcyan text-xl font-black leading-none mb-1"> ${comp.date.split(" ")[0]} </span> <span class="text-slate-400 text-[10px] font-black uppercase tracking-widest transition-all duration-500 group-hover:text-white"> ${comp.date.split(" ")[1]} </span> </div>  <div class="flex-1"> <div class="flex items-center gap-2 mb-2"> <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-brightcyan/10 text-brightcyan border border-brightcyan/20"> ${comp.type} </span> ${i === 0 && renderTemplate`<span class="animate-pulse flex h-2 w-2 rounded-full bg-brightcyan shadow-[0_0_8px_rgba(34,227,213,0.8)]"></span>`} </div> <h4 class="text-white font-black text-xl mb-3 leading-tight group-hover:text-brightcyan transition-colors"> ${comp.name} </h4> <div class="flex items-center gap-2 text-slate-400 text-sm font-medium"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-brightcyan opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path> <circle cx="12" cy="10" r="3"></circle> </svg> ${comp.track} </div> </div> </div>  <div class="mt-8 pt-4 border-t border-white/5 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity"> <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
Check Live Wind Conditions
</span> <div class="text-brightcyan group-hover:translate-x-1 transition-transform"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"> <line x1="5" y1="12" x2="19" y2="12"></line> <polyline points="12 5 19 12 12 19"></polyline> </svg> </div> </div> </a>`)}  <div class="group relative bento-card border border-brightcyan/20 bg-gradient-to-br from-brightcyan/10 to-deepdark/40 p-6 hover:border-brightcyan/40 transition-all duration-500 overflow-hidden flex flex-col justify-between"> <div class="absolute -top-10 -right-10 w-32 h-32 bg-brightcyan/10 blur-2xl rounded-full group-hover:bg-brightcyan/20 transition-all duration-500"></div> <div class="relative z-10"> <div class="flex items-center gap-3 mb-4"> <div class="w-10 h-10 rounded-full bg-brightcyan text-deepdark flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(34,227,213,0.4)]">
?
</div> <h3 class="text-white font-black text-2xl uppercase tracking-tight">
Missing an <span class="text-brightcyan">Event?</span> </h3> </div> <p class="text-slate-400 text-sm font-medium leading-relaxed mb-6">
Know of a sprint meet or championship not listed? Help the
                    community by submitting venue and date info.
</p> </div> <div class="relative z-10"> <button class="w-full bg-white text-deepdark py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brightcyan transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl">
Submit Meet Data
</button> </div> </div> </div> </section> </div> <!-- Sidebar Column (Right) — Partner Banner --> <div class="xl:col-span-1"> <div class="sticky top-32"> ${renderComponent($$result2, "PartnerBanner", $$PartnerBanner, { "page": "home", "heading": "Site Partners", "variant": "sidebar" })} </div> </div> </div> </div> </main> ` })}`;
}, "/Users/deandavis/Documents/Work/Should I Run/astro/src/pages/index.astro", void 0);

const $$file = "/Users/deandavis/Documents/Work/Should I Run/astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
