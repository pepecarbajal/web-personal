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
  const links = [
    { id: "p2-sobre",    label: "Sobre mí" },
    { id: "p2-familia",  label: "Familia"  },
    { id: "p2-album",    label: "Galería"  },
    { id: "p2-contacto", label: "Contacto" },
  ];
  return (
    <nav className="
      fixed top-0 left-0 right-0 z-50
      flex justify-between items-center
      px-14 py-4
      bg-p2-bg/94 backdrop-blur-md
      border-b border-p2-border
      font-nunito
    ">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-p2-red font-playfair">
          S
        </div>
        <span className="font-playfair font-medium text-lg text-p2-text">{data.persona.nombre}</span>
      </div>

      <ul className="flex gap-8 list-none m-0 p-0">
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

      <a
        href="#p2-contacto"
        className="text-sm font-semibold px-5 py-2 rounded-full text-white no-underline bg-p2-red shadow-[0_4px_16px_rgba(201,79,79,0.3)] hover:opacity-90 transition-opacity"
      >
        Contactar
      </a>
    </nav>
  );
}

const Hero = () => {
  return (
    <section id="p2-hero" className="relative overflow-hidden pt-20 min-h-screen bg-p2-bg">
      {/* Blobs — filter:blur requiere la clase .blob del CSS */}
      <div className="blob size-[500px] bg-p2-pastel-1 -top-24 -right-24 opacity-60" />
      <div className="blob size-[360px] bg-p2-pastel-2 bottom-20 -left-20 opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-14 flex items-center gap-16 min-h-screen">
        {/* Texto */}
        <div className="flex-1">
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

          <p
            className="font-nunito animate-hero-3 text-lg leading-relaxed mb-8 text-p2-text-soft max-w-[480px]"
          >
            {data.sobreMi.quienSoy.texto}
          </p>

          <div className="animate-hero-3 flex flex-wrap gap-3 mb-10">
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

          <div className="animate-hero-3 flex gap-4">
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
        <div className="shrink-0 relative animate-hero-2">
          <div className="absolute inset-0 rounded-3xl bg-p2-pastel-1 rotate-3 scale-[1.04]" />
          <div
            className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(180,120,110,0.18)]"
            style={{ width: 360, height: 460 }}
          >
            <img src={data.persona.fotoPerfil} alt={data.persona.nombre} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -left-8 font-nunito rounded-2xl px-5 py-3 bg-white border border-p2-border shadow-[0_8px_32px_rgba(180,120,110,0.12)]">
            <div className="text-xs font-semibold mb-0.5 text-p2-red">✦ Arquitecta</div>
            <div className="text-xs text-p2-text-muted">{data.persona.ciudad}</div>
          </div>
          <div className="absolute -top-6 -right-6 size-14 rounded-2xl flex items-center justify-center text-2xl bg-white shadow-[0_8px_24px_rgba(180,120,110,0.12)]">
            📐
          </div>
        </div>
      </div>
    </section>
  );
}

const SobreMi = () => {
  const cards = Object.values(data.sobreMi);
  return (
    <section id="p2-sobre" className="py-28 bg-p2-bg-alt">
      <div className="max-w-6xl mx-auto px-14">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-p2-red" />
            <span className="font-nunito text-xs font-semibold tracking-widest uppercase text-p2-red">
              Conóceme
            </span>
          </div>
          <h2
            className="font-playfair font-bold mb-16 text-p2-text"
            style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
          >
            Una mirada a <em>mi historia</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-6">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className={`p2-card rounded-3xl p-8 h-full border transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(180,120,110,0.18)] ${
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
    <section id="p2-familia" className="py-28 relative overflow-hidden bg-p2-bg">
      <div className="blob size-[400px] bg-p2-pastel-2 -top-24 -right-24 opacity-50" />

      <div className="max-w-6xl mx-auto px-14 relative z-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-p2-red" />
            <span className="font-nunito text-xs font-semibold tracking-widest uppercase text-p2-red">Mi mundo</span>
          </div>
          <h2
            className="font-playfair font-bold mb-16 text-p2-text"
            style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
          >
            La familia, <em>mi fundamento</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-12 gap-8 items-center">
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
      </div>
    </section>
  );
}

const Album = () => {
  const [filtro, setFiltro] = useState("Todos");
  const cats = ["Todos", ...new Set(data.album.map(a => a.categoria))];
  const filtered = filtro === "Todos" ? data.album : data.album.filter(a => a.categoria === filtro);

  return (
    <section id="p2-album" className="py-28 bg-p2-bg-alt">
      <div className="max-w-6xl mx-auto px-14">
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
          <div className="flex flex-wrap gap-2 mb-12">
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

        <div className="grid grid-cols-3 gap-5">
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
    <section id="p2-contacto" className="py-28 relative overflow-hidden bg-p2-bg">
      <div className="blob size-[500px] bg-p2-pastel-1 -bottom-36 -right-36 opacity-50" />
      <div className="blob size-[300px] bg-p2-pastel-2 -top-12 -left-20 opacity-40" />

      <div className="max-w-6xl mx-auto px-14 relative z-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-p2-red" />
            <span className="font-nunito text-xs font-semibold tracking-widest uppercase text-p2-red">Conectemos</span>
          </div>
          <h2
            className="font-playfair font-bold mb-16 text-p2-text"
            style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
          >
            Contacto y <em>redes sociales</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-12">
          <Reveal dir="left">
            <div className="rounded-3xl p-8 bg-white border border-p2-border shadow-[0_8px_40px_rgba(180,120,110,0.12)]">
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
            <div className="grid grid-cols-2 gap-3">
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
    const ids = ["p2-sobre", "p2-familia", "p2-album", "p2-contacto"];
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
      <Album />
      <Contacto />
      <footer className="py-8 px-14 flex justify-between items-center bg-p2-text">
        <div>
          <span className="font-playfair text-lg font-semibold text-white">{data.persona.nombre}</span>
          <p className="font-nunito text-xs mt-0.5 text-white/35">{data.persona.titulo}</p>
        </div>
        <p className="font-nunito text-xs text-white/30">© 2025 · Todos los derechos reservados</p>
        <div className="size-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-p2-red font-playfair">
          S
        </div>
      </footer>
    </div>
  );
}

export default Propuesta2;