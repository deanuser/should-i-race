import { c as createComponent } from './consts_DGtZZUut.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, r as renderTemplate } from './ssr-function_DFINGRnz.mjs';
import 'clsx';

const $$TrackCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TrackCard;
  const { name, city, trackUrl, isNew = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(trackUrl, "href")} class="bento-card group flex flex-col justify-between h-full bg-gradient-to-br from-card-border/40 to-card-border/10 border border-white/5 hover:border-brightcyan/30 transition-all duration-300 relative overflow-hidden"> <div class="absolute inset-0 bg-brightcyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> <div class="relative z-10 flex justify-between items-start mb-6"> <div> ${isNew && renderTemplate`<span class="bg-brightcyan text-deepdark text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider mb-3 inline-block drop-shadow-md">
New Entry
</span>`} <h3 class="text-xl font-bold text-white mb-2 group-hover:text-brightcyan transition-colors"> ${name} </h3> <p class="text-slate-400 text-sm flex items-center gap-1.5"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${city} </p> </div> </div> <div class="relative z-10 flex items-center gap-2 text-sm font-semibold text-brightcyan mt-auto pt-4 border-t border-white/5"> <span>View Live Wind & Forecast</span> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> </div> </a>`;
}, "/Users/deandavis/Documents/Work/Should I Run/astro/src/components/TrackCard.astro", void 0);

export { $$TrackCard as $ };
