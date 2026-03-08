import { useState, useEffect, useRef } from "react";
import data from "./data.json";
    
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeSection({ children, delay = 0, className = "" }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const Nav = ({ active }) => {
  const links = [
    { id: "sobre-mi", label: "Sobre mí" },
    { id: "familia",  label: "Familia"  },
    { id: "album",    label: "Álbum"    },
    { id: "contacto", label: "Contacto" },
  ];
  return (
    <nav className="
      fixed top-0 left-0 right-0 z-50
      flex justify-between items-center
      px-16 py-4
      bg-p1-bg/90 backdrop-blur-md
      border-b border-p1-border/50
      font-dm
    ">
      <span className="font-cormorant text-2xl font-semibold text-p1-text">
        {data.persona.nombre}
      </span>
      <ul className="flex gap-10 list-none m-0 p-0">
        {links.map(l => (
          <li key={l.id}>
            <a
              href={`#${l.id}`}
              className={`text-xs tracking-widest uppercase no-underline transition-colors ${
                active === l.id ? "text-p1-accent" : "text-p1-muted"
              }`}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const Hero = () => {
  return (
    <section id="hero" className="relative flex items-end overflow-hidden h-screen min-h-[700px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.persona.fotoFondo})` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(61,43,31,0.08), rgba(61,43,31,0.06) 40%, rgba(61,43,31,0.80))" }}
      />
      <div className="animate-hero-1 relative z-10 w-full flex items-end gap-10 px-16 pb-20">
        <div
          className="shrink-0 size-36 rounded-full overflow-hidden border-2 border-white/60"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.35)" }}
        >
          <img src={data.persona.fotoPerfil} alt={data.persona.nombre} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-dm text-xs tracking-widest uppercase mb-2 text-p1-accent-soft">
            {data.persona.titulo}
          </p>
          <h1
            className="font-cormorant font-light text-white leading-none mb-4"
            style={{ fontSize: "clamp(3rem, 5vw, 4.8rem)" }}
          >
            {data.persona.nombre.split(" ")[0]}<br />
            {data.persona.nombre.split(" ")[1]}
          </h1>
          <div className="flex flex-wrap gap-2">
            {data.persona.badges.map((b, i) => (
              <span
                key={i}
                className="font-dm text-xs text-white px-3 py-1 rounded-full backdrop-blur-sm bg-white/[0.13] border border-white/30"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const SobreMi = () => {
  const cards = Object.values(data.sobreMi);
  return (
    <section id="sobre-mi" className="py-28 bg-p1-bg-alt">
      <div className="max-w-5xl mx-auto px-16">
        <FadeSection>
          <p className="font-dm text-xs tracking-widest uppercase mb-2 text-p1-accent">Conóceme</p>
          <h2
            className="font-cormorant font-normal mb-14 text-p1-text"
            style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}
          >
            Una mirada<br /><em>a mi historia</em>
          </h2>
        </FadeSection>

        <div className="grid grid-cols-2 gap-5">
          {cards.map((c, i) => (
            <FadeSection key={i} delay={i * 0.1}>
              {/* p1-card::before requiere CSS — todo lo demás es Tailwind */}
              <div className="p1-card relative rounded-2xl p-9 overflow-hidden border border-p1-border bg-p1-bg transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(61,43,31,0.12)]">
                <div className="text-3xl mb-4">{c.icono}</div>
                <h3 className="font-cormorant text-xl font-semibold mb-3 text-p1-text">{c.titulo}</h3>
                <p className="font-dm text-sm leading-relaxed text-p1-muted">{c.texto}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

const Familia = () => {
  const { familia } = data;
  return (
    <section id="familia" className="py-28 bg-p1-dark">
      <div className="max-w-5xl mx-auto px-16">
        <FadeSection>
          <p className="font-dm text-xs tracking-widest uppercase mb-2 text-p1-accent-soft">Mi mundo</p>
          <h2
            className="font-cormorant font-normal mb-14 text-p1-bg"
            style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}
          >
            La familia,<br /><em>mi fundamento</em>
          </h2>
        </FadeSection>

        <div className="grid grid-cols-2 gap-20 items-center">
          <FadeSection>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ aspectRatio: "3/4", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}
            >
              <img src={familia.foto} alt="Familia" className="w-full h-full object-cover" />
            </div>
          </FadeSection>

          <FadeSection delay={0.15}>
            {[familia.texto1, familia.texto2, familia.texto3].map((t, i) => (
              <p key={i} className="font-dm text-base leading-loose mb-5 text-white/70">{t}</p>
            ))}
            <div className="flex gap-10 mt-8 pt-8 border-t border-p1-accent-soft/20">
              {familia.estadisticas.map((s, i) => (
                <div key={i}>
                  <div
                    className="font-cormorant font-light text-p1-accent-soft leading-none"
                    style={{ fontSize: "2.5rem" }}
                  >
                    {s.numero}
                  </div>
                  <div className="font-dm text-xs tracking-widest uppercase mt-1 text-white/40">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeSection>
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
    <section id="album" className="py-28 bg-p1-bg">
      <div className="max-w-5xl mx-auto px-16">
        <FadeSection>
          <p className="font-dm text-xs tracking-widest uppercase mb-2 text-p1-accent">Momentos</p>
          <h2
            className="font-cormorant font-normal mb-10 text-p1-text"
            style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}
          >
            Álbum de<br /><em>recuerdos</em>
          </h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setFiltro(c)}
                className={`font-dm text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border cursor-pointer transition-all ${
                  filtro === c
                    ? "bg-p1-accent border-p1-accent text-white"
                    : "bg-transparent border-p1-border text-p1-muted hover:border-p1-accent hover:text-p1-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </FadeSection>

        <div className="grid grid-cols-3 gap-4" style={{ gridAutoRows: "260px" }}>
          {filtered.map((f, i) => (
            <div
              key={f.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
              style={{
                gridColumn:
                  filtered.length >= 4 && i === 3 ? "1 / 3" :
                  filtered.length >= 7 && i === 6 ? "2 / 4" : undefined,
              }}
            >
              <img
                src={f.imagen}
                alt={f.descripcion}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
              />
              {/* group-hover en hijo — Tailwind v4 lo soporta con la variante group */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                style={{ background: "linear-gradient(to top, rgba(61,43,31,0.88), transparent)" }}
              >
                <p className="font-dm text-xs tracking-widest uppercase mb-1 text-p1-accent-soft">{f.lugar}</p>
                <p className="font-cormorant italic text-white text-lg">{f.descripcion}</p>
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
    <section id="contacto" className="py-28 bg-p1-bg-alt">
      <div className="max-w-5xl mx-auto px-16">
        <FadeSection>
          <p className="font-dm text-xs tracking-widest uppercase mb-2 text-p1-accent">Conectemos</p>
          <h2
            className="font-cormorant font-normal mb-14 text-p1-text"
            style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}
          >
            Contacto y<br /><em>redes sociales</em>
          </h2>
        </FadeSection>

        <div className="grid grid-cols-2 gap-20 items-start">
          <FadeSection>
            <p className="font-dm text-base leading-loose mb-8 text-p1-muted">{contacto.descripcion}</p>
            {items.map((it, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-p1-border">
                <div className="size-10 rounded-full flex items-center justify-center text-lg shrink-0 bg-p1-accent-pale">
                  {it.icon}
                </div>
                <div>
                  <p className="font-dm text-xs tracking-widest uppercase mb-0.5 text-p1-accent">{it.label}</p>
                  <p className="font-dm text-sm text-p1-text">{it.value}</p>
                </div>
              </div>
            ))}
          </FadeSection>

          <FadeSection delay={0.15}>
            <h3 className="font-cormorant text-2xl mb-6 text-p1-text">Sígueme en redes</h3>
            <div className="grid grid-cols-2 gap-3">
              {redes.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-p1-border bg-p1-bg no-underline transition-all duration-300 hover:bg-p1-dark hover:border-p1-dark hover:-translate-y-0.5"
                >
                  <div
                    className="size-9 rounded-lg flex items-center justify-center text-lg shrink-0"
                    style={{ background: `${r.color}18` }}
                  >
                    {r.icono}
                  </div>
                  <div>
                    <p className="font-dm text-sm font-medium text-p1-text transition-colors group-hover:text-p1-bg">
                      {r.nombre}
                    </p>
                    <p className="font-dm text-xs text-p1-muted transition-colors group-hover:text-p1-accent-soft">
                      {r.handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </FadeSection>
        </div>
      </div>
    </section>
  );
}

const Propuesta1 = () => {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ids = ["sobre-mi", "familia", "album", "contacto"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="font-dm bg-p1-bg">
      <Nav active={active} />
      <Hero />
      <SobreMi />
      <Familia />
      <Album />
      <Contacto />
      <footer className="flex justify-between items-center px-16 py-6 bg-p1-footer">
        <span className="font-cormorant text-xl text-p1-accent-soft">{data.persona.nombre}</span>
        <p className="font-dm text-xs tracking-wide text-white/30">© 2025 · Todos los derechos reservados</p>
        <p className="font-dm text-xs text-white/30">Hecho con cariño ✦</p>
      </footer>
    </div>
  );
}

export default Propuesta1;