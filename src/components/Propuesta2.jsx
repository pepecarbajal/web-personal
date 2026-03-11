import { useState, useEffect, useRef } from "react";
import data from "./data.json";

function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", dir = "up" }) {
  const [ref, visible] = useFadeIn();
  const hidden =
    dir === "left"  ? "translateX(-20px)" :
    dir === "right" ? "translateX(20px)"  : "translateY(24px)";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "none" : hidden,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const Nav = ({ active }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { id: "p2-sobre",      label: "Sobre mí"  },
    { id: "p2-familia",    label: "Familia"   },
    { id: "p2-proyectos",  label: "Proyectos" },
    { id: "p2-noticias",   label: "Noticias"  },
    { id: "p2-album",      label: "Galería"   },
    { id: "p2-contacto",   label: "Contacto"  },
  ];
  return (
    <nav className="
      fixed top-0 left-0 right-0 z-50
      flex justify-between items-center
      px-14 py-4
      bg-p2-bg/94 backdrop-blur-md
      border-b border-p2-border
      font-nunito
      max-md:px-5 max-md:py-3
    ">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-p2-red font-playfair">
          S
        </div>
        <span className="font-playfair font-medium text-lg text-p2-text">{data.persona.nombre}</span>
      </div>

      {/* Desktop links */}
      <ul className="flex gap-8 list-none m-0 p-0 max-md:hidden">
        {links.map(l => (
          <li key={l.id}>
            <a
              href={`#${l.id}`}
              className={`text-sm font-medium no-underline transition-colors ${
                active === l.id ? "text-p2-red" : "text-p2-text-soft"
              }`}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <a
        href="#p2-contacto"
        className="text-sm font-semibold px-5 py-2 rounded-full text-white no-underline bg-p2-red shadow-[0_4px_16px_rgba(201,79,79,0.3)] hover:opacity-90 transition-opacity max-md:hidden"
      >
        Contactar
      </a>

      {/* Mobile hamburger */}
      <button
        className="hidden max-md:flex flex-col gap-1.5 p-1 cursor-pointer border-none bg-transparent"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Menú"
      >
        <span className={`block h-px w-6 bg-p2-text transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block h-px w-6 bg-p2-text transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block h-px w-6 bg-p2-text transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-p2-bg/97 backdrop-blur-md border-b border-p2-border py-4 hidden max-md:block">
          <ul className="flex flex-col list-none m-0 p-0">
            {links.map(l => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-6 py-3 text-sm font-medium no-underline transition-colors ${
                    active === l.id ? "text-p2-red" : "text-p2-text-soft"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="px-6 pt-3">
              <a
                href="#p2-contacto"
                onClick={() => setMenuOpen(false)}
                className="block text-center text-sm font-semibold px-5 py-2 rounded-full text-white no-underline bg-p2-red"
              >
                Contactar
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

const Hero = () => {
  return (
    <section id="p2-hero" className="relative overflow-hidden pt-20 min-h-screen bg-p2-bg">
      <div className="blob size-[500px] bg-p2-pastel-1 -top-24 -right-24 opacity-60" />
      <div className="blob size-[360px] bg-p2-pastel-2 bottom-20 -left-20 opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-14 flex items-center gap-16 min-h-screen max-md:flex-col max-md:px-6 max-md:gap-10 max-md:pt-10 max-md:pb-16 max-md:min-h-0 max-md:justify-center">
        {/* Texto */}
        <div className="flex-1 max-md:text-center max-md:order-2">
          <div className="animate-hero-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-p2-red-light border border-p2-border">
            <span className="size-2 rounded-full bg-p2-red" />
            <span className="font-nunito text-xs font-semibold tracking-widest uppercase text-p2-red">
              {data.persona.titulo}
            </span>
          </div>

          <h1
            className="font-playfair animate-hero-2 font-bold leading-tight mb-6 text-p2-text"
            style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}
          >
            Hola, soy<br />
            <span className="text-p2-red">{data.persona.nombre.split(" ")[0]}</span>
            {" "}{data.persona.nombre.split(" ")[1]}
          </h1>

          <p className="font-nunito animate-hero-3 text-lg leading-relaxed mb-8 text-p2-text-soft max-w-[480px] max-md:mx-auto">
            {data.sobreMi.quienSoy.texto}
          </p>

          <div className="animate-hero-3 flex flex-wrap gap-3 mb-10 max-md:justify-center">
            {data.persona.badges.map((b, i) => (
              <span
                key={i}
                className={`font-nunito text-xs font-medium px-4 py-2 rounded-full border border-p2-border text-p2-text-soft ${
                  i === 0 ? "bg-p2-pastel-1" : i === 1 ? "bg-p2-pastel-2" : "bg-p2-pastel-3"
                }`}
              >
                {b}
              </span>
            ))}
          </div>

          <div className="animate-hero-3 flex gap-4 max-md:justify-center max-sm:flex-col max-sm:items-center">
            <a
              href="#p2-sobre"
              className="font-nunito font-semibold px-7 py-3 rounded-full text-white no-underline bg-p2-red shadow-[0_8px_24px_rgba(201,79,79,0.3)] hover:opacity-90 transition-opacity"
            >
              Conocerme más
            </a>
            <a
              href="#p2-album"
              className="font-nunito font-medium px-7 py-3 rounded-full no-underline border border-p2-border text-p2-text hover:bg-gray-50 transition-colors"
            >
              Ver galería
            </a>
          </div>
        </div>

        {/* Retrato */}
        <div className="shrink-0 relative animate-hero-2 max-md:order-1 max-md:w-full max-md:flex max-md:justify-center">
          <div
            className="relative max-md:w-[240px]"
            style={{ width: 360 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-p2-pastel-1 rotate-3 scale-[1.04]" />
            <div
              className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(180,120,110,0.18)] max-md:w-[240px] max-md:h-[300px]"
              style={{ width: 360, height: 460 }}
            >
              <img src={data.persona.fotoPerfil} alt={data.persona.nombre} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-8 font-nunito rounded-2xl px-5 py-3 bg-white border border-p2-border shadow-[0_8px_32px_rgba(180,120,110,0.12)] max-md:-left-4 max-md:px-3 max-md:py-2">
              <div className="text-xs font-semibold mb-0.5 text-p2-red">✦ Ingeniero</div>
              <div className="text-xs text-p2-text-muted">{data.persona.ciudad}</div>
            </div>
            <div className="absolute -top-6 -right-6 size-14 rounded-2xl flex items-center justify-center text-2xl bg-white shadow-[0_8px_24px_rgba(180,120,110,0.12)] max-md:-right-2 max-md:-top-4 max-md:size-10 max-md:text-lg">
              📐
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SobreMi = () => {
  const cards = Object.values(data.sobreMi);
  return (
    <section id="p2-sobre" className="py-28 bg-p2-bg-alt max-md:py-16">
      <div className="max-w-6xl mx-auto px-14 max-md:px-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-p2-red" />
            <span className="font-nunito text-xs font-semibold tracking-widest uppercase text-p2-red">
              Conóceme
            </span>
          </div>
          <h2
            className="font-playfair font-bold mb-16 text-p2-text max-md:mb-8"
            style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
          >
            Una mirada a <em>mi historia</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className={`p2-card rounded-3xl p-8 h-full border transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(180,120,110,0.18)] max-md:p-6 ${
                  i % 2 === 0
                    ? "bg-white border-p2-border shadow-[0_4px_24px_rgba(180,120,110,0.12)]"
                    : "bg-p2-pastel-1 border-transparent"
                }`}
              >
                <div
                  className={`size-12 rounded-2xl flex items-center justify-center text-2xl mb-5 ${
                    i % 2 === 0 ? "bg-p2-red-light" : "bg-white/60"
                  }`}
                >
                  {c.icono}
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-3 text-p2-text">{c.titulo}</h3>
                <p className="font-nunito text-sm leading-loose text-p2-text-soft">{c.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const Familia = () => {
  const { familia } = data;
  return (
    <section id="p2-familia" className="py-28 relative overflow-hidden bg-p2-bg max-md:py-16">
      <div className="blob size-[400px] bg-p2-pastel-2 -top-24 -right-24 opacity-50" />

      <div className="max-w-6xl mx-auto px-14 relative z-10 max-md:px-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-p2-red" />
            <span className="font-nunito text-xs font-semibold tracking-widest uppercase text-p2-red">Mi mundo</span>
          </div>
          <h2
            className="font-playfair font-bold mb-16 text-p2-text max-md:mb-8"
            style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
          >
            La familia, <em>mi fundamento</em>
          </h2>
        </Reveal>

        {/* Desktop: 12-col grid */}
        <div className="grid grid-cols-12 gap-8 items-center max-md:hidden">
          <Reveal dir="left" className="col-span-5">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-p2-pastel-1 -rotate-2 scale-[1.03]" />
              <div
                className="relative rounded-3xl overflow-hidden shadow-[0_24px_72px_rgba(180,120,110,0.18)]"
                style={{ aspectRatio: "4/5" }}
              >
                <img src={familia.foto} alt="Familia" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="col-span-7">
            {[familia.texto1, familia.texto2, familia.texto3].map((t, i) => (
              <p key={i} className="font-nunito text-base leading-loose mb-5 text-p2-text-soft">{t}</p>
            ))}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {familia.estadisticas.map((s, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-5 text-center border border-p2-border ${
                    i === 0 ? "bg-p2-pastel-1" : i === 1 ? "bg-p2-pastel-2" : "bg-p2-pastel-3"
                  }`}
                >
                  <div className="font-playfair font-bold text-4xl leading-none text-p2-red">{s.numero}</div>
                  <div className="font-nunito text-xs font-semibold mt-2 uppercase tracking-wider text-p2-text-soft">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Mobile: stacked */}
        <div className="hidden max-md:flex flex-col gap-8">
          <Reveal>
            <div className="relative max-w-xs mx-auto w-full">
              <div className="absolute inset-0 rounded-3xl bg-p2-pastel-1 -rotate-2 scale-[1.03]" />
              <div
                className="relative rounded-3xl overflow-hidden shadow-[0_24px_72px_rgba(180,120,110,0.18)]"
                style={{ aspectRatio: "4/5" }}
              >
                <img src={familia.foto} alt="Familia" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {[familia.texto1, familia.texto2, familia.texto3].map((t, i) => (
              <p key={i} className="font-nunito text-base leading-loose mb-5 text-p2-text-soft">{t}</p>
            ))}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {familia.estadisticas.map((s, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-4 text-center border border-p2-border ${
                    i === 0 ? "bg-p2-pastel-1" : i === 1 ? "bg-p2-pastel-2" : "bg-p2-pastel-3"
                  }`}
                >
                  <div className="font-playfair font-bold text-3xl leading-none text-p2-red">{s.numero}</div>
                  <div className="font-nunito text-[10px] font-semibold mt-2 uppercase tracking-wider text-p2-text-soft">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NUEVA SECCIÓN: PROYECTOS
───────────────────────────────────────────── */
const Proyectos = () => {
  const [activo, setActivo] = useState(null);
  const categorias = ["Todos", ...new Set(data.proyectos.map(p => p.categoria))];
  const [filtro, setFiltro] = useState("Todos");
  const filtered = filtro === "Todos" ? data.proyectos : data.proyectos.filter(p => p.categoria === filtro);

  return (
    <section id="p2-proyectos" className="py-28 bg-p2-bg relative overflow-hidden max-md:py-16">
      <div className="blob size-[420px] bg-p2-pastel-3 -top-20 -left-20 opacity-40" />

      <div className="max-w-6xl mx-auto px-14 relative z-10 max-md:px-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-p2-red" />
            <span className="font-nunito text-xs font-semibold tracking-widest uppercase text-p2-red">
              Portafolio
            </span>
          </div>
          <h2
            className="font-playfair font-bold mb-8 text-p2-text"
            style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
          >
            Mis <em>proyectos</em>
          </h2>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-12 max-md:mb-6">
            {categorias.map(c => (
              <button
                key={c}
                onClick={() => setFiltro(c)}
                className={`font-nunito text-sm font-medium px-5 py-2 rounded-full border cursor-pointer transition-all ${
                  filtro === c
                    ? "bg-p2-red border-p2-red text-white"
                    : "bg-white border-p2-border text-p2-text-soft hover:border-p2-red hover:text-p2-red"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <div
                className="group rounded-3xl overflow-hidden border border-p2-border bg-white shadow-[0_4px_24px_rgba(180,120,110,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(180,120,110,0.18)] cursor-pointer"
                onClick={() => setActivo(activo === p.id ? null : p.id)}
              >
                {/* Imagen */}
                <div className="relative overflow-hidden" style={{ height: 220 }}>
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="font-nunito text-xs font-semibold px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-p2-red">
                      {p.categoria}
                    </span>
                    <span className="font-nunito text-xs font-medium px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-p2-text-soft">
                      {p.año}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 max-md:p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-playfair text-xl font-semibold text-p2-text">{p.nombre}</h3>
                    <span
                      className={`text-p2-text-muted transition-transform duration-300 text-lg ${
                        activo === p.id ? "rotate-45" : ""
                      }`}
                    >
                      ✦
                    </span>
                  </div>

                  <p className="font-nunito text-sm leading-loose text-p2-text-soft mb-4 line-clamp-2">
                    {p.descripcion}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map((t, ti) => (
                      <span
                        key={ti}
                        className="font-nunito text-xs font-medium px-3 py-1 rounded-full bg-p2-red-light text-p2-red border border-p2-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Expandido */}
                  <div
                    style={{
                      maxHeight: activo === p.id ? 200 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s ease",
                    }}
                  >
                    <p className="font-nunito text-sm leading-loose text-p2-text-soft mb-4 pt-1">
                      {p.descripcion}
                    </p>
                    {/* Métricas */}
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {p.metricas.map((m, mi) => (
                        <div
                          key={mi}
                          className={`rounded-2xl p-3 text-center border border-p2-border ${
                            mi === 0 ? "bg-p2-pastel-1" : mi === 1 ? "bg-p2-pastel-2" : "bg-p2-pastel-3"
                          }`}
                        >
                          <div className="font-playfair font-bold text-xl leading-none text-p2-red">
                            {m.valor}
                          </div>
                          <div className="font-nunito text-[10px] font-semibold mt-1 uppercase tracking-wider text-p2-text-soft">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    className="font-nunito text-xs font-semibold text-p2-red mt-3 hover:underline cursor-pointer bg-transparent border-none p-0"
                    onClick={e => { e.stopPropagation(); setActivo(activo === p.id ? null : p.id); }}
                  >
                    {activo === p.id ? "Ver menos ↑" : "Ver más ↓"}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NUEVA SECCIÓN: NOTICIAS
───────────────────────────────────────────── */
const categoriaBadgeColor = (cat) => {
  const map = {
    Logro:       "bg-emerald-50 text-emerald-600 border-emerald-200",
    Evento:      "bg-blue-50 text-blue-600 border-blue-200",
    Publicación: "bg-violet-50 text-violet-600 border-violet-200",
    Proyecto:    "bg-amber-50 text-amber-600 border-amber-200",
  };
  return map[cat] || "bg-p2-pastel-1 text-p2-red border-p2-border";
};

const Noticias = () => {
  const [filtro, setFiltro] = useState("Todos");
  const cats = ["Todos", ...new Set(data.noticias.map(n => n.categoria))];
  const filtered = filtro === "Todos" ? data.noticias : data.noticias.filter(n => n.categoria === filtro);
  const [destacada, ...resto] = filtered;

  return (
    <section id="p2-noticias" className="py-28 bg-p2-bg-alt relative overflow-hidden max-md:py-16">
      <div className="blob size-[380px] bg-p2-pastel-2 -bottom-16 -right-16 opacity-40" />

      <div className="max-w-6xl mx-auto px-14 relative z-10 max-md:px-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-p2-red" />
            <span className="font-nunito text-xs font-semibold tracking-widest uppercase text-p2-red">
              Actualidad
            </span>
          </div>
          <h2
            className="font-playfair font-bold mb-8 text-p2-text"
            style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
          >
            Noticias y <em>novedades</em>
          </h2>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-12 max-md:mb-6">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setFiltro(c)}
                className={`font-nunito text-sm font-medium px-5 py-2 rounded-full border cursor-pointer transition-all ${
                  filtro === c
                    ? "bg-p2-red border-p2-red text-white"
                    : "bg-white border-p2-border text-p2-text-soft hover:border-p2-red hover:text-p2-red"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {destacada && (
          <>
            {/* Noticia destacada (primera) */}
            <Reveal className="mb-6">
              <a
                href={destacada.enlace}
                className="group grid grid-cols-12 gap-0 rounded-3xl overflow-hidden border border-p2-border bg-white shadow-[0_4px_24px_rgba(180,120,110,0.12)] no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(180,120,110,0.18)] max-md:grid-cols-1"
              >
                <div className="col-span-5 relative overflow-hidden max-md:col-span-1" style={{ minHeight: 280 }}>
                  <img
                    src={destacada.imagen}
                    alt={destacada.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05] absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 max-md:hidden" />
                </div>
                <div className="col-span-7 p-8 flex flex-col justify-center max-md:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`font-nunito text-xs font-semibold px-3 py-1 rounded-full border ${categoriaBadgeColor(destacada.categoria)}`}>
                      {destacada.categoria}
                    </span>
                    <span className="font-nunito text-xs text-p2-text-muted">{destacada.fecha}</span>
                    <span className="font-nunito text-xs font-semibold px-2 py-0.5 rounded-full bg-p2-red text-white">
                      ★ Destacado
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold mb-3 text-p2-text max-md:text-xl">
                    {destacada.titulo}
                  </h3>
                  <p className="font-nunito text-sm leading-loose text-p2-text-soft mb-6">{destacada.resumen}</p>
                  <span className="font-nunito text-sm font-semibold text-p2-red group-hover:underline">
                    Leer más →
                  </span>
                </div>
              </a>
            </Reveal>

            {/* Resto de noticias */}
            {resto.length > 0 && (
              <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
                {resto.map((n, i) => (
                  <Reveal key={n.id} delay={i * 0.08}>
                    <a
                      href={n.enlace}
                      className="group rounded-3xl overflow-hidden border border-p2-border bg-white shadow-[0_4px_16px_rgba(180,120,110,0.10)] no-underline flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(180,120,110,0.18)]"
                    >
                      <div className="relative overflow-hidden" style={{ height: 180 }}>
                        <img
                          src={n.imagen}
                          alt={n.titulo}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`font-nunito text-xs font-semibold px-3 py-1 rounded-full border bg-white/90 backdrop-blur-sm ${categoriaBadgeColor(n.categoria)}`}>
                            {n.categoria}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <p className="font-nunito text-xs text-p2-text-muted mb-2">{n.fecha}</p>
                        <h3 className="font-playfair text-lg font-semibold mb-2 text-p2-text leading-snug">
                          {n.titulo}
                        </h3>
                        <p className="font-nunito text-sm leading-relaxed text-p2-text-soft flex-1 line-clamp-3">
                          {n.resumen}
                        </p>
                        <span className="font-nunito text-xs font-semibold text-p2-red mt-4 group-hover:underline">
                          Leer más →
                        </span>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

const Album = () => {
  const [filtro, setFiltro] = useState("Todos");
  const cats = ["Todos", ...new Set(data.album.map(a => a.categoria))];
  const filtered = filtro === "Todos" ? data.album : data.album.filter(a => a.categoria === filtro);

  return (
    <section id="p2-album" className="py-28 bg-p2-bg max-md:py-16">
      <div className="max-w-6xl mx-auto px-14 max-md:px-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-p2-red" />
            <span className="font-nunito text-xs font-semibold tracking-widest uppercase text-p2-red">Momentos</span>
          </div>
          <h2
            className="font-playfair font-bold mb-8 text-p2-text"
            style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
          >
            Álbum de <em>recuerdos</em>
          </h2>
          <div className="flex flex-wrap gap-2 mb-12 max-md:mb-6">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setFiltro(c)}
                className={`font-nunito text-sm font-medium px-5 py-2 rounded-full border cursor-pointer transition-all ${
                  filtro === c
                    ? "bg-p2-red border-p2-red text-white"
                    : "bg-white border-p2-border text-p2-text-soft hover:border-p2-red hover:text-p2-red"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Desktop grid with tall cards */}
        <div className="grid grid-cols-3 gap-5 max-md:hidden">
          {filtered.map((f, i) => {
            const tall = i === 0 || i === 4;
            return (
              <Reveal key={f.id} delay={i * 0.06}>
                <div
                  className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_32px_rgba(180,120,110,0.12)]"
                  style={{ height: tall ? 400 : 260 }}
                >
                  <img
                    src={f.imagen}
                    alt={f.descripcion}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <div className="absolute top-4 left-4 font-nunito text-xs font-semibold px-3 py-1 rounded-full bg-white/85 backdrop-blur-sm text-p2-red">
                    {f.categoria}
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 p-5 rounded-b-3xl translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                    style={{ background: "linear-gradient(to top, rgba(45,35,32,0.85), transparent)" }}
                  >
                    <p className="font-nunito text-xs font-semibold mb-1 text-p2-red-light">{f.lugar}</p>
                    <p className="font-playfair italic text-white text-base">{f.descripcion}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile grid: 2 cols, uniform */}
        <div className="hidden max-md:grid grid-cols-2 gap-3">
          {filtered.map((f) => (
            <div
              key={f.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-[0_4px_16px_rgba(180,120,110,0.12)]"
              style={{ height: 180 }}
            >
              <img
                src={f.imagen}
                alt={f.descripcion}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div className="absolute top-2 left-2 font-nunito text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/85 backdrop-blur-sm text-p2-red">
                {f.categoria}
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 p-3 rounded-b-2xl"
                style={{ background: "linear-gradient(to top, rgba(45,35,32,0.85), transparent)" }}
              >
                <p className="font-nunito text-[10px] font-semibold mb-0.5 text-p2-red-light">{f.lugar}</p>
                <p className="font-playfair italic text-white text-sm">{f.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Contacto = () => {
  const { contacto, redes } = data;
  const items = [
    { icon: "✉️", label: "Correo",           value: contacto.email },
    { icon: "📱", label: "Teléfono",          value: contacto.telefono },
    { icon: "📍", label: "Ubicación",         value: contacto.ubicacion },
    { icon: "🌐", label: "Sitio profesional", value: contacto.web },
  ];

  return (
    <section id="p2-contacto" className="py-28 relative overflow-hidden bg-p2-bg-alt max-md:py-16">
      <div className="blob size-[500px] bg-p2-pastel-1 -bottom-36 -right-36 opacity-50" />
      <div className="blob size-[300px] bg-p2-pastel-2 -top-12 -left-20 opacity-40" />

      <div className="max-w-6xl mx-auto px-14 relative z-10 max-md:px-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-p2-red" />
            <span className="font-nunito text-xs font-semibold tracking-widest uppercase text-p2-red">Conectemos</span>
          </div>
          <h2
            className="font-playfair font-bold mb-16 text-p2-text max-md:mb-8"
            style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
          >
            Contacto y <em>redes sociales</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-8">
          <Reveal dir="left">
            <div className="rounded-3xl p-8 bg-white border border-p2-border shadow-[0_8px_40px_rgba(180,120,110,0.12)] max-md:p-6">
              <p className="font-nunito text-base leading-loose mb-6 text-p2-text-soft">{contacto.descripcion}</p>
              {items.map((it, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-4 py-4 mb-2 rounded-2xl transition-colors hover:bg-p2-red-light"
                >
                  <div className="size-10 rounded-xl flex items-center justify-center text-lg shrink-0 bg-p2-red-light">
                    {it.icon}
                  </div>
                  <div>
                    <p className="font-nunito text-xs font-semibold uppercase tracking-wider mb-0.5 text-p2-red">
                      {it.label}
                    </p>
                    <p className="font-nunito text-sm font-medium text-p2-text">{it.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal dir="right" delay={0.1}>
            <h3 className="font-playfair text-2xl font-semibold mb-6 text-p2-text">Sígueme en redes</h3>
            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              {redes.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  className="group flex items-center gap-3 p-4 rounded-2xl border border-p2-border bg-white no-underline shadow-[0_2px_12px_rgba(180,120,110,0.10)] transition-all duration-300 hover:bg-p2-red hover:border-p2-red hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(201,79,79,0.25)]"
                >
                  <div
                    className="size-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-colors group-hover:bg-white/20"
                    style={{ background: `${r.color}18` }}
                  >
                    {r.icono}
                  </div>
                  <div>
                    <p className="font-nunito text-sm font-semibold text-p2-text transition-colors group-hover:text-white">
                      {r.nombre}
                    </p>
                    <p className="font-nunito text-xs text-p2-text-muted transition-colors group-hover:text-white/75">
                      {r.handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const Propuesta2 = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = ["p2-sobre", "p2-familia", "p2-proyectos", "p2-noticias", "p2-album", "p2-contacto"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="font-nunito bg-p2-bg">
      <Nav active={active} />
      <Hero />
      <SobreMi />
      <Familia />
      <Proyectos />
      <Noticias />
      <Album />
      <Contacto />
      <footer className="py-8 px-14 flex justify-between items-center bg-p2-text max-md:flex-col max-md:gap-3 max-md:px-6 max-md:py-6 max-md:text-center">
        <div>
          <span className="font-playfair text-lg font-semibold text-white">{data.persona.nombre}</span>
          <p className="font-nunito text-xs mt-0.5 text-white/35">{data.persona.titulo}</p>
        </div>
        <p className="font-nunito text-xs text-white/30">2025 · Todos los derechos reservados</p>
        <div className="size-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-p2-red font-playfair">
          T
        </div>
      </footer>
    </div>
  );
}

export default Propuesta2;
