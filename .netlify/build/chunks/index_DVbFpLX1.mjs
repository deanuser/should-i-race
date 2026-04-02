import { c as createComponent } from './consts_DGtZZUut.mjs';
import 'piccolore';
import { g as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from './ssr-function_DFINGRnz.mjs';
import { g as getCollection, $ as $$Layout, a as $$Navbar, b as $$PartnerBanner, c as $$Footer } from './PartnerBanner_D2JhUW7f.mjs';
import { $ as $$TrackCard } from './TrackCard_PtqfkWFg.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const { country, region } = Astro2.params;
  const allTracks = await getCollection("tracks");
  const tracks = allTracks.filter(
    (t) => t.data.country.toLowerCase() === country?.toLowerCase() && t.data.region.toLowerCase() === region?.toLowerCase()
  );
  if (tracks.length === 0) {
    return Astro2.redirect("/404");
  }
  const subRegions = [...new Set(tracks.map((t) => t.data.subRegion))];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Tracks in ${region?.replace(/-/g, " ")} | Should I Race?`, "description": `Explore professional athletics tracks in ${region?.replace(/-/g, " ")}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="container mx-auto px-4 py-12 mt-20 max-w-7xl animate-fade-in"> <!-- Breadcrumbs --> <nav class="flex text-sm text-slate-400 font-medium mb-8 bg-card-bg/50 border border-white/5 w-fit px-4 py-2 rounded-lg items-center text-center"> <a href="/" class="hover:text-brightcyan transition-colors">Home</a> <span class="mx-2 opacity-50">/</span> <a${addAttribute(`/${country}`, "href")} class="hover:text-brightcyan capitalize transition-colors">${country}</a> <span class="mx-2 opacity-50">/</span> <span class="text-white capitalize font-bold">${region?.replace(/-/g, " ")}</span> </nav> <header class="mb-12"> <h1 class="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">Tracks in ${region?.replace(/-/g, " ")}</h1>  ${subRegions.length > 0 && !(subRegions.length === 1 && subRegions[0] === "all") && renderTemplate`<div class="mb-4"> <h2 class="text-xs font-black tracking-widest text-slate-500 uppercase mb-4">Browse by Area</h2> <div class="flex flex-wrap gap-4"> ${subRegions.map((sr) => renderTemplate`<a${addAttribute(`/${country}/${region}/${sr}`, "href")} class="bg-deepdark border border-white/10 hover:border-brightcyan/50 text-white px-6 py-3 rounded-full font-bold transition-all hover:bg-brightcyan hover:text-deepdark capitalize shadow-md hover:shadow-[0_0_15px_rgba(34,227,213,0.3)]"> ${sr.replace(/-/g, " ")} </a>`)} </div> </div>`} </header> <hr class="border-white/5 mb-10"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${tracks.map((track) => renderTemplate`${renderComponent($$result2, "TrackCard", $$TrackCard, { "name": track.data.name, "city": track.data.city, "trackUrl": track.data.subRegion === "all" ? `/${track.data.country}/${track.data.region}/${track.data.slug}` : `/${track.data.country}/${track.data.region}/${track.data.subRegion}/${track.data.slug}` })}`)} </div> ${renderComponent($$result2, "PartnerBanner", $$PartnerBanner, { "page": "tracks" })} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/deandavis/Documents/Work/Should I Run/astro/src/pages/[country]/[region]/index.astro", void 0);

const $$file = "/Users/deandavis/Documents/Work/Should I Run/astro/src/pages/[country]/[region]/index.astro";
const $$url = "/[country]/[region]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
