import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bird,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  ExternalLink as ExternalLinkIcon,
  GraduationCap,
  HeartHandshake,
  Info,
  Map as MapIcon,
  MapPin,
  Menu,
  Minus,
  PawPrint,
  PlayCircle,
  Plus,
  RotateCcw,
  Search,
  ShoppingBag,
  Sparkles,
  Ticket,
  Trees,
  Utensils,
  X,
} from 'lucide-react';
import { exhibits, highlights, outlets, pages, rimbaImages } from './content';

const ticketUrl = 'https://www.ticket2u.com.my/zoonegara/book?t=1';

function getSlug() {
  return window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
}

function AppLink({ to = '', className = '', children, onClick, ...props }) {
  return (
    <a
      href={to ? `#/${to}` : '#/'}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (getSlug() === to) window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function ExternalLink({ href, className = '', children }) {
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Brand() {
  return (
    <AppLink to="" className="brand" aria-label="Zoo Negara home">
      <span className="brand-mark"><PawPrint size={22} strokeWidth={1.6} /></span>
      <span><strong>Zoo Negara</strong><small>Malaysia</small></span>
    </AppLink>
  );
}

const officialSite = 'https://www.zoonegara.my';

const mainNavigation = [
  { label: 'Home', to: '' },
  {
    label: 'Zoo Negara',
    to: 'about',
    items: [
      { label: 'About Us', to: 'about' },
      { label: 'Zoo Negara Logo', to: 'logo' },
      { label: 'The 5 Pillars We Stand', to: 'pillars' },
      { label: 'A Journey Through Time', href: `${officialSite}/journeythroughtime.pdf` },
      { label: 'Careers', href: `${officialSite}/jobs.html` },
    ],
  },
  {
    label: 'Visitor Info',
    to: 'opening-hours',
    items: [
      { label: 'Opening Hours & Rates', to: 'opening-hours' },
      { label: 'Zoo Map', to: 'map' },
      { label: 'Getting There', href: `${officialSite}/gettingthere.html` },
      { label: 'Food & Souvenir Kiosks', to: 'food-souvenir' },
      { label: 'Other Facilities', href: `${officialSite}/facilities.html` },
      { label: 'Show Times', href: `${officialSite}/showtime.html` },
      { label: 'Animal Feeding', to: 'animal-feeding' },
      { label: 'Rides', href: `${officialSite}/rides.html` },
    ],
  },
  {
    label: 'Have An Event At The Zoo',
    to: 'events',
    items: [
      { label: 'Birthdays', to: 'events' },
      { label: 'Family Day', href: `${officialSite}/familyday.html` },
      { label: 'Wedding at the Zoo', href: `${officialSite}/wedding.html` },
      { label: 'Scenic Points for Functions', href: `${officialSite}/scenicpoint.html` },
      { label: 'Kancil Hall', href: `${officialSite}/kancilhall.html` },
      { label: 'Tunku Abdul Rahman Theatre', href: `${officialSite}/theatre.html` },
    ],
  },
  {
    label: 'Get Involved',
    to: 'adopt',
    items: [
      { label: 'Adopt Our Animals', to: 'adopt' },
      { label: 'List of Donors / Sponsors', href: `${officialSite}/sponsor.html` },
      { label: 'KeeperKu Programme', href: `${officialSite}/volunteerprogram.html` },
      { label: 'Student Training', href: `${officialSite}/student.html` },
      { label: 'CSR Programme', href: `${officialSite}/csr.html` },
    ],
  },
  {
    label: 'News',
    href: `${officialSite}/newspaper01.html`,
    items: [
      { label: 'Newspaper Articles', href: `${officialSite}/newspaper01.html` },
      { label: 'Partnership News Highlight', href: `${officialSite}/story.html` },
      { label: 'Notice', href: `${officialSite}/notice.html` },
      { label: 'Archive', href: `${officialSite}/newsarchive.html` },
    ],
  },
  {
    label: 'Conservation',
    to: 'conservation',
    items: [
      { label: 'Animal In CITES', to: 'conservation' },
      { label: 'Research Paper On Milky Storks', href: `${officialSite}/rp_milkystorks.html` },
      { label: 'Research Paper On False Gharial', href: `${officialSite}/rp_falsegharial.html` },
    ],
  },
  { label: 'Education', to: 'education' },
  {
    label: 'Exhibits',
    to: 'exhibits',
    items: exhibits.map(([label, href]) => (
      label === 'Rimba Biodiversiti' ? { label, to: 'exhibits' } : { label, href }
    )),
  },
  { label: 'Contact Us', href: `${officialSite}/contact.html` },
];

function NavigationLink({ item, className = '', onClick, children, title, ...props }) {
  const redesigned = item.to !== undefined;
  const linkClass = `${className} ${redesigned ? 'redesigned-link' : ''}`.trim();
  const linkTitle = title || (redesigned ? 'Redesigned page' : undefined);
  const content = (
    <>
      {children || item.label}
      {redesigned && (
        <span className="redesign-marker" aria-hidden="true"><Sparkles size={9} /></span>
      )}
    </>
  );
  if (item.to !== undefined) {
    return <AppLink to={item.to} className={linkClass} onClick={onClick} title={linkTitle} {...props}>{content}</AppLink>;
  }
  return <a href={item.href} className={linkClass} onClick={onClick} title={linkTitle} {...props}>{content}</a>;
}

function Header({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const desktopNavRef = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
        setOpenGroup('');
      }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!desktopNavRef.current?.contains(event.target)) setOpenGroup('');
    };
    document.addEventListener('pointerdown', closeDropdown);
    return () => document.removeEventListener('pointerdown', closeDropdown);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [active]);

  const closeAll = () => {
    setMenuOpen(false);
    setOpenGroup('');
  };

  const isItemActive = (item) => (
    item.to === active || item.items?.some((child) => child.to === active)
  );

  return (
    <>
      <header className={`site-header ${menuOpen ? 'menu-is-open' : ''}`}>
        <div className="nav-shell glass">
          <Brand />
          <nav ref={desktopNavRef} className="desktop-nav" aria-label="Primary navigation">
            {mainNavigation.map((item) => {
              if (!item.items) {
                return (
                  <NavigationLink key={item.label} item={item} className={isItemActive(item) ? 'active' : ''} onClick={closeAll} />
                );
              }
              return (
                <div
                  className="nav-group"
                  key={item.label}
                  onMouseEnter={() => setOpenGroup(item.label)}
                  onMouseLeave={() => setOpenGroup((current) => (current === item.label ? '' : current))}
                  onFocus={() => setOpenGroup(item.label)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setOpenGroup('');
                  }}
                >
                  <NavigationLink
                    item={item}
                    className={`nav-parent ${isItemActive(item) ? 'active' : ''}`}
                    onClick={closeAll}
                    aria-haspopup="true"
                    aria-expanded={openGroup === item.label}
                  >
                    {item.label}<ChevronDown size={13} aria-hidden="true" />
                  </NavigationLink>
                  {openGroup === item.label && (
                    <div className={`dropdown glass ${item.items.length > 8 ? 'dropdown-wide' : ''}`}>
                      {item.items.map((child) => (
                        <NavigationLink
                          key={`${item.label}-${child.label}`}
                          item={child}
                          className={child.to === active ? 'active' : ''}
                          onClick={closeAll}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="nav-actions">
            <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Search pages">
              <Search size={19} />
            </button>
            <ExternalLink href={ticketUrl} className="nav-ticket">Tickets</ExternalLink>
            <button
              className="icon-button menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
          <span className="scroll-progress" aria-hidden="true" style={{ width: `${scrollProgress}%` }} />
        </div>
        <div className="redesign-legend glass" aria-label="Gold sparkle marks a redesigned page">
          <span className="redesign-marker" aria-hidden="true"><Sparkles size={9} /></span>
          <span>Redesigned page</span>
        </div>
        {menuOpen && (
          <nav className="mobile-nav glass" aria-label="Mobile navigation">
            <div className="mobile-redesign-key">
              <span className="redesign-marker" aria-hidden="true"><Sparkles size={9} /></span>
              <span>Redesigned page</span>
            </div>
            {mainNavigation.map((item) => (
              item.items ? (
                <div className="mobile-nav-group" key={item.label}>
                  <button
                    type="button"
                    className={isItemActive(item) ? 'active' : ''}
                    onClick={() => setOpenGroup((current) => (current === item.label ? '' : item.label))}
                    aria-expanded={openGroup === item.label}
                  >
                    {item.label}<ChevronDown size={16} aria-hidden="true" />
                  </button>
                  {openGroup === item.label && (
                    <div className="mobile-submenu">
                      {item.items.map((child) => (
                        <NavigationLink
                          key={`${item.label}-${child.label}`}
                          item={child}
                          className={child.to === active ? 'active' : ''}
                          onClick={closeAll}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavigationLink key={item.label} item={item} className={isItemActive(item) ? 'active' : ''} onClick={closeAll} />
              )
            ))}
          </nav>
        )}
      </header>
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function SearchDialog({ onClose }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return pages;
    return pages.filter((page) => `${page.label} ${page.keywords}`.toLowerCase().includes(value));
  }, [query]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="search-dialog glass" role="dialog" aria-modal="true" aria-label="Search Zoo Negara pages" onMouseDown={(event) => event.stopPropagation()}>
        <div className="dialog-topline">
          <span>Explore the site</span>
          <button className="icon-button" onClick={onClose} aria-label="Close search"><X size={20} /></button>
        </div>
        <label className="search-field">
          <Search size={20} />
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search hours, map, feeding…" />
        </label>
        <div className="search-results">
          {results.length ? results.map((page) => (
            <AppLink key={page.slug || 'home'} to={page.slug} onClick={onClose}>
              <span>{page.label}</span><ArrowRight size={17} />
            </AppLink>
          )) : <p className="empty-state">No matching page found.</p>}
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  return (
    <aside className="quick-actions" aria-label="Quick actions">
      <span className="quick-label">Quick access</span>
      <ExternalLink href={ticketUrl} className="quick-action-item">
        <span className="quick-icon"><Ticket size={21} /></span>
        <span className="quick-copy"><small>Skip the queue</small><strong>Buy tickets</strong></span>
        <ChevronRight className="quick-arrow" size={17} />
      </ExternalLink>
      <AppLink to="map" className="quick-action-item">
        <span className="quick-icon"><MapIcon size={21} /></span>
        <span className="quick-copy"><small>Plan your trail</small><strong>View map</strong></span>
        <ChevronRight className="quick-arrow" size={17} />
      </AppLink>
    </aside>
  );
}

function SectionHeading({ eyebrow, title, text, action }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-wash" />
        <div className="hero-fireflies" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
        </div>
        <div className="hero-content container">
          <span className="eyebrow hero-eyebrow">Welcome to Zoo Negara</span>
          <h1>The living heart of <em>wild Malaysia</em></h1>
          <p>
            Zoo Negara Malaysia is managed by the Malaysian Zoological Society, a non-governmental organization established to create the first local zoo for Malaysians.
          </p>
          <div className="hero-buttons">
            <AppLink to="opening-hours" className="button primary">Plan your visit<ArrowRight size={17} /></AppLink>
            <AppLink to="exhibits" className="button ghost">Explore the zoo</AppLink>
          </div>
          <div className="hero-facts">
            <div><strong>1963</strong><span>Officially opened</span></div>
            <div><strong>Daily</strong><span>9.00am – 5.00pm</span></div>
            <div><strong>Hulu Kelang</strong><span>Ampang, Selangor</span></div>
          </div>
        </div>
        <div className="scroll-cue"><span>Discover</span><i /></div>
      </section>

      <div className="announcement">
        <div className="container">
          <AlertTriangle size={18} />
          <p><strong>Announcement:</strong> Our Multi-animal Show will be CLOSED on Friday EXCEPT school holidays & public holidays.</p>
          <AppLink to="opening-hours">View details<ArrowRight size={15} /></AppLink>
        </div>
      </div>

      <section className="section intro-section">
        <div className="container intro-grid">
          <div className="intro-image image-frame">
            <img src="/assets/official-tiger.jpg" alt="A tiger at Zoo Negara" />
            <span className="image-index">01 / Welcome</span>
          </div>
          <div className="intro-copy">
            <span className="eyebrow">Our story</span>
            <h2>Welcome to Zoo Negara</h2>
            <p>Zoo Negara was officially opened on 14th November 1963 and has matured into a well-known zoo all around the world. We have a total of over 3072 ......</p>
            <AppLink to="about" className="text-link">Read more on Zoo Negara <ArrowRight size={16} /></AppLink>
          </div>
        </div>
      </section>

      <section className="section essentials-section">
        <div className="container">
          <SectionHeading eyebrow="Before you arrive" title="Everything for a wilder day out" text="Quick access to the visitor information published by Zoo Negara." />
          <div className="essentials-grid">
            <AppLink to="opening-hours" className="essential-card"><Clock3 /><span>Open daily</span><strong>9.00am – 5.00pm</strong><ArrowRight /></AppLink>
            <AppLink to="map" className="essential-card"><MapIcon /><span>Find your way</span><strong>Zoo Map</strong><ArrowRight /></AppLink>
            <AppLink to="animal-feeding" className="essential-card"><Bird /><span>Weekend activity</span><strong>Animal Feeding</strong><ArrowRight /></AppLink>
            <AppLink to="food-souvenir" className="essential-card"><Utensils /><span>Pause & refuel</span><strong>Food & Souvenirs</strong><ArrowRight /></AppLink>
          </div>
        </div>
      </section>

      <section className="section highlights-section">
        <div className="container">
          <SectionHeading eyebrow="What's on" title="Highlights" />
          <div className="highlight-grid">
            {highlights.map((item, index) => (
              <ExternalLink key={item.title} href={item.href} className={`highlight-card ${index === 0 ? 'featured' : ''}`}>
                <img src={item.image} alt="" />
                <span className="card-shade" />
                <div><small>{String(index + 1).padStart(2, '0')}</small><h3>{item.title}</h3>{item.text && <p>{item.text}</p>}<span className="card-cta">{item.cta}<ArrowRight size={15} /></span></div>
              </ExternalLink>
            ))}
          </div>
        </div>
      </section>

      <section className="section media-section">
        <div className="container">
          <SectionHeading eyebrow="Watch & learn" title="Animal & Zookeeper" />
          <div className="media-grid">
            <VideoCard title="Zoo Negara Virtual tour Ep.7" videoId="hrF3ySEek40" />
            <VideoCard title="Zoo Camp" videoId="TkrOVL8XqZo" />
            <div className="link-panel glass-card">
              <div><span className="eyebrow">Latest news</span><ExternalLink href="https://www.zoonegara.my/birth18.html">New Births<ArrowRight size={15} /></ExternalLink><ExternalLink href="https://www.zoonegara.my/newsarrivals.html">New Arrivals<ArrowRight size={15} /></ExternalLink></div>
              <div><span className="eyebrow">Info</span><ExternalLink href="https://www.zoonegara.my/accre.html">Accreditation / Certification<ArrowRight size={15} /></ExternalLink><ExternalLink href="https://www.zoonegara.my/e-download.html">E-Download<ArrowRight size={15} /></ExternalLink><ExternalLink href="https://www.zoonegara.my/FAQ.html">FAQ<ArrowRight size={15} /></ExternalLink></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function VideoCard({ title, videoId }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="video-card">
      {playing ? (
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      ) : (
        <button onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
          <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" />
          <span><PlayCircle size={54} /></span>
        </button>
      )}
      <h3>{title}</h3>
    </div>
  );
}

function PageHero({ eyebrow, title, text, image = '/assets/hero-malayan-tiger.png' }) {
  return (
    <section className="page-hero" style={{ '--page-image': `url(${image})` }}>
      <div className="container page-hero-content">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    const close = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [onClose]);
  return (
    <div className="modal-backdrop image-modal" onMouseDown={onClose} role="presentation">
      <div role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button" onClick={onClose} aria-label="Close image"><X /></button>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Zoo Negara"
        title="About Us"
        text="Malaysia's national zoo — shaped by conservation, education, recreation, training and research."
        image="/assets/hero-malayan-tiger.png"
      />
      <section className="section page-section about-page">
        <div className="container about-intro-layout">
          <div className="about-story">
            <span className="eyebrow">Our story</span>
            <h2>A national home for wildlife since 1963</h2>
            <p>Zoo Negara Malaysia is managed by the Malaysian Zoological Society, a non-governmental organization established to create the first local zoo for Malaysians.</p>
            <p>Zoo Negara was officially opened on 14th November 1963 and has matured into a well-known zoo all around the world. We have a total of over 3072 specimen from 327 species of mammals, birds, reptiles, amphibians and fish.</p>
            <p>Zoo Negara covers 61.53 acres of land which is situated only 5km from the city of Kuala Lumpur.</p>
            <p>Over the years, the zoo has transformed itself to an open concept zoo with over 90% of its animals being kept in spacious exhibits with landscape befitting its nature. We are working in making sure that the old zoo concept is changed entirely.</p>
          </div>
          <figure className="about-entrance image-frame">
            <img src="/assets/official-tiger.jpg" alt="Malayan tiger swimming at Zoo Negara Malaysia" />
            <figcaption><span>Open-concept zoo</span><strong>Nature-led spaces for more than 90% of the animals</strong></figcaption>
          </figure>
        </div>

        <div className="container about-stats" aria-label="Zoo Negara facts">
          <article><span>Established</span><strong>1963</strong><small>Officially opened 14 November</small></article>
          <article><span>Living landscape</span><strong>61.53</strong><small>Acres of zoo grounds</small></article>
          <article><span>Animal family</span><strong>3,072+</strong><small>Specimens in our care</small></article>
          <article><span>Biodiversity</span><strong>327</strong><small>Species represented</small></article>
        </div>

        <div className="container about-purpose-grid">
          <article className="about-vision glass-card">
            <div className="purpose-icon"><Trees size={25} /></div>
            <span className="eyebrow">Our vision</span>
            <h2>A premier zoological park and aquaria</h2>
            <p>To be one of the world's premier zoological park and aquaria dedicated to conservation, recreation, education, training and research of various animal and plant species.</p>
          </article>
          <article className="about-mission glass-card">
            <div className="purpose-icon"><PawPrint size={25} /></div>
            <span className="eyebrow">Our mission</span>
            <h2>Care, lead and collaborate</h2>
            <ol>
              <li><span>01</span><p>To provide an outstanding and dynamic habitat for animals and plant life and incorporating high quality animal health care and husbandry.</p></li>
              <li><span>02</span><p>To be the leader and innovator in wildlife conservation, recreation, education, training and research.</p></li>
              <li><span>03</span><p>To collaborate and disseminate scientific knowledge to local, regional and worldwide zoos through our science-based approach to wildlife management.</p></li>
            </ol>
          </article>
        </div>

        <div className="container about-links glass-card">
          <div><span className="eyebrow">Explore our foundations</span><h2>Learn more about Zoo Negara</h2></div>
          <div>
            <AppLink to="pillars">The 5 Pillars We Stand<ArrowRight size={16} /></AppLink>
            <ExternalLink href={`${officialSite}/journeythroughtime.pdf`}>A Journey Through Time<ArrowRight size={16} /></ExternalLink>
            <AppLink to="opening-hours">Plan your visit<ArrowRight size={16} /></AppLink>
          </div>
        </div>
      </section>
    </>
  );
}

const logoMeaningItems = [
  {
    key: 'a',
    title: 'Rooted fundamentals',
    text: 'Guided by strong basic fundamentals deeply rooted into the ground, Zoo Negara is forging forward to transform itself into a 21st century zoo dedicated to conservation, recreation, education, training and research of flora and fauna. Also, the essence of continuous innovation is still ahead with a clear sense of direction.',
  },
  {
    key: 'b',
    title: 'A unified vision',
    text: 'Collision of the two lines signifies the key strength of Zoo Negara sharing a unified vision for flora and fauna and laying the groundwork with continuous improvement. The intersection also denotes the progressive system thinking in Zoo Negara with the responsibility to communicate its extensive knowledge to be shared with local and international zoos.',
  },
  {
    key: 'c',
    title: 'A holistic circle',
    text: 'These combined efforts spiral into a circle which symbolizes the holistic management approach to conservation as the key and unique characteristic of Zoo Negara, making it a model for other zoos. These efforts also further create a dynamic projectory at a higher level each time.',
  },
  {
    key: 'd',
    title: 'Earth-tone identity',
    text: 'The earth tones of gold and green colours denote Zoo Negara’s surroundings for flora and fauna in Kuala Lumpur city.',
  },
];

function LogoPage() {
  return (
    <>
      <PageHero
        eyebrow="Zoo Negara"
        title="Meaning of the Zoo Negara Logo"
        text="The story of Sang Kancil, expressed through a living symbol of knowledge, conservation and progress."
        image="/assets/animal-feeding.jpg"
      />
      <section className="section page-section logo-page">
        <div className="container logo-origin">
          <figure className="logo-showcase glass-card">
            <div className="logo-halo" aria-hidden="true" />
            <img src="/assets/zoo-logo.jpg" alt="Annotated Zoo Negara Malaysia logo showing sections a, b and c" />
            <figcaption>Official annotated Zoo Negara logo artwork</figcaption>
          </figure>

          <div className="logo-origin-copy">
            <span className="eyebrow">The emblem</span>
            <h2>Sang Kancil — clever by nature</h2>
            <div className="logo-origin-points">
              <article>
                <span>01</span>
                <p>The Malaysian Zoological Society has adopted the drawing of a mouse deer or “Sang Kancil” as the Society’s emblem.</p>
              </article>
              <article>
                <span>02</span>
                <p>Sang Kancil is a clever, tricky mouse deer who is always finding himself in predicaments with animals that want to eat him or harm him, but he cleverly manages to escape each time.</p>
              </article>
            </div>
          </div>
        </div>

        <div className="container logo-meaning-heading">
          <span className="eyebrow">Reading the mark</span>
          <h2>Four ideas drawn into one identity</h2>
          <p>The annotations on the original artwork reveal how every line, intersection, circle and colour carries part of Zoo Negara’s purpose.</p>
        </div>

        <div className="container logo-meaning-grid">
          {logoMeaningItems.map(({ key, title, text }) => (
            <article className={`logo-meaning-card logo-meaning-${key} glass-card`} key={key}>
              <div className="logo-letter">{key}</div>
              <span className="eyebrow">Logo detail {key.toUpperCase()}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              {key === 'd' && (
                <div className="logo-colours" aria-label="Zoo Negara logo colours">
                  <span><i className="logo-colour-gold" />Gold</span>
                  <span><i className="logo-colour-green" />Green</span>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="container logo-next glass-card">
          <div>
            <span className="eyebrow">The story continues</span>
            <h2>Explore what the mark stands for</h2>
          </div>
          <div>
            <AppLink to="about">About Zoo Negara<ArrowRight size={16} /></AppLink>
            <AppLink to="pillars">The Five Pillars<ArrowRight size={16} /></AppLink>
            <AppLink to="conservation">Conservation work<ArrowRight size={16} /></AppLink>
          </div>
        </div>
      </section>
    </>
  );
}

const pillarItems = [
  {
    number: '01',
    title: 'Education',
    icon: BookOpen,
    image: '/assets/home-marmoset.jpg',
    text: 'We believe that education is the only key in creating awareness on wildlife conservation. Zoo Negara is an open classroom for young minds to learn and nurture their interest and care for wildlife. Check out our Education Package for schools and even for you!',
  },
  {
    number: '02',
    title: 'Conservation',
    icon: Trees,
    image: '/assets/official-tiger.jpg',
    text: 'What will the world be without wildlife? Conserving Malaysian wildlife is one of our main missions. Animals such as the False Gharial and the Milky Storks are highly endangered wildlife that is not so well known compared to the Malayan Tiger or the Bornean Orang Utan. Zoo Negara has managed to breed these two species and we are currently working with the local Wildlife Department in releasing them back into the wild!',
  },
  {
    number: '03',
    title: 'Research',
    icon: Search,
    image: '/assets/rimba-03.jpg',
    text: 'Zoo Negara provides a haven knowledge and experience for all. Researchers students from the Zoology, Biology and Veterinary fields have a multitude of choices when doing their research at the zoo as we have more than 400 species to choose from. We welcome everybody (includiing foreigners) to enter our doors of knowledge.',
  },
  {
    number: '04',
    title: 'Recreation',
    icon: Sparkles,
    image: '/assets/home-panda.jpg',
    text: 'Entertainment is part of the Malaysian culture and the zoo is not an exception. Our animal shows potray the best in animal behaviour, all natural. Our animal shows are educational so visitors will be able to learn and have fun at the same time. Our shows are definitely not circus acts.',
  },
  {
    number: '05',
    title: 'Training',
    icon: GraduationCap,
    image: '/assets/animal-feeding.jpg',
    text: "Zoo Negara strives to provide the very best in assisting other zoos in Malaysia through its vast strong knowledge and experience in the field of wildlife management. Further more, we are actively involved in the national and international zoological community thereby contributing to Malaysia's overall national role.",
  },
];

function PillarsPage() {
  return (
    <>
      <PageHero
        eyebrow="Zoo Negara"
        title="The Five Pillars We Stand On"
        text="Education · Conservation · Research · Recreation · Training"
        image="/assets/official-tiger.jpg"
      />
      <section className="section page-section pillars-page">
        <div className="container pillars-intro">
          <div>
            <span className="eyebrow">Our shared purpose</span>
            <h2>Five commitments at the heart of Zoo Negara</h2>
          </div>
          <p>Each pillar connects people, knowledge and wildlife — shaping how the zoo teaches, protects, studies, welcomes and shares its experience.</p>
        </div>

        <div className="container pillars-list">
          {pillarItems.map(({ number, title, icon: Icon, image, text }) => (
            <article className="pillar-card glass-card" key={title}>
              <div className="pillar-image">
                <img src={image} alt="" loading="lazy" />
                <span>{number}</span>
              </div>
              <div className="pillar-copy">
                <div className="pillar-icon"><Icon size={24} /></div>
                <span className="eyebrow">Pillar {number}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="container pillars-next glass-card">
          <div>
            <span className="eyebrow">Continue exploring</span>
            <h2>See these pillars in action</h2>
          </div>
          <div>
            <AppLink to="education">Education programmes<ArrowRight size={16} /></AppLink>
            <AppLink to="conservation">Conservation work<ArrowRight size={16} /></AppLink>
            <AppLink to="about">About Zoo Negara<ArrowRight size={16} /></AppLink>
          </div>
        </div>
      </section>
    </>
  );
}

const rateRows = [
  ['Adult', 'RM55.00', 'RM60.00', 'RM93.00'],
  ['Children (3 to 12 years old)', 'RM28.00', 'RM35.00', 'RM48.00'],
  ['Senior Citizen (60 years and above)', 'RM33.00', 'RM60.00', 'RM93.00'],
];

function OpeningHoursPage() {
  const [lightbox, setLightbox] = useState(false);
  return (
    <>
      <PageHero eyebrow="Visitor information" title="Opening Hours & Rates" text="Open daily from 9.00am to 5.00pm." />
      <section className="section page-section">
        <div className="container">
          <div className="info-strip">
            <div><Clock3 /><span>Operation hours</span><strong>9.00am – 5.00pm</strong></div>
            <div><CalendarDays /><span>Days</span><strong>Open daily</strong></div>
            <div><Ticket /><span>Rate card</span><strong>As at 1st August 2026</strong></div>
          </div>

          <SectionHeading eyebrow="Entrance fee" title="Plan your admission" text="Rates are shown exactly as published in Zoo Negara's current entrance-fee artwork." />
          <div className="rate-table-wrap glass-card">
            <table className="rate-table">
              <thead><tr><th>Visitor</th><th>Malaysian</th><th>Foreigner<br /><small>i-Kad / Working Permit / Dependant Pass</small></th><th>Foreigner<br /><small>Others</small></th></tr></thead>
              <tbody>{rateRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={cell} data-label={index ? ['Malaysian', 'Foreigner (pass)', 'Foreigner (others)'][index - 1] : 'Visitor'}>{cell}</td>)}</tr>)}</tbody>
            </table>
            <div className="rate-notes">
              <p>Free admission for kids below 36 months.</p>
              <p>Bring along the original passport / ID card at the ticket counter for verification.</p>
            </div>
          </div>

          <div className="split-grid rate-details">
            <article className="glass-card">
              <span className="number-tag">01</span><h3>School Concession Rate</h3>
              <ul className="detail-list"><li><span>Student</span><strong>RM25.00</strong></li><li><span>1 Teacher</span><strong>FREE with every 10 students</strong></li><li><span>Additional teacher</span><strong>RM27.00</strong></li></ul>
              <p className="small-note">A letter from school and student with uniform is required. Group discount: minimum 20 pax (RM2 off normal ticket rate).</p>
            </article>
            <article className="glass-card">
              <span className="number-tag">02</span><h3>Multi-Animal Show</h3>
              <p>11.00am & 3.00pm, Saturday – Thursday.</p>
              <p className="small-note">Closed on Friday except school holidays & public holidays. Activities are subject to cancellation without prior notice.</p>
            </article>
            <article className="glass-card">
              <span className="number-tag">03</span><h3>Free Admission</h3>
              <p>OKU / Disable</p><p className="small-note">Please show a valid OKU card.</p>
            </article>
          </div>

          <div className="source-artwork">
            <SectionHeading eyebrow="Complete published information" title="Official 2026 rate card" action={<button className="button ghost" onClick={() => setLightbox(true)}>View full size<Plus size={17} /></button>} />
            <button className="artwork-button" onClick={() => setLightbox(true)}><img src="/assets/rates-2026.png" alt="Zoo Negara entrance fees, activities, tram rides and visitor notice" /></button>
          </div>
        </div>
      </section>
      {lightbox && <ImageLightbox src="/assets/rates-2026.png" alt="Zoo Negara entrance fee card" onClose={() => setLightbox(false)} />}
    </>
  );
}

function MapPage() {
  const [scale, setScale] = useState(1);
  const [lightbox, setLightbox] = useState(false);
  return (
    <>
      <PageHero eyebrow="Visitor information" title="Zoo Map" text="Find exhibits, facilities and the best route for your day." />
      <section className="section page-section map-section">
        <div className="container">
          <div className="map-toolbar glass-card">
            <div><MapIcon /><span>Zoo Negara visitor map</span></div>
            <div>
              <button onClick={() => setScale(Math.max(1, scale - 0.2))} aria-label="Zoom out"><Minus /></button>
              <span>{Math.round(scale * 100)}%</span>
              <button onClick={() => setScale(Math.min(2.2, scale + 0.2))} aria-label="Zoom in"><Plus /></button>
              <button onClick={() => setScale(1)} aria-label="Reset zoom"><RotateCcw /></button>
              <button onClick={() => setLightbox(true)} aria-label="Open map full size"><ExternalLinkIcon /></button>
            </div>
          </div>
          <div className="map-viewport" aria-label="Zoomable Zoo Negara map">
            <img src="/assets/zoo-map.jpg" alt="Zoo Negara map with exhibits and visitor facilities" style={{ transform: `scale(${scale})` }} />
          </div>
          <p className="map-tip"><Info size={16} /> Use the controls to zoom. On touch screens, scroll the map area after zooming.</p>
        </div>
      </section>
      {lightbox && <ImageLightbox src="/assets/zoo-map.jpg" alt="Zoo Negara visitor map" onClose={() => setLightbox(false)} />}
    </>
  );
}

function FeedingPage() {
  const times = [
    ["Children's World", '11.30 pm – 12.00 pm'],
    ['Javan Deer', '12.30 pm – 1.00 pm'],
    ['Spotted Deer Exhibit', '2.00 pm – 3.00 pm'],
  ];
  return (
    <>
      <PageHero eyebrow="Visitor information" title="Animal Feeding" text="Animal feeding sessions on weekends and public holidays." image="/assets/animal-feeding.jpg" />
      <section className="section page-section">
        <div className="container split-feature">
          <div className="feature-image image-frame"><img src="/assets/animal-feeding.jpg" alt="Animal feeding session at Zoo Negara" /><span className="image-index">Weekends & public holidays</span></div>
          <div>
            <SectionHeading eyebrow="Published schedule" title="Animal Feeding Session" />
            <div className="schedule-list">
              {times.map(([name, time], index) => <div key={name}><span>{String(index + 1).padStart(2, '0')}</span><h3>{name}</h3><strong>{time}</strong></div>)}
            </div>
            <p className="notice"><AlertTriangle size={17} /> The above is subject to cancellation without prior notice.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function FoodPage() {
  return (
    <>
      <PageHero eyebrow="Visitor information" title="Food & Souvenir Kiosks" text="Family meals, quick bites, sweet treats and Zoo Negara keepsakes." image="/assets/welcome.jpg" />
      <section className="section page-section">
        <div className="container">
          <SectionHeading eyebrow="Across the zoo" title="Pause, refuel, take something home" />
          <div className="outlet-grid">
            {outlets.map((outlet, index) => (
              <article className="outlet-card glass-card" key={outlet.name}>
                <div className="outlet-top"><span>{String(index + 1).padStart(2, '0')}</span>{index < 6 ? <Utensils /> : <ShoppingBag />}</div>
                <small>{outlet.type}</small><h3>{outlet.name}</h3><p>{outlet.text}</p>
                {outlet.href && <ExternalLink href={outlet.href} className="text-link">More <ArrowRight size={15} /></ExternalLink>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function EventsPage() {
  return (
    <>
      <PageHero eyebrow="Have an event at the zoo" title="Birthdays / Zoo Hunt / Explorace" text="A unique and memorable celebration at Zoo Negara." image="/assets/highlight-zoocamp.jpg" />
      <section className="section page-section">
        <div className="container event-layout">
          <div className="event-lead">
            <span className="eyebrow">Celebrate among wildlife</span>
            <h2>A birthday with a story to tell</h2>
            <p>Have you ever wondered how you could come up with a unique yet memorable birthday party for your child? Try having it at Zoo Negara and we will take care of your every need.</p>
            <p>We will even bring out some tame animals such as Spotty the python and Megat the hornbill for a special photography session!</p>
            <ExternalLink href="https://www.zoonegara.my/photo_birthday.html" className="button ghost">View party photos<ExternalLinkIcon size={16} /></ExternalLink>
          </div>
          <div className="event-aside glass-card">
            <CalendarDays size={35} />
            <span className="eyebrow">The Wild Restaurant</span>
            <h3>Food, games & songs</h3>
            <p>Kiddy food packages, games and sing along songs awaits your child on his/her birthday!</p>
            <dl><div><dt>Restaurant details</dt><dd><a href="tel:+60341069146">+603-41069146</a></dd></div><div><dt>Customer Service</dt><dd><a href="tel:+60341083422">+603-41083422</a></dd></div><div><dt>Email</dt><dd><a href="mailto:customerservice@zoonegaramalaysia.my">customerservice@zoonegaramalaysia.my</a></dd></div></dl>
          </div>
        </div>
      </section>
    </>
  );
}

function AdoptPage() {
  const [lightbox, setLightbox] = useState('');
  return (
    <>
      <PageHero eyebrow="Get involved" title="Adopt Our Animals" text="Support the annual food, enrichment and veterinary care of Zoo Negara's animal family." image="/assets/official-tiger.jpg" />
      <section className="section page-section">
        <div className="container adopt-intro">
          <div>
            <span className="eyebrow">Adoption Package</span><h2>A direct way to care</h2>
            <p>Zoo Negara Malaysia has partnered with Ticket2u to create a new way for people to donate, allowing donors to support ‘Adopt An Animal’ initiatives and Zoo Negara will be getting the financial support needed to take care of our animals family.</p>
            <p>Once you have decided to adopt, please click on the link below to proceed accordingly.</p>
            <ExternalLink href="https://www.ticket2u.com.my/event/18171/zoo-negara-adoption-package" className="button primary">Donate now<HeartHandshake size={18} /></ExternalLink>
          </div>
          <button className="adopt-art image-frame" onClick={() => setLightbox('/assets/adoption-package-large.jpg')}><img src="/assets/adoption-package.jpg" alt="Zoo Negara adoption package tiers" /><span className="image-index">View package details</span></button>
        </div>
        <div className="container adopt-copy">
          <article className="glass-card"><h3>How adoption helps</h3><p>Zoo Negara is managed by the Malaysian Zoological Society, a non-governmental organization that survives mainly through its gate collection and sponsorship from individuals, schools and corporate companies.</p><p>All our animals are up for adoption and you may help us adopt one by maintaining its annual food, enrichment and veterinary care. In return, you will receive a certificate of adoption stating your selected animal.</p></article>
          <article className="glass-card"><h3>Package information</h3><button className="mini-art" onClick={() => setLightbox('/assets/adoption-announcement.jpg')}><img src="/assets/adoption-announcement.jpg" alt="Zoo Negara adoption announcement" /></button><button className="text-link as-button" onClick={() => setLightbox('/assets/adoption-terms.jpg')}>View Terms & Conditions <ArrowRight size={15} /></button></article>
        </div>
        <div className="container contact-bar"><span>For further details</span><strong>Public Relations & Marketing Department</strong><a href="tel:+60341083422">+603-4108 3422/7/8</a><a href="mailto:pr@zoonegaramalaysia.my">pr@zoonegaramalaysia.my</a></div>
      </section>
      {lightbox && <ImageLightbox src={lightbox} alt="Zoo Negara adoption information" onClose={() => setLightbox('')} />}
    </>
  );
}

const educationItems = [
  { title: 'Cikgu Kancil packages', icon: GraduationCap, text: 'Join the Education package for an outdoor learning experience that you will never forget..', link: 'https://www.zoonegara.my/education/pdf/cikgu_kancil.pdf', cta: 'Enrol your students' },
  { title: 'KeeperKu programme', icon: HeartHandshake, text: 'Bored and want to spend your time wisely? Love animals? Then, be a volunteer at Zoo Negara!', link: 'https://www.ticket2u.com.my/event/27061', cta: 'KeeperKu Programme', secondLink: 'https://www.zoonegara.my/faq-education.html' },
  { title: 'Research programme', icon: BookOpen, text: 'Zoo Negara is also a place where students conduct their research projects for their certificate/diploma/degree/masters/PHD from different area of interests.', link: 'https://www.zoonegara.my/education/pdf/researchprog.pdf', cta: 'Apply for research' },
  { title: 'Seminars and courses', icon: Sparkles, text: 'Zoo Negara caters for seminars and courses for agencies, private corporations which involve wildlife conservation and management. Courses and topics offered are both special and informative. Field studies around the zoo are also included. Among others, the programme aims to spread knowledge on animal behaviour, animal handling and on public safety in regards to animal encounters. This is in line with one of the Zoo Negara’s main goals, which is wildlife conservation.' },
];

function EducationPage() {
  return (
    <>
      <PageHero eyebrow="Zoo education" title="A gateway to wildlife discovery" text="Education Services at Zoo Negara." image="/assets/rimba-03.jpg" />
      <section className="section page-section">
        <div className="container">
          <SectionHeading eyebrow="Education services" title="Learning in the living world" />
          <div className="education-grid">
            {educationItems.map((item, index) => {
              const Icon = item.icon;
              return <article className={`education-card glass-card ${index === 3 ? 'wide' : ''}`} key={item.title}><div><Icon /><span>{String(index + 1).padStart(2, '0')}</span></div><h3>{item.title}</h3><p>{item.text}</p>{item.link && <ExternalLink href={item.link} className="text-link">{item.cta}<ArrowRight size={15} /></ExternalLink>}{item.secondLink && <ExternalLink href={item.secondLink} className="sub-link">FAQ</ExternalLink>}</article>;
            })}
          </div>
          <div className="education-contact glass-card"><span>Education Department</span><a href="tel:+60341083422">Tel: 603-4108 3422</a><span>Fax: 603-4108 2219</span><a href="mailto:education@zoonegaramalaysia.my">education@zoonegaramalaysia.my</a></div>
        </div>
      </section>
    </>
  );
}

function ExhibitsPage() {
  const [selected, setSelected] = useState(rimbaImages[0]);
  const [lightbox, setLightbox] = useState(false);
  return (
    <>
      <PageHero eyebrow="Exhibits" title="Rimba Biodiversiti" text="Look closer at the mini beasts and butterflies of Zoo Negara." image="/assets/rimba-01.jpg" />
      <section className="section page-section">
        <div className="container rimba-layout">
          <div className="gallery-panel">
            <button className="gallery-main image-frame" onClick={() => setLightbox(true)}><img src={selected} alt="Rimba Biodiversiti gallery selection" /><span className="image-index">Open full size</span></button>
            <div className="gallery-thumbs">{rimbaImages.map((image, index) => <button key={image} onClick={() => setSelected(image)} className={selected === image ? 'active' : ''}><img src={image} alt={`Rimba Biodiversiti thumbnail ${index + 1}`} /></button>)}</div>
          </div>
          <div className="rimba-copy"><span className="eyebrow">Rimba Biodiversiti</span><h2>Small lives, vital roles</h2><p>The word ‘insects’ often send chills to people, yet these invertebrates are often misunderstood. They play an important role to the survival of vertebrate and that also includes us!</p><p>Take a closer look at the mini beasts or bring your DSLR camera to capture the beauty of the butterflies at the Rimba Biodiversiti.</p><div className="programme-links"><ExternalLink href="https://www.zoonegara.my/insect.html">Nature Science Programme – Butterfly programme for kids<ArrowRight size={15} /></ExternalLink><ExternalLink href="https://www.zoonegara.my/minibeast%20project.html">Minibeast Project for Kids<ArrowRight size={15} /></ExternalLink><ExternalLink href="https://www.zoonegara.my/butterfly%20project.html">Butterfly Project for Kids<ArrowRight size={15} /></ExternalLink></div></div>
        </div>
        <div className="container exhibit-list-section"><SectionHeading eyebrow="Across Zoo Negara" title="Exhibits" /><div className="exhibit-list">{exhibits.map(([name, href], index) => <ExternalLink href={href} key={name}><span>{String(index + 1).padStart(2, '0')}</span>{name}<ArrowRight size={15} /></ExternalLink>)}</div></div>
      </section>
      {lightbox && <ImageLightbox src={selected} alt="Rimba Biodiversiti gallery" onClose={() => setLightbox(false)} />}
    </>
  );
}

function ConservationPage() {
  const [lightbox, setLightbox] = useState(false);
  return (
    <>
      <PageHero eyebrow="Conservation" title="Animal in CITES" text="Zoo Negara's conservation page and related research." image="/assets/cites-animals.jpg" />
      <section className="section page-section conservation-page">
        <div className="container conservation-layout">
          <button className="cites-art image-frame" onClick={() => setLightbox(true)}><img src="/assets/cites-animals.jpg" alt="Zoo Negara conservation animals including orangutans, tiger, gharial, tapir, hornbill and stork" /><span className="image-index">View conservation artwork</span></button>
          <div className="conservation-links"><span className="eyebrow">Research at Zoo Negara</span><h2>Related conservation papers</h2><ExternalLink href="https://www.zoonegara.my/rp_milkystorks.html"><span>01</span><strong>Research Paper On Milky Storks</strong><ArrowRight /></ExternalLink><ExternalLink href="https://www.zoonegara.my/rp_falsegharial.html"><span>02</span><strong>Research Paper On False Gharial</strong><ArrowRight /></ExternalLink></div>
        </div>
      </section>
      {lightbox && <ImageLightbox src="/assets/cites-animals.jpg" alt="Zoo Negara conservation animals" onClose={() => setLightbox(false)} />}
    </>
  );
}

function NotFoundPage() {
  return <section className="not-found"><div><span className="eyebrow">404</span><h1>This trail ends here.</h1><p>The page you requested could not be found.</p><AppLink to="" className="button primary">Return home</AppLink></div></section>;
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand"><Brand /><p>Zoo Negara, Hulu Kelang, 68000 Ampang, Selangor Darul Ehsan, Malaysia</p></div>
        <div><span>Visit</span><AppLink to="opening-hours">Opening Hours & Rates</AppLink><AppLink to="map">Zoo Map</AppLink><AppLink to="animal-feeding">Animal Feeding</AppLink></div>
        <div><span>Explore</span><AppLink to="exhibits">Exhibits</AppLink><AppLink to="education">Education</AppLink><AppLink to="conservation">Conservation</AppLink></div>
        <div><span>Contact</span><a href="tel:+60341083422">+603-4108 3422/7/8</a><span className="muted">Fax: +603-4107 5375</span><ExternalLink href="http://zoomail.zoonegaramalaysia.my/">Staff Webmail</ExternalLink></div>
      </div>
      <div className="container footer-bottom"><span>Zoo Negara Malaysia redesign concept</span><span>Content retained from the listed Zoo Negara pages</span><ExternalLink href="https://www.zoonegara.my/index.htm">Original website <ExternalLinkIcon size={13} /></ExternalLink></div>
    </footer>
  );
}

const pageComponents = {
  '': HomePage,
  about: AboutPage,
  logo: LogoPage,
  pillars: PillarsPage,
  'opening-hours': OpeningHoursPage,
  map: MapPage,
  'animal-feeding': FeedingPage,
  'food-souvenir': FoodPage,
  events: EventsPage,
  adopt: AdoptPage,
  education: EducationPage,
  exhibits: ExhibitsPage,
  conservation: ConservationPage,
};

export default function App() {
  const [active, setActive] = useState(getSlug());
  useEffect(() => {
    const onHash = () => {
      setActive(getSlug());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHash);
    if (!window.location.hash) window.history.replaceState(null, '', '#/');
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const page = pages.find((item) => item.slug === active);
    document.title = `${page?.label || 'Page not found'} — Zoo Negara Malaysia`;
  }, [active]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const selectors = [
      '.section-heading', '.intro-grid', '.essentials-grid', '.highlight-card',
      '.video-card', '.glass-card', '.feature-image', '.gallery-panel',
      '.exhibit-list a', '.source-artwork', '.map-viewport', '.adopt-intro',
      '.conservation-layout', '.event-lead', '.contact-bar', '.about-intro-layout',
      '.about-stats', '.about-purpose-grid', '.about-links',
      '.logo-origin', '.logo-meaning-heading', '.logo-meaning-card', '.logo-next',
      '.pillars-intro', '.pillar-card', '.pillars-next',
    ].join(',');
    const elements = [...document.querySelectorAll(selectors)];
    elements.forEach((element, index) => {
      element.dataset.reveal = '';
      element.style.setProperty('--reveal-delay', `${(index % 5) * 55}ms`);
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.reveal = 'visible';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -35px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [active]);

  const Page = pageComponents[active] || NotFoundPage;
  return (
    <div className="app-shell">
      <Header active={active} />
      <QuickActions />
      <main><div key={active} className="page-enter"><Page /></div></main>
      <Footer />
    </div>
  );
}
